
import { BlockBase } from '../base';

export interface TextBlock extends BlockBase {
  type: 'text';
  heading: string;
  content: string;
  style: BlockBase['style']; // Explicitly inheriting the style from BlockBase
}
