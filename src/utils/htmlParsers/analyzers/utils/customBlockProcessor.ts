
import { Block } from '@/types/editor';
import { isSimpleTextFragment } from './textFragmentAnalyzer';
import { createBasicTextBlock } from '../../creators/sectionCreators';
import { analyzeDocument } from '../documentAnalyzer';

export const processCustomBlocks = (doc: Document, blocks: Block[]): void => {
  const container = doc.querySelector('.nuvemshop-product-description');
  if (!container) return;
  
  const blockElements = container.querySelectorAll('[id^="product-block-"]');
  
  if (blockElements.length > 0) {
    blockElements.forEach(element => {
      if (isSimpleTextFragment(element)) {
        createBasicTextBlock(element.innerHTML, blocks);
      } else {
        analyzeDocument(element, blocks);
      }
    });
  } else {
    analyzeDocument(container, blocks);
  }
};
