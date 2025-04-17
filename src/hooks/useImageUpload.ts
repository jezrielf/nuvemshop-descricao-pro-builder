
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { storageService } from '@/services/storageService';

interface UseImageUploadProps {
  onSuccess?: (url: string, alt: string) => void;
  onError?: (error: string) => void;
}

export const useImageUpload = ({ onSuccess, onError }: UseImageUploadProps = {}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();
  const auth = useAuth();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return null;
    
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
      
      const fileAlt = file.name.split('.')[0] || 'image';
      
      toast({
        title: "Upload concluído",
        description: "Sua imagem foi enviada com sucesso."
      });
      
      if (onSuccess) {
        onSuccess(result.url!, fileAlt);
      }
      
      return { url: result.url, alt: fileAlt };
    } catch (error: any) {
      console.error('Erro no upload:', error);
      
      toast({
        title: "Erro no upload",
        description: error.message || "Não foi possível enviar sua imagem",
        variant: "destructive",
      });
      
      if (onError) {
        onError(error.message || "Erro no upload");
      }
      
      return null;
    } finally {
      setUploading(false);
      setUploadProgress(0);
      
      // Reset input
      if (e.target) e.target.value = '';
    }
  };

  const uploadImage = async (file: File) => {
    if (!file || !auth.user) return null;
    
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
      
      const fileAlt = file.name.split('.')[0] || 'image';
      
      toast({
        title: "Upload concluído",
        description: "Sua imagem foi enviada com sucesso."
      });
      
      if (onSuccess) {
        onSuccess(result.url!, fileAlt);
      }
      
      return { url: result.url, alt: fileAlt };
    } catch (error: any) {
      console.error('Erro no upload:', error);
      
      toast({
        title: "Erro no upload",
        description: error.message || "Não foi possível enviar sua imagem",
        variant: "destructive",
      });
      
      if (onError) {
        onError(error.message || "Erro no upload");
      }
      
      return null;
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return {
    uploading,
    uploadProgress,
    handleFileChange,
    uploadImage
  };
};
