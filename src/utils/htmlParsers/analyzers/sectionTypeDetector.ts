
import { BlockType } from '@/types/editor';

export const determineBlockType = (element: Element): BlockType => {
  if (element.querySelector('h1, .hero, .banner')) {
    return 'hero';
  }
  
  const images = element.querySelectorAll('img');
  if (images.length > 2) {
    return 'gallery';
  } else if (images.length === 1) {
    return 'imageText';
  }
  
  if (element.querySelectorAll('li').length > 3) {
    return 'features';
  }
  
  if (element.querySelectorAll('dt, dd').length > 0) {
    return 'specifications';
  }
  
  if (element.querySelector('details, .faq-item, .accordion-item')) {
    return 'faq';
  }
  
  if (element.querySelector('a.button, .btn, button') && 
      element.textContent && element.textContent.length < 300) {
    return 'cta';
  }
  
  return 'text';
};

export const isSimpleTextFragment = (element: Element): boolean => {
  const hasComplexElements = element.querySelector('div > div, section, article, aside, nav, footer, header');
  if (hasComplexElements) return false;
  
  const childCount = element.children.length;
  const textLength = element.textContent?.trim().length || 0;
  
  return (childCount <= 5 && textLength < 500);
};
