
import { BlockBase } from '../base';

export interface TextImageBlock extends BlockBase {
  type: 'textImage';
  image: {
    src: string;
    alt: string;
  };
  heading: string;
  content: string;
}
