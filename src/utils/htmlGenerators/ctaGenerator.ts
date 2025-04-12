
import { CTABlock } from '@/types/editor/blocks/cta';
import { getStylesFromBlock } from '../styleConverter';

export const generateCTAHtml = (block: CTABlock): string => {
  const blockStyleAttr = getStylesFromBlock(block) ? ` style="${getStylesFromBlock(block)}"` : '';
  
  return `
    <div${blockStyleAttr} style="width:100%;padding:20px;margin-bottom:20px;">
      <div style="background-color:#f9fafb;padding:30px;border-radius:8px;text-align:center;">
        <h2 style="font-size:24px;font-weight:bold;margin-bottom:10px;">${block.heading}</h2>
        <div style="font-size:16px;line-height:1.6;margin-bottom:20px;max-width:600px;margin-left:auto;margin-right:auto;">${block.content}</div>
        <a href="${block.buttonUrl || '#'}" style="display:inline-block;padding:12px 24px;background-color:#2563EB;color:white;font-weight:500;text-decoration:none;border-radius:4px;font-size:16px;">${block.buttonText}</a>
      </div>
    </div>
  `;
};
