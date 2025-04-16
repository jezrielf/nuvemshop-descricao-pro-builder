
import { BenefitsBlock } from '@/types/editor';
import { getStylesFromBlock } from '../styleConverter';

export const generateBenefitsHtml = (block: BenefitsBlock): string => {
  // Get properly formatted style attributes
  const blockStyles = getStylesFromBlock(block);
  
  // Extract heading color from block styles or use default
  const headingColor = block.style?.headingColor || 'inherit';
  const headingWeight = block.style?.headingWeight || 'bold';
  
  // Calculate column width based on the number of columns
  const columnWidth = 100 / Math.min(block.columns || 1, 4);
  
  const benefitsHtml = block.benefits && block.benefits.length > 0 
    ? block.benefits.map(benefit => `
      <div style="display: inline-block; vertical-align: top; width: calc(${columnWidth}% - 16px); margin: 8px; box-sizing: border-box;" class="benefit-item">
        <div style="padding:16px;border:1px solid #e5e7eb;border-radius:6px;height:100%;">
          <h3 style="color: ${headingColor}; font-weight: ${headingWeight}; font-size: 18px; margin-bottom: 10px;">${benefit.title}</h3>
          <p style="font-size: 14px;line-height:1.6;">${benefit.description}</p>
        </div>
      </div>
    `).join('')
    : '';
  
  return `
    <div class="benefits-block" id="block-${block.id}" style="${blockStyles}width:100%;padding:20px;margin-bottom:20px;">
      <h2 style="color: ${headingColor}; font-weight: ${headingWeight}; font-size: 24px; margin-bottom: 20px; text-align: center;">${block.heading}</h2>
      <div style="font-size: 0; text-align: center; margin: -8px;" class="benefits-container">${benefitsHtml}</div>
      <style>
        @media (max-width: 768px) {
          #block-${block.id} .benefit-item {
            width: calc(100% - 16px) !important;
          }
        }
      </style>
    </div>
  `;
};
