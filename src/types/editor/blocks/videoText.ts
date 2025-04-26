
import { BlockBase } from '../base';

export interface VideoTextBlock extends BlockBase {
  videoUrl: string;
  aspectRatio: string;
  autoplay: boolean;
  muteAudio?: boolean;
  heading?: string;
  content: string;
}
