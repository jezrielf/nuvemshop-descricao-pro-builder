
import { GalleryBlock } from '@/types/editor';
import { getStylesFromBlock } from '../styleConverter';

export const generateGalleryHtml = (block: GalleryBlock): string => {
  const blockStyleAttr = getStylesFromBlock(block) ? ` style="${getStylesFromBlock(block)}"` : '';
  
  const galleryHtml = block.images && block.images.length > 0 
    ? block.images.map(image => `
      <div style="flex:1;padding:10px;min-width:${100/block.columns}%;">
        ${image.src ? 
          `<img src="${image.src}" alt="${image.alt || ''}" style="width:100%;height:auto;object-fit:cover;border-radius:4px;" />` :
          `<div style="background-color:#f3f4f6;height:150px;display:flex;align-items:center;justify-content:center;border-radius:4px;"><span style="color:#9ca3af;">Imagem</span></div>`
        }
        ${image.caption ? `<p style="margin-top:8px;font-size:14px;color:#6b7280;text-align:center;">${image.caption}</p>` : ''}
      </div>
    `).join('')
    : '';
  
  return `
    <div${blockStyleAttr} style="width:100%;padding:20px;margin-bottom:20px;">
      <div style="display:flex;flex-wrap:wrap;margin:-10px;">${galleryHtml}</div>
    </div>
  `;
};
