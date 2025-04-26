import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { convertProfileToUser } from '@/utils/typeConversion';

export const useGalleryUpload = () => {
  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({});
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const { toast } = useToast();
  const auth = useAuth();

  // Preparar bucket de imagens
  const ensureBucketExists = async () => {
    try {
      // Verificar se o bucket existe
      const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
      
      if (bucketsError) {
        console.error('Erro ao verificar buckets:', bucketsError);
        throw new Error(`Erro ao verificar buckets: ${bucketsError.message}`);
      }
      
      const userImagesBucket = buckets?.find(bucket => bucket.name === 'user-images');
      
      if (!userImagesBucket) {
        console.log('Bucket de imagens não existe, criando...');
        const { error: createError } = await supabase.storage.createBucket('user-images', {
          public: true,
          fileSizeLimit: 5242880 // 5MB
        });
        
        if (createError) {
          console.error('Erro ao criar bucket:', createError);
          throw new Error(`Erro ao criar bucket: ${createError.message}`);
        }
        
        console.log('Bucket user-images criado com sucesso');
      } else {
        console.log('Bucket user-images já existe');
      }
      
      return true;
    } catch (error) {
      console.error('Erro ao garantir existência do bucket:', error);
      return false;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, imageId: string) => {
    const file = e.target.files?.[0];
    if (!file) return null;
    
    if (!auth.user) {
      toast({
        title: "Erro de autenticação",
        description: "Você precisa estar logado para fazer upload de imagens.",
        variant: "destructive",
      });
      return null;
    }

    // Validações
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Tipo de arquivo inválido",
        description: "Por favor, selecione uma imagem nos formatos JPG, PNG ou GIF.",
        variant: "destructive",
      });
      return null;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "O tamanho máximo permitido é 5MB.",
        variant: "destructive",
      });
      return null;
    }
    
    setUploading(prev => ({ ...prev, [imageId]: true }));
    setUploadProgress(prev => ({ ...prev, [imageId]: 0 }));
    
    try {
      // Garantir que o bucket existe
      const bucketReady = await ensureBucketExists();
      if (!bucketReady) {
        throw new Error('Não foi possível preparar o armazenamento');
      }
      
      // Ensure user has required properties for compatibility
      const userWithRequiredProps = convertProfileToUser(auth.user);
      
      const userId = userWithRequiredProps.id;
      if (!userId) {
        throw new Error('ID de usuário não disponível');
      }
      
      // Nome do arquivo único
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${file.name.split('.')[0] || 'image'}.${fileExt}`;
      
      // Upload do arquivo
      const filePath = `${userId}/${fileName}`;
      
      console.log('Caminho do arquivo para upload da galeria:', filePath);
      
      // Simular progresso
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => ({
          ...prev,
          [imageId]: Math.min((prev[imageId] || 0) + 5, 90)
        }));
      }, 100);
      
      // Upload do arquivo
      const { error: uploadError } = await supabase.storage
        .from('user-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      clearInterval(progressInterval);
      
      if (uploadError) {
        console.error('Erro no upload:', uploadError);
        throw uploadError;
      }
      
      // Marcar progresso como concluído
      setUploadProgress(prev => ({ ...prev, [imageId]: 100 }));
      
      // Obter URL pública
      const { data: fileData } = supabase
        .storage
        .from('user-images')
        .getPublicUrl(filePath);
      
      if (!fileData?.publicUrl) {
        throw new Error('Não foi possível obter URL pública da imagem');
      }
      
      toast({
        title: "Upload concluído",
        description: "Sua imagem foi enviada com sucesso.",
      });
      
      // Limpar input de arquivo
      e.target.value = '';
      
      return {
        url: fileData.publicUrl,
        alt: file.name.split('.')[0] || 'Imagem da galeria'
      };
      
    } catch (error: any) {
      console.error('Erro ao fazer upload:', error);
      
      let errorMessage = "Não foi possível enviar sua imagem. Tente novamente mais tarde.";
      
      // Verificar erros específicos
      if (error.message?.includes('storage/object_not_found')) {
        errorMessage = "Diretório não encontrado. Verifique suas permissões.";
      } else if (error.message?.includes('Permission denied')) {
        errorMessage = "Permissão negada. Verifique suas permissões.";
      } else if (error.message?.includes('auth/unauthorized')) {
        errorMessage = "Você precisa estar logado para fazer upload de imagens.";
      }
      
      toast({
        title: "Erro no upload",
        description: errorMessage,
        variant: "destructive",
      });
      
      return null;
    } finally {
      // Limpar estados
      setUploading(prev => {
        const newState = { ...prev };
        delete newState[imageId];
        return newState;
      });
      
      setUploadProgress(prev => {
        const newState = { ...prev };
        delete newState[imageId];
        return newState;
      });
      
      // Resetar input
      if (e.target) e.target.value = '';
    }
  };

  return {
    uploading,
    uploadProgress,
    handleFileChange
  };
};
