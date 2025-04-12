
import { AIBlock } from '@/types/editor';
import { getStylesFromBlock } from '../styleConverter';

export const generateAIHtml = (block: AIBlock): string => {
  // This block doesn't render anything in the HTML output
  // as it's only a tool for generating other blocks
  return '';
};
