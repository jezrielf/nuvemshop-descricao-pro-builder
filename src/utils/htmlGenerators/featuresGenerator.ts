
import { FeaturesBlock } from '@/types/editor';
import { getStylesFromBlock } from '../styleConverter';

export const generateFeaturesHtml = (block: FeaturesBlock): string => {
  const blockStyleAttr = getStylesFromBlock(block) ? ` style="${getStylesFromBlock(block)}"` : '';
  
  const featuresHtml = block.features && block.features.length > 0 
    ? block.features.map(feature => `
      <div style="flex:1;padding:15px;min-width:${100/block.columns}%;">
        <h3 style="${block.style?.headingColor ? `color:${block.style.headingColor};` : ''}font-size:18px;font-weight:bold;margin-bottom:10px;">${feature.title}</h3>
        <p style="font-size:14px;">${feature.description}</p>
      </div>
    `).join('')
    : '';
  
  return `
    <div${blockStyleAttr} class="features-block">
      <h2 style="${block.style?.headingColor ? `color:${block.style.headingColor};` : ''}font-size:24px;font-weight:bold;margin-bottom:20px;text-align:center;">${block.heading}</h2>
      <div style="display:flex;flex-wrap:wrap;">${featuresHtml}</div>
    </div>
  `;
};
