
import { Block } from '@/types/editor';
import { analyzeSection } from './documentAnalyzer';
import { createBasicTextBlock } from '../creators/sectionCreators';

export const splitContentIntoParts = (container: Element, blocks: Block[]): void => {
  // Tentamos diferentes abordagens de divisão
  const images = container.querySelectorAll('img');
  
  if (images.length > 0) {
    images.forEach(img => {
      const parent = img.parentElement || container;
      processImageOrWrapper(parent, img as HTMLImageElement, blocks);
    });
    return;
  }
  
  const paragraphs = container.querySelectorAll('p');
  if (paragraphs.length > 2) {
    for (let i = 0; i < paragraphs.length; i += 3) {
      const groupElement = document.createElement('div');
      for (let j = i; j < i + 3 && j < paragraphs.length; j++) {
        groupElement.appendChild(paragraphs[j].cloneNode(true));
      }
      
      createBasicTextBlock(groupElement.innerHTML, blocks);
    }
    return;
  }
  
  analyzeContent(container, blocks);
};

const processImageOrWrapper = (parent: Element, img: HTMLImageElement, blocks: Block[]): void => {
  const wrapper = document.createElement('div');
  
  if (parent.childElementCount <= 3) {
    wrapper.innerHTML = parent.innerHTML;
  } else {
    wrapper.appendChild(img.cloneNode(true));
    
    let nextElement = img.nextElementSibling;
    if (nextElement && nextElement.tagName === 'P') {
      wrapper.appendChild(nextElement.cloneNode(true));
    }
    
    let prevElement = img.previousElementSibling;
    if (prevElement && (prevElement.tagName === 'H2' || prevElement.tagName === 'H3')) {
      wrapper.insertBefore(prevElement.cloneNode(true), wrapper.firstChild);
    }
  }
  
  analyzeSection(wrapper, blocks);
};

export const analyzeContent = (element: Element, blocks: Block[]): void => {
  const text = element.textContent?.trim();
  if (!text || text.length === 0) return;
  
  const hasLists = element.querySelectorAll('li').length > 3;
  const hasImagesCount = element.querySelectorAll('img').length;
  const hasHeadings = element.querySelectorAll('h1, h2, h3, h4, h5, h6').length > 0;
  
  if (hasImagesCount && hasImagesCount > 2) {
    const images = element.querySelectorAll('img');
    processImageOrWrapper(element, images[0] as HTMLImageElement, blocks);
  } else if (hasImagesCount === 1) {
    const image = element.querySelector('img');
    if (image) {
      processImageOrWrapper(element, image as HTMLImageElement, blocks);
    }
  } else if (hasLists) {
    analyzeSection(element, blocks);
  } else {
    createBasicTextBlock(element.innerHTML, blocks);
  }
};
