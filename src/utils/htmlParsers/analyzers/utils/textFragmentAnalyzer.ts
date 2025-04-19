
import { Block } from '@/types/editor';
import { createBasicTextBlock } from '../../creators/sectionCreators';

export const isSimpleTextFragment = (element: Element): boolean => {
  const hasComplexElements = element.querySelector('div > div, section, article, aside, nav, footer, header');
  if (hasComplexElements) return false;
  
  const childCount = element.children.length;
  const textLength = element.textContent?.trim().length || 0;
  
  return (childCount <= 5 && textLength < 500);
};

export const createSimpleTextBlock = (element: Element, blocks: Block[]): void => {
  const heading = element.querySelector('h1, h2, h3');
  let title = 'Texto';
  
  if (heading) {
    title = heading.textContent?.trim() || 'Texto';
  } else {
    const firstLine = element.textContent?.trim().split('\n')[0];
    title = firstLine?.length > 30 ? 'Texto' : (firstLine || 'Texto');
  }
  
  createBasicTextBlock(element.innerHTML, blocks, title);
};
