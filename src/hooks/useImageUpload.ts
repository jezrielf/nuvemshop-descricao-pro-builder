import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { storageService } from '@/services/storage';

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const auth = useAuth();

  const uploadImage = async (file: File) => {
    if (!file) return;
    
    setUploading(true);
    setUploadProgress(0);
    
    try {
      const result = await storageService.uploadFile({
        user: auth.user,
        file,
        onProgress: setUploadProgress
      });
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      setImageUrl(result.url);
      
      toast({
        title: "Upload concluído",
        description: "Sua imagem foi enviada com sucesso."
      });
      
      return result.url;
    } catch (error: any) {
      console.error('Erro no upload:', error);
      
      toast({
        title: "Erro no upload",
        description: error.message || "Não foi possível enviar sua imagem",
        variant: "destructive",
      });
      
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    return uploadImage(file);
  };

  return {
    uploading,
    uploadProgress,
    imageUrl,
    uploadImage,
    handleFileChange
  };
};
