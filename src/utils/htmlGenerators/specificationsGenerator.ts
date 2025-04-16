
import { SpecificationsBlock } from '@/types/editor';
import { getStylesFromBlock } from '../styleConverter';

export const generateSpecificationsHtml = (block: SpecificationsBlock): string => {
  const blockStyles = getStylesFromBlock(block);
  
  // Extract heading color from block styles or use default
  const headingColor = block.style?.headingColor || 'inherit';
  const headingWeight = block.style?.headingWeight || 'bold';
  
  // Two-column layout for specifications when columns > 1
  if (block.columns > 1) {
    // Calculate column width based on the number of columns
    const columnWidth = 100 / Math.min(block.columns || 1, 4);
    
    const specsHtml = block.specs && block.specs.length > 0 
      ? block.specs.map(spec => `
        <div style="display: inline-block; vertical-align: top; width: calc(${columnWidth}% - 16px); margin: 8px; box-sizing: border-box;" class="spec-item">
          <div class="spec-container" style="padding: 12px; border: 1px solid #e5e7eb; border-radius: 6px;">
            <div style="font-weight: 600;">${spec.name}</div>
            <div>${spec.value}</div>
          </div>
        </div>
      `).join('')
      : '';
    
    return `
      <div class="specifications-block" id="block-${block.id}" style="${blockStyles}">
        <h2 style="color: ${headingColor}; font-weight: ${headingWeight}; font-size: 24px; margin-bottom: 20px;">${block.heading}</h2>
        <div style="font-size: 0; text-align: center; margin: -8px;" class="specs-container">
          ${specsHtml}
        </div>
        <style>
          @media (max-width: 768px) {
            #block-${block.id} .spec-item {
              width: calc(100% - 16px) !important;
            }
          }
        </style>
      </div>
    `;
  }
  
  // Traditional table layout for single column
  const specsHtml = block.specs && block.specs.length > 0 
    ? block.specs.map((spec, index) => `
      <tr style="${index % 2 === 0 ? 'background-color: #f9fafb;' : ''}">
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: 500;">${spec.name}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${spec.value}</td>
      </tr>
    `).join('')
    : '';
  
  return `
    <div class="specifications-block" id="block-${block.id}" style="${blockStyles}">
      <h2 style="color: ${headingColor}; font-weight: ${headingWeight}; font-size: 24px; margin-bottom: 20px;">${block.heading}</h2>
      <div style="border: 1px solid #e5e7eb; border-radius: 6px; overflow: hidden;">
        <table style="width: 100%; border-collapse: collapse;">
          <tbody>
            ${specsHtml}
          </tbody>
        </table>
      </div>
    </div>
  `;
};
