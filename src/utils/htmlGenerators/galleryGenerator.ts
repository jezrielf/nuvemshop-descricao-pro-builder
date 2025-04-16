
import { GalleryBlock } from '@/types/editor';
import { getStylesFromBlock } from '../styleConverter';

export const generateGalleryHtml = (block: GalleryBlock): string => {
  const blockStyles = getStylesFromBlock(block);
  const imageFitValue = block.style?.imageFit || 'contain';
  const objectFit = imageFitValue === 'cover' ? 'cover' : 'contain';
  
  // Calculate column width based on the number of columns
  const columnWidth = 100 / Math.min(block.columns || 1, 4);
  
  // Generate HTML for each gallery image
  const imagesHtml = block.images && block.images.length > 0 
    ? block.images.map(image => `
      <div style="display: inline-block; vertical-align: top; width: calc(${columnWidth}% - 16px); margin: 8px; box-sizing: border-box;" class="gallery-item">
        <figure style="margin: 0; text-align: center;">
          ${image.src 
            ? `<img src="${image.src}" alt="${image.alt || ''}" style="max-width: 100%; height: auto; object-fit: ${objectFit}; border-radius: 4px;">` 
            : '<div style="background-color: #f3f4f6; aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center; border-radius: 4px;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 16L8.586 11.414C8.96106 11.0391 9.46967 10.8284 10 10.8284C10.5303 10.8284 11.0389 11.0391 11.414 11.414L16 16M14 14L15.586 12.414C15.9611 12.0391 16.4697 11.8284 17 11.8284C17.5303 11.8284 18.0389 12.0391 18.414 12.414L20 14M14 8H14.01M6 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20Z" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>'
          }
          ${image.caption ? `<figcaption style="margin-top: 8px; font-size: 14px; color: #6b7280;">${image.caption}</figcaption>` : ''}
        </figure>
      </div>
    `).join('')
    : '';
  
  return `
    <div class="gallery-block" id="block-${block.id}" style="${blockStyles}">
      <div style="font-size: 0; text-align: center; margin: -8px;" class="gallery-container">
        ${imagesHtml}
      </div>
      <style>
        @media (max-width: 768px) {
          #block-${block.id} .gallery-item {
            width: calc(100% - 16px) !important;
          }
        }
      </style>
    </div>
  `;
};
