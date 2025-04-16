
import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export const useImageLibraryUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageAlt, setImageAlt] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const auth = useAuth();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Tipo de arquivo inválido",
        description: "Por favor, selecione uma imagem nos formatos JPG, PNG ou GIF.",
        variant: "destructive",
      });
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "O tamanho máximo permitido é 5MB.",
        variant: "destructive",
      });
      return;
    }
    
    setImageFile(file);
    setImageAlt(file.name.split('.')[0] || '');
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const uploadImage = async () => {
    if (!imageFile || !auth.user) {
      toast({
        title: "Erro de upload",
        description: "Arquivo ou usuário inválido.",
        variant: "destructive",
      });
      return null;
    }
    
    setUploading(true);
    setUploadProgress(0);
    
    try {
      const userId = auth.user.id;
      const fileExt = imageFile.name.split('.').pop();
      const safeFileName = `${Date.now()}_${(imageAlt || 'image').replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${fileExt}`;
      const filePath = `${userId}/${safeFileName}`;
      
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 5, 90));
      }, 100);
      
      const { error: uploadError } = await supabase.storage
        .from('user-images')
        .upload(filePath, imageFile);
      
      clearInterval(progressInterval);
      
      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from('user-images')
        .getPublicUrl(filePath);
      
      setUploadProgress(100);
      
      toast({
        title: "Upload concluído",
        description: "Sua imagem foi enviada com sucesso.",
      });
      
      return { 
        url: publicUrl, 
        alt: imageAlt 
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
  
  const resetForm = () => {
    setImageFile(null);
    setPreviewUrl(null);
    setImageAlt('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return {
    uploading,
    uploadProgress,
    imageFile,
    previewUrl,
    imageAlt,
    fileInputRef,
    handleFileChange,
    uploadImage,
    setImageAlt,
    resetForm
  };
};
