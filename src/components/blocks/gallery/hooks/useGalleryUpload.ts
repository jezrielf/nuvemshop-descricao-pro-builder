
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
      
      // Nome do arquivo único
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${file.name.split('.')[0] || 'image'}.${fileExt}`;
      
      // Upload do arquivo
      const filePath = auth.user.id 
        ? `${auth.user.id}/${fileName}` 
        : fileName;
      
      // Simular progresso
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => ({
          ...prev,
          [imageId]: Math.min((prev[imageId] || 0) + 10, 95)
        }));
      }, 100);
      
      // Upload do arquivo
      const { error: uploadError } = await supabase.storage
        .from('user-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      clearInterval(progressInterval);
      
      if (uploadError) {
        console.error('Erro no upload:', uploadError);
        throw uploadError;
      }
      
      // Marcar progresso como concluído
      setUploadProgress(prev => ({ ...prev, [imageId]: 100 }));
      
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
      
      // Limpar input de arquivo
      e.target.value = '';
      
      return {
        url: fileData.publicUrl,
        alt: file.name.split('.')[0] || 'Imagem da galeria'
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
      // Limpar estados
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
      
      // Resetar input
      if (e.target) e.target.value = '';
    }
  };

  return {
    uploading,
    uploadProgress,
    handleFileChange
  };
};
