
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
      console.log('Verificando se o bucket existe...');
      
      // Primeiro, verificar se o bucket existe
      const { data: buckets, error } = await supabase.storage.listBuckets();
      
      if (error) {
        console.error('Erro ao listar buckets:', error);
        return false;
      }
      
      const bucket = buckets?.find(b => b.name === BUCKET_NAME);
      
      if (!bucket) {
        console.log('Bucket não encontrado, tentando criar...');
        
        // Tentar criar o bucket se não existe
        const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
          public: true,
          fileSizeLimit: MAX_FILE_SIZE,
          allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
        });
        
        if (createError) {
          console.error('Erro ao criar bucket:', createError);
          return false;
        }
        
        console.log('Bucket criado com sucesso');
        return true;
      }
      
      console.log('Bucket já existe:', bucket.name);
      return true;
    } catch (error) {
      console.error('Exceção ao verificar bucket:', error);
      return false;
    }
  },

  /**
   * Faz upload de um arquivo para o storage
   */
  async uploadFile({ user, file, path, onProgress }: UploadOptions): Promise<UploadResult> {
    console.log('Iniciando processo de upload');
    
    if (!user) {
      console.error('Upload falhou: Usuário não autenticado');
      return { 
        success: false, 
        error: 'É necessário estar autenticado para fazer upload'
      };
    }

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      console.error('Upload falhou: Tipo de arquivo inválido', file.type);
      return { 
        success: false, 
        error: 'Tipo de arquivo inválido. Apenas imagens são permitidas'
      };
    }

    // Validar tamanho do arquivo
    if (file.size > MAX_FILE_SIZE) {
      console.error('Upload falhou: Arquivo muito grande', file.size);
      return { 
        success: false, 
        error: `Arquivo muito grande. O tamanho máximo permitido é ${MAX_FILE_SIZE / (1024 * 1024)}MB` 
      };
    }

    try {
      // Verificar se o bucket existe
      const bucketExists = await this.ensureBucketExists();
      if (!bucketExists) {
        console.error('Upload falhou: Bucket não existe');
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
      
      console.log('Caminho do arquivo para upload:', filePath);
      
      // Criar um intervalo para simular o progresso para o usuário
      let progressInterval: number | null = null;
      let currentProgress = 0;
      
      if (onProgress) {
        progressInterval = window.setInterval(() => {
          currentProgress = Math.min(currentProgress + 5, 90);
          onProgress(currentProgress);
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
        console.error('URL pública não disponível');
        return { 
          success: false, 
          error: 'Não foi possível obter URL pública do arquivo'
        };
      }
      
      console.log('Upload concluído com sucesso. URL:', fileData.publicUrl);
      
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
      console.log('Verificando bucket para listagem de imagens');
      const bucketExists = await this.ensureBucketExists();
      if (!bucketExists) {
        console.error('Bucket não existe para listar imagens');
        return [];
      }
      
      console.log('Listando arquivos para o usuário:', userId);
      const { data: files, error } = await supabase.storage
        .from(BUCKET_NAME)
        .list(userId, {
          sortBy: { column: 'created_at', order: 'desc' }
        });
      
      if (error) {
        // Diretório vazio é esperado para novos usuários
        if (error.message.includes('The specified key does not exist')) {
          console.log('Diretório de usuário vazio ou não existe ainda');
          return [];
        }
        
        console.error('Erro ao listar arquivos:', error);
        return [];
      }
      
      if (!files || files.length === 0) {
        console.log('Nenhum arquivo encontrado para o usuário');
        return [];
      }
      
      console.log(`${files.length} arquivos encontrados`);
      
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
      
      console.log('Tentando excluir arquivo:', filePath);
      
      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([filePath]);
      
      if (error) {
        console.error('Erro ao excluir imagem:', error);
        return false;
      }
      
      console.log('Arquivo excluído com sucesso');
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
    
    console.log('Tipo de erro recebido:', error, typeof error);
    
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
    
    if (error.message?.includes('Unexpected')) {
      return 'Erro de conexão. Verifique sua internet e tente novamente.';
    }
    
    if (error.statusCode === 413) {
      return 'Arquivo muito grande. Tente uma imagem menor.';
    }
    
    return error.message || 'Não foi possível enviar sua imagem. Tente novamente mais tarde.';
  }
};
