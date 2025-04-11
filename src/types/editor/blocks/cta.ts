
import { BlockBase } from '../base';

export interface CTABlock extends BlockBase {
  type: 'cta';
  heading: string;
  content: string;
  buttonText: string;
  buttonUrl?: string;
}
