
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
  
  // Preparar bucket de imagens
  const ensureBucketExists = async () => {
    try {
      // Verificar se o bucket existe
      const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
      
      if (bucketsError) {
        console.error('Erro ao verificar buckets:', bucketsError);
        throw new Error(`Erro ao verificar buckets: ${bucketsError.message}`);
      }
      
      const userImagesBucket = buckets?.find(bucket => bucket.name === 'user-images');
      
      if (!userImagesBucket) {
        console.log('Bucket de imagens não existe, criando...');
        const { error: createError } = await supabase.storage.createBucket('user-images', {
          public: true,
          fileSizeLimit: 5242880 // 5MB
        });
        
        if (createError) {
          console.error('Erro ao criar bucket:', createError);
          throw new Error(`Erro ao criar bucket: ${createError.message}`);
        }
        
        console.log('Bucket user-images criado com sucesso');
      } else {
        console.log('Bucket user-images já existe');
      }
      
      return true;
    } catch (error) {
      console.error('Erro ao garantir existência do bucket:', error);
      return false;
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    console.log('Arquivo selecionado:', file.name, file.type, file.size);
    
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
    if (!imageFile) {
      console.log('Nenhum arquivo para upload');
      return null;
    }
    
    if (!auth.user) {
      console.log('Usuário não autenticado');
      toast({
        title: "Erro de autenticação",
        description: "Você precisa estar logado para fazer upload de imagens.",
        variant: "destructive",
      });
      return null;
    }
    
    console.log('Iniciando upload:', imageFile.name);
    setUploading(true);
    setUploadProgress(0);
    
    try {
      // Garantir que o bucket existe
      const bucketReady = await ensureBucketExists();
      if (!bucketReady) {
        throw new Error('Não foi possível preparar o armazenamento');
      }
      
      const userId = auth.user.id;
      if (!userId) {
        throw new Error('ID de usuário não disponível');
      }
      
      console.log('ID do usuário:', userId);
      
      // Nome de arquivo único
      const fileExt = imageFile.name.split('.').pop();
      const safeFileName = `${Date.now()}_${(imageAlt || 'image').replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${fileExt}`;
      const filePath = `${userId}/${safeFileName}`;
      
      console.log('Caminho do arquivo para upload:', filePath);
      
      // Simular progresso
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = Math.min(prev + 5, 90);
          console.log('Progresso de upload:', newProgress);
          return newProgress;
        });
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
        console.error('Erro de upload:', uploadError);
        throw uploadError;
      }
      
      console.log('Upload concluído com sucesso');
      setUploadProgress(100);
      
      // Obter URL pública
      const { data: fileData } = supabase
        .storage
        .from('user-images')
        .getPublicUrl(filePath);
      
      console.log('URL pública:', fileData?.publicUrl);
      
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
    } catch (error: any) {
      console.error('Erro detalhado do upload:', error);
      
      let errorMessage = "Não foi possível enviar sua imagem. Tente novamente mais tarde.";
      
      // Verificar erros específicos
      if (error.message?.includes('storage/object_not_found')) {
        errorMessage = "Diretório não encontrado. Verifique suas permissões.";
      } else if (error.message?.includes('Permission denied')) {
        errorMessage = "Permissão negada. Verifique suas permissões.";
      } else if (error.message?.includes('auth/unauthorized')) {
        errorMessage = "Você precisa estar logado para fazer upload de imagens.";
      }
      
      toast({
        title: "Erro no upload",
        description: errorMessage,
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
