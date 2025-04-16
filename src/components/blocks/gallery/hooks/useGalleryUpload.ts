
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export const useGalleryUpload = () => {
  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({});
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const { toast } = useToast();
  const auth = useAuth();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, imageId: string) => {
    const file = e.target.files?.[0];
    if (!file || !auth.user) return;
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Tipo de arquivo inválido",
        description: "Por favor, selecione uma imagem nos formatos JPG, PNG ou GIF.",
        variant: "destructive",
      });
      return;
    }
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "O tamanho máximo permitido é 5MB.",
        variant: "destructive",
      });
      return;
    }
    
    setUploading(prev => ({ ...prev, [imageId]: true }));
    setUploadProgress(prev => ({ ...prev, [imageId]: 0 }));
    
    try {
      // Create a unique file name to avoid conflicts
      const fileExt = file.name.split('.').pop();
      const fileAlt = file.name.split('.')[0] || 'gallery-image';
      const fileName = `${Date.now()}_${fileAlt}.${fileExt}`;
      const filePath = `${auth.user.id}/${fileName}`;
      
      // Set up progress tracking with an interval
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const currentProgress = prev[imageId] || 0;
          const newProgress = Math.min(currentProgress + 10, 95); // Increment but cap at 95%
          return { ...prev, [imageId]: newProgress };
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
      setUploadProgress(prev => ({ ...prev, [imageId]: 100 }));
      
      // Get the public URL
      const { data: fileUrl } = supabase
        .storage
        .from('user-images')
        .getPublicUrl(filePath);
      
      // Reset file input
      e.target.value = '';
      
      toast({
        title: "Upload concluído",
        description: "Sua imagem foi enviada com sucesso.",
      });
      
      return { 
        url: fileUrl?.publicUrl, 
        alt: fileAlt 
      };
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Erro no upload",
        description: "Não foi possível enviar sua imagem. Tente novamente mais tarde.",
        variant: "destructive",
      });
      return null;
    } finally {
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
      
      // Reset the file input
      e.target.value = '';
    }
  };

  return {
    uploading,
    uploadProgress,
    handleFileChange
  };
};
