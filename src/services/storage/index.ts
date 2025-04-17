
import { uploadService } from './uploadService';
import { imageService } from './imageService';
import { UploadOptions, UploadResult, UserImage } from './types';

export const storageService = {
  // Re-export from uploadService
  uploadFile: uploadService.uploadFile,
  
  // Re-export from imageService
  listUserImages: imageService.listUserImages,
  deleteImage: imageService.deleteImage
};

// Export types for external usage
export type { UploadOptions, UploadResult, UserImage };
