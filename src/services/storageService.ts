
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

interface UploadOptions {
  user: User | null;
  file: File;
  onProgress?: (progress: number) => void;
}

interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export const storageService = {
  async uploadFile({ user, file, onProgress }: UploadOptions): Promise<UploadResult> {
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
      const filePath = `${user.id}/${fileName}`;
      
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
  }
};
