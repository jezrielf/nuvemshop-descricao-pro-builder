
import { ImageTextBlock } from '@/types/editor';
import { getStylesFromBlock } from '../styleConverter';

export const generateImageTextHtml = (block: ImageTextBlock): string => {
  const blockStyleAttr = getStylesFromBlock(block) ? ` style="${getStylesFromBlock(block)}"` : '';
  
  // Determine the object-fit style based on block.style.imageFit
  const imageFit = block.style?.imageFit || 'contain';
  const objectFitStyle = `object-fit:${imageFit};`;
  
  return `
    <div${blockStyleAttr} style="width:100%;padding:20px;margin-bottom:20px;">
      <div style="display:flex;flex-wrap:wrap;gap:20px;">
        <div style="flex:1;min-width:300px;">
          ${block.image.src ? 
            `<img src="${block.image.src}" alt="${block.image.alt || ''}" style="width:100%;height:auto;${objectFitStyle}border-radius:4px;" />` :
            `<div style="background-color:#f3f4f6;height:200px;display:flex;align-items:center;justify-content:center;border-radius:4px;"><span style="color:#9ca3af;">Imagem do Produto</span></div>`
          }
        </div>
        <div style="flex:1;min-width:300px;">
          <h2 style="font-size:24px;font-weight:bold;margin-bottom:10px;">${block.heading}</h2>
          <div style="font-size:16px;line-height:1.6;">${block.content}</div>
        </div>
      </div>
    </div>
  `;
};
