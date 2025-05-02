
import { BlockBase } from '../base';

export interface VideoBlock extends BlockBase {
  type: 'video';
  videoUrl: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
  description?: string;
  autoplay?: boolean;
  muteAudio?: boolean;
}
