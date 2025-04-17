import { BlockBase } from '../base';

export interface VideoBlock extends BlockBase {
  type: 'video';
  videoUrl: string;
  title: string;
  heading?: string;
  caption?: string;
  description?: string;
  autoplay?: boolean;
  aspectRatio?: '16:9' | '4:3' | '1:1';
}
