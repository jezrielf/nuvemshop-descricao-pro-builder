
import { BlockBase } from '../base';

export interface BenefitsBlock extends BlockBase {
  type: 'benefits';
  heading: string;
  benefits: {
    id: string;
    title: string;
    description: string;
    icon?: string;
  }[];
}
