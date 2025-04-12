
import { BlockBase } from './base';

export interface AIBlock extends BlockBase {
  type: 'ai';
  content: string;
  heading?: string;
  subheading?: string;
  imageUrl?: string;
  layout?: 'default' | 'modern' | 'creative' | 'corporate';
  colorScheme?: 'default' | 'vibrant' | 'pastel' | 'monochrome';
}
