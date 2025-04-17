
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

interface UploadOptions {
  user: User | null;
  file: File;
  path?: string;
  onProgress?: (progress: number) => void;
}

interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

const BUCKET_NAME = 'user-images';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const storageService = {
  /**
   * Verifica se o bucket existe e está configurado corretamente
   */
  async ensureBucketExists(): Promise<boolean> {
    try {
      const { data: buckets, error } = await supabase.storage.listBuckets();
      
      if (error) {
        console.error('Erro ao verificar buckets:', error);
        return false;
      }
      
      const bucket = buckets?.find(b => b.name === BUCKET_NAME);
      return !!bucket;
    } catch (error) {
      console.error('Exceção ao verificar bucket:', error);
      return false;
    }
  },

  /**
   * Faz upload de um arquivo para o storage
   */
  async uploadFile({ user, file, path, onProgress }: UploadOptions): Promise<UploadResult> {
    if (!user) {
      return { 
        success: false, 
        error: 'É necessário estar autenticado para fazer upload'
      };
    }

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      return { 
        success: false, 
        error: 'Tipo de arquivo inválido. Apenas imagens são permitidas'
      };
    }

    // Validar tamanho do arquivo
    if (file.size > MAX_FILE_SIZE) {
      return { 
        success: false, 
        error: `Arquivo muito grande. O tamanho máximo permitido é ${MAX_FILE_SIZE / (1024 * 1024)}MB` 
      };
    }

    try {
      // Verificar se o bucket existe
      const bucketExists = await this.ensureBucketExists();
      if (!bucketExists) {
        return { 
          success: false, 
          error: 'Bucket de armazenamento não está disponível'
        };
      }

      // Criar um nome de arquivo único
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${file.name.split('.')[0].replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${fileExt}`;
      
      // Construir o caminho seguro
      const userId = user.id;
      const filePath = path ? `${userId}/${path}/${fileName}` : `${userId}/${fileName}`;
      
      console.log('Iniciando upload para caminho:', filePath);
      
      // Criar um intervalo para simular o progresso para o usuário
      let progressInterval: number | null = null;
      
      if (onProgress) {
        progressInterval = window.setInterval(() => {
          onProgress(Math.min((onProgress as any).lastProgress || 0 + 5, 90));
          (onProgress as any).lastProgress = Math.min((onProgress as any).lastProgress || 0 + 5, 90);
        }, 100) as unknown as number;
      }
      
      // Fazer o upload do arquivo
      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      // Limpar o intervalo de progresso
      if (progressInterval) clearInterval(progressInterval);
      
      // Se houver erro no upload
      if (uploadError) {
        console.error('Erro ao fazer upload:', uploadError);
        return { 
          success: false, 
          error: this.parseStorageError(uploadError)
        };
      }
      
      // Atualizar o progresso para 100% no sucesso
      if (onProgress) onProgress(100);
      
      // Obter URL pública do arquivo
      const { data: fileData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);
      
      if (!fileData?.publicUrl) {
        return { 
          success: false, 
          error: 'Não foi possível obter URL pública do arquivo'
        };
      }
      
      return {
        success: true,
        url: fileData.publicUrl
      };
      
    } catch (error: any) {
      console.error('Exceção no processo de upload:', error);
      return { 
        success: false, 
        error: error.message || 'Erro desconhecido no upload'
      };
    }
  },

  /**
   * Lista as imagens de um usuário
   */
  async listUserImages(userId: string): Promise<Array<{ id: string; src: string; alt: string }>> {
    if (!userId) {
      console.log('ID de usuário não fornecido para listar imagens');
      return [];
    }

    try {
      const bucketExists = await this.ensureBucketExists();
      if (!bucketExists) {
        console.error('Bucket não existe para listar imagens');
        return [];
      }
      
      const { data: files, error } = await supabase.storage
        .from(BUCKET_NAME)
        .list(userId, {
          sortBy: { column: 'created_at', order: 'desc' }
        });
      
      if (error) {
        // Diretório vazio é esperado para novos usuários
        if (error.message.includes('The specified key does not exist')) {
          return [];
        }
        
        console.error('Erro ao listar arquivos:', error);
        return [];
      }
      
      if (!files || files.length === 0) {
        return [];
      }
      
      // Mapear para o formato esperado
      return files.map(file => {
        const { data } = supabase.storage
          .from(BUCKET_NAME)
          .getPublicUrl(`${userId}/${file.name}`);
        
        return {
          id: file.id || file.name,
          src: data.publicUrl,
          alt: file.name.split('.')[0].replace(/_/g, ' ') || 'Imagem'
        };
      });
    } catch (error) {
      console.error('Exceção ao listar imagens:', error);
      return [];
    }
  },

  /**
   * Exclui uma imagem
   */
  async deleteImage(userId: string, imageUrl: string): Promise<boolean> {
    if (!userId || !imageUrl) return false;
    
    try {
      // Extrair o caminho do arquivo da URL
      const url = new URL(imageUrl);
      const pathParts = url.pathname.split('/');
      const fileName = pathParts[pathParts.length - 1];
      const filePath = `${userId}/${fileName}`;
      
      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([filePath]);
      
      if (error) {
        console.error('Erro ao excluir imagem:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Exceção ao excluir imagem:', error);
      return false;
    }
  },

  /**
   * Converte erros do storage em mensagens amigáveis
   */
  parseStorageError(error: any): string {
    if (!error) return 'Erro desconhecido';
    
    if (error.message?.includes('storage/object_not_found')) {
      return 'Diretório não encontrado. Verifique suas permissões.';
    }
    
    if (error.message?.includes('Permission denied')) {
      return 'Permissão negada. Você precisa estar logado para fazer upload.';
    }
    
    if (error.message?.includes('auth/unauthorized')) {
      return 'Você precisa estar logado para fazer upload de imagens.';
    }
    
    if (error.message?.includes('duplicate')) {
      return 'Uma imagem com este nome já existe.';
    }
    
    return error.message || 'Não foi possível enviar sua imagem. Tente novamente mais tarde.';
  }
};
