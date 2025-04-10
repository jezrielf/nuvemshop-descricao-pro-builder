
import { BenefitsBlock } from '@/types/editor';
import { getStylesFromBlock } from '../styleConverter';

export const generateBenefitsHtml = (block: BenefitsBlock): string => {
  // Get properly formatted style attributes
  const blockStyles = getStylesFromBlock(block);
  
  // Extract heading color from block styles or use default
  const headingColor = block.style?.headingColor || 'inherit';
  const headingWeight = block.style?.headingWeight || 'bold';
  
  // Generate responsive column classes based on the number of columns
  const columnClass = block.columns > 1 ? `md:grid-cols-${block.columns}` : '';
  
  const benefitsHtml = block.benefits && block.benefits.length > 0 
    ? block.benefits.map(benefit => `
      <div class="benefit-item w-full p-4">
        <h3 style="color: ${headingColor}; font-weight: ${headingWeight}; font-size: 18px; margin-bottom: 10px;">${benefit.title}</h3>
        <p style="font-size: 14px;">${benefit.description}</p>
      </div>
    `).join('')
    : '';
  
  return `
    <div class="benefits-block" style="${blockStyles}">
      <h2 style="color: ${headingColor}; font-weight: ${headingWeight}; font-size: 24px; margin-bottom: 20px; text-align: center;">${block.heading}</h2>
      <div class="grid grid-cols-1 ${columnClass} gap-4">${benefitsHtml}</div>
    </div>
  `;
};
