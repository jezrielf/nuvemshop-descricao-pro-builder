
import { BlockBase } from '../base';

export interface FeaturesBlock extends BlockBase {
  type: 'features';
  heading: string;
  layout?: 'vertical' | 'horizontal';
  features: {
    id: string;
    title: string;
    description: string;
    icon: string; // Required
  }[];
}
