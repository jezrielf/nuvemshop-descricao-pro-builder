
import { FeaturesBlock } from '@/types/editor';
import { getStylesFromBlock } from '../styleConverter';

export const generateFeaturesHtml = (block: FeaturesBlock): string => {
  // Get properly formatted style attributes
  const blockStyleAttr = getStylesFromBlock(block) ? ` style="${getStylesFromBlock(block)}"` : '';
  
  // Extract heading color and weight from block styles or use defaults
  const headingColor = block.style?.headingColor || 'inherit';
  const headingWeight = block.style?.headingWeight || 'bold';
  
  // Generate responsive column classes based on the number of columns
  const columnClass = block.columns > 1 ? `md:grid-cols-${block.columns}` : '';
  
  const featuresHtml = block.features && block.features.length > 0 
    ? block.features.map(feature => `
      <div class="feature-item w-full p-4">
        <h3 style="color:${headingColor};font-weight:${headingWeight};font-size:18px;margin-bottom:10px;">${feature.title}</h3>
        <p style="font-size:14px;">${feature.description}</p>
      </div>
    `).join('')
    : '';
  
  return `
    <div${blockStyleAttr} class="features-block">
      <h2 style="color:${headingColor};font-weight:${headingWeight};font-size:24px;margin-bottom:20px;text-align:center;">${block.heading}</h2>
      <div class="grid grid-cols-1 ${columnClass} gap-4">${featuresHtml}</div>
    </div>
  `;
};
