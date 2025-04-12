
import { SpecificationsBlock } from '@/types/editor/blocks/specifications';
import { getStylesFromBlock } from '../styleConverter';

export const generateSpecificationsHtml = (block: SpecificationsBlock): string => {
  const blockStyles = getStylesFromBlock(block);
  
  // Extract heading color from block styles or use default
  const headingColor = block.style?.headingColor || 'inherit';
  const headingWeight = block.style?.headingWeight || 'bold';
  
  // Two-column layout for specifications when columns > 1
  if (block.columns > 1) {
    const columnClass = block.columns > 2 ? `md:grid-cols-${block.columns}` : 'md:grid-cols-2';
    
    const specsHtml = block.specs && block.specs.length > 0 
      ? block.specs.map(spec => `
        <div class="spec-item border p-3 rounded">
          <div style="font-weight: 600;">${spec.name}</div>
          <div>${spec.value}</div>
        </div>
      `).join('')
      : '';
    
    return `
      <div class="specifications-block" id="block-${block.id}" style="${blockStyles}">
        <h2 style="color: ${headingColor}; font-weight: ${headingWeight}; font-size: 24px; margin-bottom: 20px;">${block.heading}</h2>
        <div class="grid grid-cols-1 ${columnClass} gap-4">
          ${specsHtml}
        </div>
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
