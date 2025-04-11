
import { BlockBase } from '../base';

export interface HeroBlock extends BlockBase {
  type: 'hero';
  heading: string;
  subheading: string;
  backgroundImage?: string;
  buttonText?: string;
  buttonUrl?: string;
  image?: {
    src: string;
    alt: string;
  };
}
