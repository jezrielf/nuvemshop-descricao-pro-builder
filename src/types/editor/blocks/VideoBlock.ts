
import { BlockBase } from '../base';

export interface VideoBlock extends BlockBase {
  type: 'video';
  videoUrl: string;
  title: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
  heading?: string;
  caption?: string;
  autoplay?: boolean;
  description?: string;
}
