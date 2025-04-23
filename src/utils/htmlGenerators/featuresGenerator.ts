
import { FeaturesBlock } from "@/types/editor";
import { getStylesFromBlock } from "../styleConverter";

export function generateFeaturesBlockHtml(block: FeaturesBlock): string {
  const { heading, features } = block;
  
  if (!features || features.length === 0) {
    return '';
  }
  
  // Get styles for the block
  const blockStyles = getStylesFromBlock(block);
  
  // Determine number of columns based on block.columns
  const columnsValue = (() => {
    if (typeof block.columns === 'number') return block.columns;
    if (block.columns === 'full') return 1;
    if (block.columns === '1/2') return 2;
    if (block.columns === '1/3') return 3;
    if (block.columns === '2/3') return 2;
    if (block.columns === '1/4') return 4;
    if (block.columns === '3/4') return 1;
    return 1; // Default to 1 column
  })();
  
  // Ensure columns value is between 1 and 4
  const columnCount = Math.min(Math.max(Number(columnsValue), 1), 4);
  
  // Generate HTML for each feature with fixed width percentage
  const featuresHtml = features.map(feature => `
    <div class="feature-item mb-4" style="display: inline-block; vertical-align: top; width: ${100/columnCount}%; padding: 8px; box-sizing: border-box;">
      <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; height: 100%; box-sizing: border-box;">
        ${feature.icon ? `<div style="${block.layout === 'vertical' ? 'text-align: center; margin-bottom: 8px;' : 'float: left; margin-right: 12px;'} font-size: 24px;">${feature.icon}</div>` : ''}
        <div style="${block.layout === 'vertical' ? 'text-align: center;' : ''}">
          <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 8px; margin-top: 0;">${feature.title}</h3>
          <p style="margin: 0; color: #4b5563;">${feature.description || ''}</p>
        </div>
        <div style="clear: both;"></div>
      </div>
    </div>
  `).join('');
  
  return `
    <div class="features-block" id="block-${block.id}" style="${blockStyles}">
      <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 16px; text-align: center;">${heading || 'Características'}</h2>
      <div class="features-container" style="font-size: 0; margin: 0 -8px; text-align: left;">
        ${featuresHtml}
      </div>
      <style>
        @media (max-width: 768px) {
          #block-${block.id} .feature-item {
            width: 100% !important;
          }
        }
      </style>
    </div>
  `;
}
