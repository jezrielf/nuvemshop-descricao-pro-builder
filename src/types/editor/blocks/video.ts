
import { BlockBase } from '../base';

export interface VideoBlock extends BlockBase {
  type: 'video';
  videoUrl: string;
  autoplay: boolean; // Making autoplay required
  title: string;
  description?: string;
}
