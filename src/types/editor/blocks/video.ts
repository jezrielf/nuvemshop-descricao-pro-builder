
import { BlockBase } from '../base';

export interface VideoBlock extends BlockBase {
  type: 'video';
  videoUrl: string;
  autoplay: boolean; // Required
  title: string;
  description?: string;
}
