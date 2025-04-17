
import { User } from '@supabase/supabase-js';

export interface UploadOptions {
  user: User | null;
  file: File;
  path?: string; // Optional path parameter
  onProgress?: (progress: number) => void;
}

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export interface UserImage {
  id: string;
  src: string;
  alt: string;
}
