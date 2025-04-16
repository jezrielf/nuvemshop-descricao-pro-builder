
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
  
  // Helper function to check if bucket exists and create if it doesn't
  const ensureBucketExists = async () => {
    try {
      // Check if bucket exists first
      const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
      
      if (bucketsError) {
        console.error('Error checking buckets:', bucketsError);
        return false;
      }
      
      const bucketExists = buckets?.some(bucket => bucket.name === 'user-images');
      
      if (!bucketExists) {
        // Create the bucket if it doesn't exist
        const { error: createError } = await supabase.storage.createBucket('user-images', {
          public: true,
          fileSizeLimit: 5242880, // 5MB
        });
        
        if (createError) {
          console.error('Error creating bucket:', createError);
          return false;
        }
        
        console.log('Created user-images bucket');
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
    
    setImageFile(file);
    setImageAlt(file.name.split('.')[0] || '');
    
    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const uploadImage = async () => {
    if (!imageFile || !auth.user) {
      console.log('No file or authenticated user for upload');
      return;
    }
    
    setUploading(true);
    setUploadProgress(0);
    
    try {
      // Ensure bucket exists before uploading
      const bucketReady = await ensureBucketExists();
      if (!bucketReady) {
        throw new Error("Failed to ensure bucket exists");
      }
      
      // Create a unique file name to avoid conflicts
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}_${imageAlt || 'image'}.${fileExt}`;
      
      // Make sure user has a folder - using uid directly to avoid undefined
      const userId = auth.user.id;
      if (!userId) {
        console.error("No user ID available for upload");
        throw new Error("Authentication error: No user ID available");
      }
      
      const filePath = `${userId}/${fileName}`;
      console.log('Uploading file to path:', filePath);
      
      // Set up progress tracking with an interval
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = Math.min(prev + 10, 95); // Increment but cap at 95%
          return newProgress;
        });
      }, 100);
      
      // Upload the file
      const { error: uploadError, data } = await supabase.storage
        .from('user-images')
        .upload(filePath, imageFile, {
          cacheControl: '3600',
          upsert: false
        });
      
      // Clear the interval after upload completes
      clearInterval(progressInterval);
      
      if (uploadError) {
        console.error("Upload error details:", uploadError);
        throw uploadError;
      }
      
      console.log('Upload successful:', data);
      
      // Upload complete - set to 100%
      setUploadProgress(100);
      
      // Get the public URL
      const { data: fileUrl } = supabase
        .storage
        .from('user-images')
        .getPublicUrl(filePath);
      
      toast({
        title: "Upload concluído",
        description: "Sua imagem foi enviada com sucesso.",
      });
      
      // Reset file input
      resetForm();
      
      return { 
        url: fileUrl?.publicUrl, 
        alt: imageAlt 
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
