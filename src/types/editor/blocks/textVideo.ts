
import { BlockBase } from '../base';

export interface TextVideoBlock extends BlockBase {
  type: 'textVideo';
  videoUrl: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
  autoplay?: boolean;
  muteAudio?: boolean;
  headline?: string;
  content: string;
  buttonText?: string;
  buttonUrl?: string;
}
