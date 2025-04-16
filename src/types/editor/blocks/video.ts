
import { BlockBase } from '../base';

export interface VideoBlock extends BlockBase {
  type: 'video';
  videoUrl: string;
  autoplay?: boolean;
  title?: string;
  description?: string;
  heading?: string;
  caption?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
}
