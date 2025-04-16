
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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { toast } = useToast();
  const auth = useAuth();

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    // Check file type
    if (!file.type.startsWith('image/')) {
      return {
        valid: false,
        error: "Tipo de arquivo inválido. Por favor, selecione uma imagem nos formatos JPG, PNG ou GIF."
      };
    }
    
    // Check file size (limit to 5MB)
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
      return;
    }

    const validation = validateFile(file);
    if (!validation.valid) {
      toast({
        title: "Erro no upload",
        description: validation.error,
        variant: "destructive",
      });
      return;
    }

    setImageFile(file);
    setUploading(true);
    setUploadProgress(0);
    
    try {
      // Create a unique file name to avoid conflicts
      const fileExt = file.name.split('.').pop();
      const fileAlt = file.name.split('.')[0] || 'image';
      const fileName = `${Date.now()}_${fileAlt}.${fileExt}`;
      const filePath = `${auth.user.id}/${fileName}`;
      
      // Set up progress tracking with an interval
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = Math.min(prev + 10, 95); // Increment but cap at 95%
          return newProgress;
        });
      }, 100);
      
      // Upload the file
      const { error: uploadError } = await supabase.storage
        .from('user-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      // Clear the interval after upload completes
      clearInterval(progressInterval);
      
      if (uploadError) {
        throw uploadError;
      }
      
      // Upload complete - set to 100%
      setUploadProgress(100);
      
      // Get the public URL
      const { data: fileUrl } = supabase
        .storage
        .from('user-images')
        .getPublicUrl(filePath);
      
      // Call success callback if provided
      if (onSuccess && fileUrl) {
        onSuccess(fileUrl.publicUrl, fileAlt);
      }
      
      toast({
        title: "Upload concluído",
        description: "Sua imagem foi enviada com sucesso.",
      });

      return { url: fileUrl?.publicUrl, alt: fileAlt };
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Erro no upload",
        description: "Não foi possível enviar sua imagem. Tente novamente mais tarde.",
        variant: "destructive",
      });
      return null;
    } finally {
      setUploading(false);
      setUploadProgress(0);
      setImageFile(null);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !auth.user) return;
    
    return uploadImage(file);
  };

  return {
    uploading,
    uploadProgress,
    imageFile,
    handleFileChange,
    uploadImage,
    validateFile
  };
};
