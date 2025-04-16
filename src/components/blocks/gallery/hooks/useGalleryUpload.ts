
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
      const userId = auth.user.id;
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${file.name.split('.')[0] || 'image'}.${fileExt}`;
      
      const filePath = `${userId}/${fileName}`;
      
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => ({
          ...prev,
          [imageId]: Math.min((prev[imageId] || 0) + 5, 90)
        }));
      }, 100);
      
      const { error: uploadError } = await supabase.storage
        .from('user-images')
        .upload(filePath, file);
      
      clearInterval(progressInterval);
      
      if (uploadError) {
        console.error('Erro no upload:', uploadError);
        throw uploadError;
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from('user-images')
        .getPublicUrl(filePath);
      
      setUploadProgress(prev => ({ ...prev, [imageId]: 100 }));
      
      toast({
        title: "Upload concluído",
        description: "Sua imagem foi enviada com sucesso.",
      });
      
      e.target.value = '';
      
      return {
        url: publicUrl,
        alt: file.name.split('.')[0] || 'Imagem da galeria'
      };
    } catch (error: any) {
      console.error('Erro ao fazer upload:', error);
      
      let errorMessage = "Não foi possível enviar sua imagem. Tente novamente mais tarde.";
      
      if (error.message?.includes('Permission denied')) {
        errorMessage = "Permissão negada. Verifique suas permissões.";
      }
      
      toast({
        title: "Erro no upload",
        description: errorMessage,
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
      
      if (e.target) e.target.value = '';
    }
  };

  return {
    uploading,
    uploadProgress,
    handleFileChange
  };
};
