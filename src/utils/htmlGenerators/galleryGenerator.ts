
import { GalleryBlock } from '@/types/editor';
import { getStylesFromBlock } from '../styleConverter';

export const generateGalleryHtml = (block: GalleryBlock): string => {
  const blockStyleAttr = getStylesFromBlock(block) ? ` style="${getStylesFromBlock(block)}"` : '';
  
  // Determine the object-fit style based on block.style.imageFit
  const imageFit = block.style?.imageFit || 'contain';
  const objectFitStyle = `object-fit:${imageFit};`;
  
  const galleryHtml = block.images && block.images.length > 0 
    ? block.images.map(image => `
      <div style="flex:0 0 100%;padding:8px;box-sizing:border-box;" class="gallery-item">
        <div style="border:1px solid #e5e7eb;border-radius:6px;padding:8px;height:100%;">
          ${image.src ? 
            `<img src="${image.src}" alt="${image.alt || ''}" style="width:100%;height:auto;${objectFitStyle}border-radius:4px;" />` :
            `<div style="background-color:#f3f4f6;height:150px;display:flex;align-items:center;justify-content:center;border-radius:4px;"><span style="color:#9ca3af;">Imagem</span></div>`
          }
          ${image.caption ? `<p style="margin-top:8px;font-size:14px;color:#6b7280;text-align:center;">${image.caption}</p>` : ''}
        </div>
      </div>
    `).join('')
    : '';
  
  return `
    <div${blockStyleAttr} id="block-${block.id}" style="width:100%;padding:20px;margin-bottom:20px;">
      <div style="display:flex;flex-wrap:wrap;margin:-8px;" class="gallery-container">
        ${galleryHtml}
      </div>
      <style>
        @media (min-width: 768px) {
          #block-${block.id} .gallery-container > .gallery-item {
            flex: 0 0 ${100 / Math.min(block.columns || 1, 4)}%;
          }
        }
      </style>
    </div>
  `;
};
