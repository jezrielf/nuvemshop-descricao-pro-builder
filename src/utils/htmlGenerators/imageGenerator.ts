
import { ImageBlock } from '@/types/editor';
import { getStylesFromBlock } from '../styleConverter';

export const generateImageHtml = (block: ImageBlock): string => {
  const blockStyleAttr = getStylesFromBlock(block) ? ` style="${getStylesFromBlock(block)}"` : '';
  
  // Determine the object-fit style based on block.style.imageFit
  const imageFit = block.style?.imageFit || 'contain';
  const objectFitStyle = `object-fit:${imageFit};`;
  
  // Use src directly from the block
  const imageSrc = block.src || '';
  const imageAlt = block.alt || '';
  const imageCaption = block.caption || '';
  
  return `
    <div${blockStyleAttr} style="width:100%;padding:20px;margin-bottom:20px;text-align:center;">
      ${imageSrc ? 
        `<img src="${imageSrc}" alt="${imageAlt}" style="max-width:100%;height:auto;${objectFitStyle}border-radius:4px;" />` :
        `<div style="background-color:#f3f4f6;height:200px;display:flex;align-items:center;justify-content:center;border-radius:4px;"><span style="color:#9ca3af;">Imagem do Produto</span></div>`
      }
      ${imageCaption ? `<p style="margin-top:8px;font-size:14px;color:#6b7280;">${imageCaption}</p>` : ''}
    </div>
  `;
};
