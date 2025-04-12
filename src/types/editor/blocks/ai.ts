
import { BlockBase } from '../base';

export interface AIBlock extends BlockBase {
  type: 'ai';
  content: string;
}
