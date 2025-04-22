
import { BlockBase } from '../base';

export interface TextBlock extends BlockBase {
  type: 'text';
  heading: string;
  content: string;
  style: Record<string, any>; // Changed from optional to required
}
