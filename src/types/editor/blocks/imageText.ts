
import { BlockBase } from '../base';

export interface ImageTextBlock extends BlockBase {
  type: 'imageText';
  image: {
    src: string;
    alt: string;
  };
  heading: string;
  content: string;
}
