
import { BlockBase } from '../base';

export interface TextVideoBlock extends BlockBase {
  videoUrl: string;
  aspectRatio: string;
  autoplay: boolean;
  muteAudio?: boolean;
  heading?: string;
  content: string;
}
