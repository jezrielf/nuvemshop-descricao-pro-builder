
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

export const storageService = {
  /**
   * Realiza upload de um arquivo para o storage
   */
  async uploadFile({ user, file, path, onProgress }: UploadOptions): Promise<UploadResult> {
    if (!user) {
      console.error('Upload falhou: Usuário não autenticado');
      return { 
        success: false, 
        error: 'É necessário estar autenticado para fazer upload'
      };
    }

    // Validação básica
    if (!file.type.startsWith('image/')) {
      return { 
        success: false, 
        error: 'Apenas imagens são permitidas'
      };
    }

    // Limite de 5MB
    if (file.size > 5 * 1024 * 1024) {
      return { 
        success: false, 
        error: 'Arquivo muito grande. O tamanho máximo permitido é 5MB'
      };
    }

    try {
      // Criar um nome de arquivo único
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${file.name.split('.')[0].replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${fileExt}`;
      
      // Construir o caminho
      const userId = user.id;
      const filePath = path ? `${userId}/${path}/${fileName}` : `${userId}/${fileName}`;
      
      console.log('Fazendo upload para:', filePath);
      
      // Atualizar progresso
      if (onProgress) {
        let progress = 10;
        const interval = setInterval(() => {
          progress += 10;
          if (progress <= 90) {
            onProgress(progress);
          } else {
            clearInterval(interval);
          }
        }, 200);
      }
      
      // Upload do arquivo
      const { data, error } = await supabase.storage
        .from('user-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (error) {
        console.error('Erro no upload:', error);
        
        // Verificar se o erro é por bucket não existir
        if (error.message?.includes('bucket not found') || error.message?.includes('does not exist')) {
          console.log('Bucket não existe, tentando criar...');
          
          // Tentar criar o bucket
          const { error: createError } = await supabase.storage.createBucket('user-images', {
            public: true,
            fileSizeLimit: 5 * 1024 * 1024
          });
          
          if (createError) {
            console.error('Falha ao criar bucket:', createError);
            return { success: false, error: 'Falha ao criar armazenamento' };
          }
          
          // Tentar upload novamente após criar o bucket
          const { data: retryData, error: retryError } = await supabase.storage
            .from('user-images')
            .upload(filePath, file, {
              cacheControl: '3600',
              upsert: false
            });
            
          if (retryError) {
            console.error('Erro no segundo upload:', retryError);
            return { success: false, error: 'Não foi possível fazer upload após criar o bucket' };
          }
        } else {
          return { success: false, error: error.message || 'Erro no upload' };
        }
      }
      
      // Atualizar progresso para 100%
      if (onProgress) onProgress(100);
      
      // Obter URL pública
      const { data: publicUrlData } = supabase.storage
        .from('user-images')
        .getPublicUrl(filePath);
      
      if (!publicUrlData?.publicUrl) {
        return { success: false, error: 'Não foi possível obter URL pública' };
      }
      
      console.log('Upload concluído, URL:', publicUrlData.publicUrl);
      
      return {
        success: true,
        url: publicUrlData.publicUrl
      };
    } catch (error: any) {
      console.error('Exceção no upload:', error);
      return { 
        success: false, 
        error: error.message || 'Erro desconhecido no upload'
      };
    }
  },

  /**
   * Lista imagens do usuário
   */
  async listUserImages(userId: string): Promise<Array<{ id: string; src: string; alt: string }>> {
    if (!userId) return [];

    try {
      // Listar arquivos do usuário
      const { data: files, error } = await supabase.storage
        .from('user-images')
        .list(userId, {
          sortBy: { column: 'created_at', order: 'desc' }
        });
      
      if (error) {
        // Se diretório não existe ainda, é esperado para usuários novos
        if (error.message.includes('The specified key does not exist')) {
          return [];
        }
        
        console.error('Erro ao listar imagens:', error);
        return [];
      }
      
      if (!files || files.length === 0) {
        return [];
      }
      
      // Mapear para o formato esperado
      return files.map(file => {
        const { data } = supabase.storage
          .from('user-images')
          .getPublicUrl(`${userId}/${file.name}`);
        
        return {
          id: file.id || file.name,
          src: data.publicUrl,
          alt: file.name.split('.')[0].replace(/_/g, ' ') || 'Imagem'
        };
      });
    } catch (error) {
      console.error('Erro ao listar imagens:', error);
      return [];
    }
  },

  /**
   * Exclui uma imagem
   */
  async deleteImage(userId: string, imageUrl: string): Promise<boolean> {
    if (!userId || !imageUrl) return false;
    
    try {
      // Extrair nome do arquivo da URL
      const url = new URL(imageUrl);
      const pathParts = url.pathname.split('/');
      const fileName = pathParts[pathParts.length - 1];
      const filePath = `${userId}/${fileName}`;
      
      const { error } = await supabase.storage
        .from('user-images')
        .remove([filePath]);
      
      if (error) {
        console.error('Erro ao excluir:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Erro ao excluir imagem:', error);
      return false;
    }
  }
};
