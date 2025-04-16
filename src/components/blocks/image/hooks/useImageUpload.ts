
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

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    if (!file.type.startsWith('image/')) {
      return {
        valid: false,
        error: "Tipo de arquivo inválido. Por favor, selecione uma imagem nos formatos JPG, PNG ou GIF."
      };
    }
    
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
      const userId = auth.user.id;
      const fileExt = file.name.split('.').pop();
      const fileAlt = file.name.split('.')[0] || 'image';
      const safeFileName = `${Date.now()}_${fileAlt.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${fileExt}`;
      
      const filePath = `${userId}/${safeFileName}`;
      
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 5, 90));
      }, 100);
      
      const { error: uploadError } = await supabase.storage
        .from('user-images')
        .upload(filePath, file);
      
      clearInterval(progressInterval);
      
      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from('user-images')
        .getPublicUrl(filePath);
      
      setUploadProgress(100);
      
      if (onSuccess) {
        onSuccess(publicUrl, fileAlt);
      }
      
      toast({
        title: "Upload concluído",
        description: "Sua imagem foi enviada com sucesso.",
      });

      return { 
        url: publicUrl, 
        alt: fileAlt 
      };
    } catch (error: any) {
      console.error('Erro ao fazer upload:', error);
      
      toast({
        title: "Erro no upload",
        description: error.message || "Não foi possível enviar sua imagem.",
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
