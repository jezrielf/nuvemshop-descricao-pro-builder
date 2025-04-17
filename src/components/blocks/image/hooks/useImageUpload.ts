
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface UseImageUploadProps {
  onSuccess?: (url: string, alt: string) => void;
}

export const useImageUpload = ({ onSuccess }: UseImageUploadProps = {}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
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

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    // Verificar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      return {
        valid: false,
        error: "Tipo de arquivo inválido. Por favor, selecione uma imagem nos formatos JPG, PNG ou GIF."
      };
    }
    
    // Verificar tamanho do arquivo (limite de 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return {
        valid: false,
        error: "Arquivo muito grande. O tamanho máximo permitido é 5MB."
      };
    }

    return { valid: true };
  };

  const uploadImage = async (file: File) => {
    if (!auth.user) {
      toast({
        title: "Erro no upload",
        description: "Você precisa estar logado para fazer upload de imagens.",
        variant: "destructive",
      });
      return null;
    }

    const validation = validateFile(file);
    if (!validation.valid) {
      toast({
        title: "Erro no upload",
        description: validation.error,
        variant: "destructive",
      });
      return null;
    }

    setUploading(true);
    setUploadProgress(0);
    
    try {
      // Garantir que o bucket existe
      const bucketReady = await ensureBucketExists();
      if (!bucketReady) {
        throw new Error('Não foi possível preparar o armazenamento');
      }
      
      // Nome de arquivo único
      const fileExt = file.name.split('.').pop();
      const fileAlt = file.name.split('.')[0] || 'image';
      const safeFileName = `${Date.now()}_${fileAlt.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${fileExt}`;
      
      // Caminho do arquivo
      const userId = auth.user.id;
      if (!userId) {
        throw new Error("ID de usuário não disponível");
      }
      
      const filePath = `${userId}/${safeFileName}`;
      
      console.log('Caminho do arquivo para upload:', filePath);
      
      // Simular progresso
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 5, 90));
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
      
      // Progresso completo
      setUploadProgress(100);
      
      // Obter URL pública
      const { data: fileData } = supabase
        .storage
        .from('user-images')
        .getPublicUrl(filePath);
      
      if (!fileData?.publicUrl) {
        throw new Error('Não foi possível obter URL pública da imagem');
      }
      
      // Chamar callback de sucesso
      if (onSuccess) {
        onSuccess(fileData.publicUrl, fileAlt);
      }
      
      toast({
        title: "Upload concluído",
        description: "Sua imagem foi enviada com sucesso.",
      });

      return { 
        url: fileData.publicUrl, 
        alt: fileAlt 
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
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !auth.user) return null;
    
    return uploadImage(file);
  };

  return {
    uploading,
    uploadProgress,
    handleFileChange,
    uploadImage,
    validateFile
  };
};
