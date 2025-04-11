
import { BlockBase } from '../base';

export interface FAQBlock extends BlockBase {
  type: 'faq';
  heading: string;
  questions: {
    id: string;
    question: string;
    answer: string;
  }[];
}
