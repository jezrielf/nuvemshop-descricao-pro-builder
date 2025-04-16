
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
    
    // Validações
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
    
    // Criar preview da imagem
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const uploadImage = async () => {
    if (!imageFile || !auth.user) {
      console.log('Sem arquivo ou usuário autenticado para upload');
      return null;
    }
    
    setUploading(true);
    setUploadProgress(0);
    
    try {
      // Criar bucket se não existir
      const { data: buckets } = await supabase.storage.listBuckets();
      const bucketExists = buckets?.some(bucket => bucket.name === 'user-images');
      
      if (!bucketExists) {
        const { error: createError } = await supabase.storage.createBucket('user-images', {
          public: true,
          fileSizeLimit: 5242880, // 5MB
        });
        
        if (createError) {
          console.error('Erro ao criar bucket:', createError);
          throw new Error(`Erro ao criar bucket: ${createError.message}`);
        }
      }
      
      // Nome de arquivo único
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}_${imageAlt || 'image'}.${fileExt}`;
      
      const userId = auth.user.id;
      if (!userId) {
        throw new Error("Erro de autenticação: ID de usuário não disponível");
      }
      
      const filePath = `${userId}/${fileName}`;
      
      // Simular progresso
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 95));
      }, 100);
      
      // Upload do arquivo
      const { error: uploadError } = await supabase.storage
        .from('user-images')
        .upload(filePath, imageFile, {
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
      
      toast({
        title: "Upload concluído",
        description: "Sua imagem foi enviada com sucesso.",
      });
      
      resetForm();
      
      return { 
        url: fileData.publicUrl, 
        alt: imageAlt 
      };
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      toast({
        title: "Erro no upload",
        description: "Não foi possível enviar sua imagem. Tente novamente mais tarde.",
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
