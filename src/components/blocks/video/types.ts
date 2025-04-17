
import { z } from 'zod';
import { videoFormSchema } from './videoSchema';

export type VideoFormValues = z.infer<typeof videoFormSchema>;

export interface VideoUrlParserResult {
  embedUrl: string;
  isValid: boolean;
}
