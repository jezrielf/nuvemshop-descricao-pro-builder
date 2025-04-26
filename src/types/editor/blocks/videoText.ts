
import { BlockBase } from '../base';

export interface VideoTextBlock extends BlockBase {
  type: 'videoText';
  videoUrl: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
  autoplay?: boolean;
  muteAudio?: boolean;
  headline?: string;
  content: string;
  buttonText?: string;
  buttonUrl?: string;
}
