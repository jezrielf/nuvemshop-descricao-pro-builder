
import { BlockBase } from '../base';

export interface VideoBlock extends BlockBase {
  videoUrl: string;
  aspectRatio: string;
  autoplay: boolean;
  muteAudio?: boolean;
  description?: string;
  caption?: string;
  heading?: string;
}
