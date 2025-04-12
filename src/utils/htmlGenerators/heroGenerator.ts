
import { HeroBlock } from '@/types/editor/blocks/hero';
import { getStylesFromBlock } from '../styleConverter';

export const generateHeroHtml = (block: HeroBlock): string => {
  const blockStyleAttr = getStylesFromBlock(block) ? ` style="${getStylesFromBlock(block)}"` : '';
  
  return `
    <div${blockStyleAttr} class="hero-block">
      <h1 style="${block.style?.headingColor ? `color:${block.style.headingColor};` : ''}font-size:28px;font-weight:bold;margin-bottom:10px;">${block.heading}</h1>
      <p style="font-size:16px;margin-bottom:20px;">${block.subheading}</p>
      ${block.buttonText ? `<a href="${block.buttonUrl || '#'}" style="display:inline-block;padding:10px 20px;background-color:#2563EB;color:white;text-decoration:none;border-radius:4px;">${block.buttonText}</a>` : ''}
    </div>
  `;
};
