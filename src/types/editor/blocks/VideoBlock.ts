
import { BaseBlock } from '../base';

export interface VideoBlock extends BaseBlock {
  type: 'video';
  videoUrl: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
  heading?: string; // Added heading property
  caption?: string; // Added caption property
}
