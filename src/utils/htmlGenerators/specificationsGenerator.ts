
import { SpecificationsBlock } from '@/types/editor';
import { getStylesFromBlock } from '../styleConverter';

export const generateSpecificationsHtml = (block: SpecificationsBlock): string => {
  const blockStyleAttr = getStylesFromBlock(block) ? ` style="${getStylesFromBlock(block)}"` : '';
  
  const specsHtml = block.specs && block.specs.length > 0 
    ? block.specs.map((spec, index) => `
      <tr style="background-color:${index % 2 === 0 ? '#f9fafb' : '#ffffff'}">
        <td style="padding:10px;border-bottom:1px solid #e5e7eb;font-weight:500;">${spec.name}</td>
        <td style="padding:10px;border-bottom:1px solid #e5e7eb;">${spec.value}</td>
      </tr>
    `).join('')
    : '';
  
  return `
    <div${blockStyleAttr} style="width:100%;padding:20px;margin-bottom:20px;">
      <h2 style="font-size:24px;font-weight:bold;margin-bottom:20px;">${block.heading}</h2>
      <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;">
        <tbody>
          ${specsHtml}
        </tbody>
      </table>
    </div>
  `;
};
