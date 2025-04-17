
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

interface UploadOptions {
  user: User | null;
  file: File;
  path?: string;
  onProgress?: (progress: number) => void;
}

interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export const storageService = {
  async uploadFile({ user, file, path = 'uploads', onProgress }: UploadOptions): Promise<UploadResult> {
    // Validate user authentication
    if (!user) {
      console.error('Upload failed: User not authenticated');
      return { 
        success: false, 
        error: 'Authentication required to upload files'
      };
    }

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      return { 
        success: false, 
        error: 'Only image files are allowed'
      };
    }

    // 5MB file size limit
    if (file.size > 5 * 1024 * 1024) {
      return { 
        success: false, 
        error: 'File too large. Maximum size is 5MB'
      };
    }

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${file.name.split('.')[0]
        .replace(/[^a-z0-9]/gi, '_')
        .toLowerCase()}.${fileExt}`;
      
      // Construct file path
      const filePath = `${user.id}/${path}/${fileName}`;
      
      console.log('Uploading file to:', filePath);

      // Simulate upload progress
      const simulateProgress = (onProgress: (progress: number) => void) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          if (progress <= 90) {
            onProgress(progress);
          } else {
            clearInterval(interval);
          }
        }, 200);
        return interval;
      };

      // Start progress simulation if callback provided
      const progressInterval = onProgress 
        ? simulateProgress(onProgress) 
        : null;

      // Upload file
      const { data, error } = await supabase.storage
        .from('user-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      // Clear progress interval
      if (progressInterval) {
        clearInterval(progressInterval);
      }

      // Handle upload errors
      if (error) {
        console.error('Upload error:', error);
        return { 
          success: false, 
          error: error.message || 'Upload failed'
        };
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('user-images')
        .getPublicUrl(filePath);

      if (!publicUrlData?.publicUrl) {
        return { 
          success: false, 
          error: 'Could not retrieve public URL' 
        };
      }

      // Final progress update
      if (onProgress) {
        onProgress(100);
      }

      console.log('Upload successful, URL:', publicUrlData.publicUrl);

      return {
        success: true,
        url: publicUrlData.publicUrl
      };

    } catch (error: any) {
      console.error('Unexpected upload error:', error);
      return { 
        success: false, 
        error: error.message || 'Unexpected upload error'
      };
    }
  },

  async listUserImages(userId: string): Promise<Array<{ id: string; src: string; alt: string }>> {
    if (!userId) return [];

    try {
      const { data: files, error } = await supabase.storage
        .from('user-images')
        .list(userId, {
          sortBy: { column: 'created_at', order: 'desc' }
        });
      
      if (error) {
        console.error('Error listing images:', error);
        return [];
      }
      
      if (!files || files.length === 0) {
        return [];
      }
      
      return files.map(file => {
        const { data } = supabase.storage
          .from('user-images')
          .getPublicUrl(`${userId}/${file.name}`);
        
        return {
          id: file.id || file.name,
          src: data.publicUrl,
          alt: file.name.split('.')[0].replace(/_/g, ' ') || 'Image'
        };
      });
    } catch (error) {
      console.error('Error listing images:', error);
      return [];
    }
  },

  async deleteImage(userId: string, imageUrl: string): Promise<boolean> {
    if (!userId || !imageUrl) return false;
    
    try {
      const url = new URL(imageUrl);
      const pathParts = url.pathname.split('/');
      const fileName = pathParts[pathParts.length - 1];
      const filePath = `${userId}/${fileName}`;
      
      const { error } = await supabase.storage
        .from('user-images')
        .remove([filePath]);
      
      if (error) {
        console.error('Deletion error:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Image deletion error:', error);
      return false;
    }
  }
};
