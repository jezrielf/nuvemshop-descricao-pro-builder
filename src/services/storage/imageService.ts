
import { supabase } from '@/integrations/supabase/client';
import { UserImage } from './types';

export const imageService = {
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
