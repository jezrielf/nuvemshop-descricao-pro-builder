
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { storageService } from '@/services/storage';
import { convertProfileToUser } from '@/utils/typeConversion';

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const auth = useAuth();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return null;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // Convert the user to the format expected by storageService
      const user = auth.user ? convertProfileToUser(auth.user) : null;

      const result = await storageService.uploadFile({
        user,
        file,
        onProgress: setUploadProgress
      });
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      // Set the image URL for display
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
      setIsUploading(false);
      if (e.target) e.target.value = '';
    }
  };

  return {
    uploading: isUploading, // For backwards compatibility with components using 'uploading'
    isUploading, 
    uploadProgress,
    imageUrl,
    handleFileChange
  };
};
