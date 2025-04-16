
import { BaseBlock } from '../base';

export interface VideoBlock extends BaseBlock {
  type: 'video';
  videoUrl: string;
  title: string; // Changed from optional to required
  aspectRatio?: '16:9' | '4:3' | '1:1';
  heading?: string;
  caption?: string;
  autoplay?: boolean;
  description?: string;
}
