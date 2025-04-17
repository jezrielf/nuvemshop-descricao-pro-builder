
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

interface UploadOptions {
  user: User | null;
  file: File;
  path?: string; // Optional path parameter
  onProgress?: (progress: number) => void;
}

interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

interface UserImage {
  id: string;
  src: string;
  alt: string;
}

export const storageService = {
  async uploadFile({ user, file, path, onProgress }: UploadOptions): Promise<UploadResult> {
    // Validate user authentication
    if (!user) {
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
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      
      // Construct file path
      const filePath = path 
        ? `${user.id}/${path}/${fileName}`
        : `${user.id}/${fileName}`;
      
      // Simulate upload progress
      let progressInterval: number | null = null;
      if (onProgress) {
        let progress = 0;
        progressInterval = setInterval(() => {
          progress += 10;
          if (progress <= 90) {
            onProgress(progress);
          } else {
            clearInterval(progressInterval);
          }
        }, 200) as unknown as number;
      }

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

  async listUserImages(userId: string): Promise<UserImage[]> {
    try {
      if (!userId) {
        console.error('No user ID provided for listing images');
        return [];
      }

      // List files in user folder
      const { data: files, error } = await supabase.storage
        .from('user-images')
        .list(userId, {
          sortBy: { column: 'created_at', order: 'desc' }
        });

      if (error) {
        console.error('Error listing user images:', error);
        return [];
      }

      if (!files || files.length === 0) {
        return [];
      }

      // Map files to UserImage format
      return files.map(file => {
        const { data: urlData } = supabase.storage
          .from('user-images')
          .getPublicUrl(`${userId}/${file.name}`);

        return {
          id: file.id || file.name,
          src: urlData.publicUrl,
          alt: file.name.split('.')[0] || 'User image'
        };
      });
    } catch (error) {
      console.error('Unexpected error listing images:', error);
      return [];
    }
  },

  async deleteImage(userId: string, imageUrl: string): Promise<boolean> {
    try {
      if (!userId || !imageUrl) {
        return false;
      }

      // Extract file path from URL
      const url = new URL(imageUrl);
      const pathname = url.pathname;
      
      // Get file path relative to the bucket
      const pathParts = pathname.split('/');
      const bucketNameIndex = pathParts.findIndex(part => part === 'user-images');
      
      if (bucketNameIndex === -1 || bucketNameIndex + 1 >= pathParts.length) {
        console.error('Invalid image URL format');
        return false;
      }
      
      const filePath = pathParts.slice(bucketNameIndex + 1).join('/');
      
      // Delete the file
      const { error } = await supabase.storage
        .from('user-images')
        .remove([filePath]);
      
      if (error) {
        console.error('Error deleting image:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Unexpected error deleting image:', error);
      return false;
    }
  }
};
