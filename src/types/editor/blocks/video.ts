
import { BlockBase } from '../base';

export interface VideoBlock extends BlockBase {
  type: 'video';
  videoUrl: string;
  autoplay: boolean; // Required
  title: string;
  description?: string;
  heading?: string; // Added heading property
  caption?: string; // Added caption property
}
