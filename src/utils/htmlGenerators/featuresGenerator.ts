
import { FeaturesBlock } from '@/types/editor';
import { getStylesFromBlock } from '../styleConverter';

export const generateFeaturesHtml = (block: FeaturesBlock): string => {
  // Get properly formatted style attributes
  const blockStyleAttr = getStylesFromBlock(block) ? ` style="${getStylesFromBlock(block)}"` : '';
  
  // Extract heading color and weight from block styles or use defaults
  const headingColor = block.style?.headingColor || 'inherit';
  const headingWeight = block.style?.headingWeight || 'bold';
  
  // Calculate column width based on the number of columns
  const columnWidth = 100 / Math.min(block.columns || 1, 4);
  
  // Generate features HTML
  const featuresHtml = block.features && block.features.length > 0 
    ? block.features.map(feature => `
      <div style="display: inline-block; vertical-align: top; width: calc(${columnWidth}% - 16px); margin: 8px; box-sizing: border-box;" class="feature-item">
        <div style="padding:16px;border:1px solid #e5e7eb;border-radius:6px;height:100%;">
          <h3 style="color:${headingColor};font-weight:${headingWeight};font-size:18px;margin-bottom:10px;">${feature.title}</h3>
          <p style="font-size:14px;line-height:1.6;">${feature.description}</p>
        </div>
      </div>
    `).join('')
    : '';
  
  // Create responsive columns with inline styles
  return `
    <div${blockStyleAttr} id="block-${block.id}" style="width:100%;padding:20px;margin-bottom:20px;">
      <h2 style="color:${headingColor};font-weight:${headingWeight};font-size:24px;margin-bottom:20px;text-align:center;">${block.heading}</h2>
      <div style="font-size: 0; text-align: center; margin: -8px;" class="features-container">
        ${featuresHtml}
      </div>
      <style>
        @media (max-width: 768px) {
          #block-${block.id} .feature-item {
            width: calc(100% - 16px) !important;
          }
        }
      </style>
    </div>
  `;
};
