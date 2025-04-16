
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface UserImage {
  id: string;
  src: string;
  alt: string;
}

export const useUserImages = (isOpen: boolean, activeTab: string) => {
  const [userImages, setUserImages] = useState<UserImage[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const auth = useAuth();

  // Helper function to ensure bucket exists
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

  const loadUserImages = async () => {
    if (!auth.user) {
      console.log('No authenticated user for loading images');
      return;
    }
    
    setLoading(true);
    
    try {
      const bucketReady = await ensureBucketExists();
      if (!bucketReady) {
        throw new Error("Failed to ensure bucket exists");
      }
      
      const userId = auth.user.id;
      console.log('Loading images for user:', userId);
      
      // Only attempt to list files if we have a user ID
      if (!userId) {
        console.warn("No user ID available, cannot load images");
        setLoading(false);
        return;
      }
      
      const { data, error } = await supabase
        .storage
        .from('user-images')
        .list(userId, {
          sortBy: { column: 'created_at', order: 'desc' }
        });
      
      if (error) {
        console.error("Error loading images:", error);
        if (error.message.includes("The resource was not found")) {
          // This is normal for new users with no uploads yet
          console.log("User has no uploads yet");
          setUserImages([]);
          setLoading(false);
          return;
        }
        throw error;
      }
      
      console.log('Found user images:', data);
      
      if (data) {
        const imageUrls = await Promise.all(data.map(async (file) => {
          const { data: fileUrl } = supabase
            .storage
            .from('user-images')
            .getPublicUrl(`${userId}/${file.name}`);
          
          return {
            id: file.id,
            src: fileUrl.publicUrl,
            alt: file.name.split('.')[0] || 'Uploaded image'
          };
        }));
        
        console.log('Processed image URLs:', imageUrls);
        setUserImages(imageUrls);
      }
    } catch (error) {
      console.error('Error loading images:', error);
      toast({
        title: "Erro ao carregar imagens",
        description: "Não foi possível carregar suas imagens. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Load user's uploaded images when the tab changes or dialog opens
  useEffect(() => {
    if (isOpen && activeTab === 'uploads') {
      loadUserImages();
    }
  }, [isOpen, activeTab]);

  const addImageToList = (newImage: UserImage) => {
    setUserImages(prev => [newImage, ...prev]);
  };

  return {
    userImages,
    loading,
    loadUserImages,
    addImageToList
  };
};
