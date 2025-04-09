
import { BenefitsBlock } from '@/types/editor';
import { getStylesFromBlock } from '../styleConverter';

export const generateBenefitsHtml = (block: BenefitsBlock): string => {
  const blockStyleAttr = getStylesFromBlock(block) ? ` style="${getStylesFromBlock(block)}"` : '';
  
  const benefitsHtml = block.benefits && block.benefits.length > 0 
    ? block.benefits.map(benefit => `
      <div style="flex:1;padding:15px;min-width:${100/block.columns}%;">
        <h3 style="font-size:18px;font-weight:bold;margin-bottom:10px;">${benefit.title}</h3>
        <p style="font-size:14px;">${benefit.description}</p>
      </div>
    `).join('')
    : '';
  
  return `
    <div${blockStyleAttr} style="width:100%;padding:20px;margin-bottom:20px;">
      <h2 style="font-size:24px;font-weight:bold;margin-bottom:20px;text-align:center;">${block.heading}</h2>
      <div style="display:flex;flex-wrap:wrap;">${benefitsHtml}</div>
    </div>
  `;
};
