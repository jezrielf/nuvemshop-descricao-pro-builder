
import { BlockBase } from '../base';

export interface SpecificationsBlock extends BlockBase {
  type: 'specifications';
  heading: string;
  specs: {
    id: string;
    name: string;
    value: string;
  }[];
}
