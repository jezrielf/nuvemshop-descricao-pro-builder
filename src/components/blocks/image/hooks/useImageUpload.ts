
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { storageService } from '@/services/storage';

interface UseImageUploadProps {
  onSuccess?: (url: string, alt: string) => void;
}

export const useImageUpload = (props?: UseImageUploadProps) => {
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
      // Convert the user to the format expected by storageService
      const user = auth.user ? {
        ...auth.user,
        // Ensure these properties exist and are of the correct type
        app_metadata: auth.user.app_metadata || {},
        user_metadata: auth.user.user_metadata || {},
        aud: auth.user.aud || '',
        created_at: auth.user.created_at || '',
        // Convert role to string if it's an array
        role: typeof auth.user.role === 'object' && Array.isArray(auth.user.role) 
          ? auth.user.role[0] || '' 
          : auth.user.role || ''
      } : null;

      const result = await storageService.uploadFile({
        user,
        file,
        onProgress: setUploadProgress
      });
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      toast({
        title: "Upload concluído",
        description: "Sua imagem foi enviada com sucesso."
      });
      
      const imageAlt = file.name.split('.')[0] || 'Imagem';
      
      if (props?.onSuccess) {
        props.onSuccess(result.url!, imageAlt);
      }
      
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
      if (e.target) e.target.value = '';
    }
  };

  return {
    uploading,
    uploadProgress,
    handleFileChange
  };
};
