
import { supabase } from '@/integrations/supabase/client';
import { UploadOptions, UploadResult } from './types';

export const uploadService = {
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
      
      // Create progress tracker
      let progressInterval: NodeJS.Timeout | null = null;
      
      if (onProgress) {
        let progress = 0;
        progressInterval = setInterval(() => {
          progress += 5;
          if (progress <= 90) {
            onProgress(progress);
          } else {
            if (progressInterval) clearInterval(progressInterval);
            progressInterval = null;
          }
        }, 100);
      }

      console.log('Initiating upload to path:', filePath);

      // Ensure the bucket exists
      try {
        const { data: buckets } = await supabase.storage.listBuckets();
        if (!buckets?.find(b => b.name === 'user-images')) {
          console.log('Creating user-images bucket');
          await supabase.storage.createBucket('user-images', {
            public: true,
            fileSizeLimit: 5242880 // 5MB
          });
        }
      } catch (bucketError) {
        console.log('Bucket operation error (continuing):', bucketError);
        // Continue anyway as the bucket might exist
      }

      // Upload file
      const { data, error: uploadError } = await supabase.storage
        .from('user-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      // Clear progress interval
      if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
      }

      // Handle upload errors
      if (uploadError) {
        console.error('Upload error:', uploadError);
        return { 
          success: false, 
          error: uploadError.message || 'Upload failed'
        };
      }

      console.log('Upload successful, getting public URL for:', filePath);

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('user-images')
        .getPublicUrl(filePath);

      if (!publicUrlData?.publicUrl) {
        console.error('Failed to get public URL');
        return { 
          success: false, 
          error: 'Could not retrieve public URL' 
        };
      }

      console.log('Public URL retrieved:', publicUrlData.publicUrl);

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
