
import { ImageTextBlock } from '@/types/editor';
import { getStylesFromBlock } from '../styleConverter';

export const generateImageTextHtml = (block: ImageTextBlock): string => {
  const blockStyleAttr = getStylesFromBlock(block) ? ` style="${getStylesFromBlock(block)}"` : '';
  
  // Determine the object-fit style based on block.style.imageFit
  const imageFit = block.style?.imageFit || 'contain';
  const objectFitStyle = `object-fit:${imageFit};`;
  
  return `
    <div${blockStyleAttr} id="block-${block.id}" style="width:100%;">
      <div style="display:flex;flex-direction:column;gap:20px;width:100%;" class="image-text-container">
        <div style="width:100%;" class="image-container">
          ${block.image.src ? 
            `<img src="${block.image.src}" alt="${block.image.alt || ''}" style="width:100%;height:auto;max-width:100%;${objectFitStyle}border-radius:4px;" />` :
            `<div style="background-color:#f3f4f6;height:200px;display:flex;align-items:center;justify-content:center;border-radius:4px;"><span style="color:#9ca3af;">Imagem do Produto</span></div>`
          }
        </div>
        <div style="width:100%;" class="text-container">
          <h2 style="font-size:24px;font-weight:bold;margin-bottom:10px;">${block.heading}</h2>
          <div style="font-size:16px;line-height:1.6;">${block.content}</div>
        </div>
      </div>
      <style>
        @media (min-width: 768px) {
          #block-${block.id} .image-text-container {
            flex-direction: row !important;
          }
          #block-${block.id} .image-container,
          #block-${block.id} .text-container {
            width: 50% !important;
            padding: 0 10px;
          }
        }
      </style>
    </div>
  `;
};
