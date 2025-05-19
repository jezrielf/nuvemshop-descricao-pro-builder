
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
  
  // Ensure image bucket exists
  const ensureBucketExists = async () => {
    try {
      // Check if bucket exists
      const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
      
      if (bucketsError) {
        console.error('Error checking buckets:', bucketsError);
        throw new Error(`Error checking buckets: ${bucketsError.message}`);
      }
      
      const userImagesBucket = buckets?.find(bucket => bucket.name === 'user-images');
      
      if (!userImagesBucket) {
        console.log('Creating user-images bucket...');
        const { error: createError } = await supabase.storage.createBucket('user-images', {
          public: true,
          fileSizeLimit: 5242880 // 5MB
        });
        
        if (createError) {
          console.error('Error creating bucket:', createError);
          throw new Error(`Error creating bucket: ${createError.message}`);
        }
        
        console.log('user-images bucket created successfully');
      } else {
        console.log('user-images bucket already exists');
      }
      
      return true;
    } catch (error) {
      console.error('Error ensuring bucket exists:', error);
      return false;
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    console.log('File selected:', file.name, file.type, file.size);
    
    // Validations
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
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const uploadImage = async () => {
    if (!imageFile) {
      console.log('No file to upload');
      return null;
    }
    
    if (!auth.user) {
      console.log('User not authenticated');
      toast({
        title: "Erro de autenticação",
        description: "Você precisa estar logado para fazer upload de imagens.",
        variant: "destructive",
      });
      return null;
    }
    
    console.log('Starting upload:', imageFile.name);
    setUploading(true);
    setUploadProgress(0);
    
    try {
      // Ensure bucket exists
      const bucketReady = await ensureBucketExists();
      if (!bucketReady) {
        throw new Error('Could not prepare storage');
      }
      
      const userId = auth.user.id;
      if (!userId) {
        throw new Error('User ID not available');
      }
      
      console.log('User ID:', userId);
      
      // Create unique filename
      const fileExt = imageFile.name.split('.').pop();
      const safeFileName = `${Date.now()}_${(imageAlt || 'image').replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${fileExt}`;
      const filePath = `${userId}/${safeFileName}`;
      
      console.log('Upload file path:', filePath);
      
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = Math.min(prev + 5, 90);
          console.log('Upload progress:', newProgress);
          return newProgress;
        });
      }, 100);
      
      // Upload file
      const { error: uploadError } = await supabase.storage
        .from('user-images')
        .upload(filePath, imageFile, {
          cacheControl: '3600',
          upsert: true // Changed to true to overwrite if file exists
        });
      
      clearInterval(progressInterval);
      
      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }
      
      console.log('Upload completed successfully');
      setUploadProgress(100);
      
      // Get public URL
      const { data: fileData } = supabase
        .storage
        .from('user-images')
        .getPublicUrl(filePath);
      
      console.log('Public URL:', fileData?.publicUrl);
      
      if (!fileData?.publicUrl) {
        throw new Error('Could not get image public URL');
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
      console.error('Detailed upload error:', error);
      
      let errorMessage = "Não foi possível enviar sua imagem. Tente novamente mais tarde.";
      
      // Check for specific errors
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
