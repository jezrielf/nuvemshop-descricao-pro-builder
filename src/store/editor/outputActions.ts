
import { HeroBlock, TextBlock, FeaturesBlock } from '@/types/editor';
import { EditorState } from './types';

export const createOutputActions = (get: () => EditorState) => ({
  getHtmlOutput: () => {
    const description = get().description;
    
    // Check if description exists and has blocks before trying to map over them
    if (!description || !description.blocks || description.blocks.length === 0) {
      return '';
    }

    // This is a simplified version of HTML conversion
    // In a more complete version, each block type would have its own renderer
    const blocksHtml = description.blocks
      .filter(block => block.visible)
      .map(block => {
        switch(block.type) {
          case 'hero':
            const heroBlock = block as HeroBlock;
            return `
              <div style="width:100%;padding:30px;text-align:center;background-color:#f5f5f5;margin-bottom:20px;">
                <h1 style="font-size:28px;font-weight:bold;margin-bottom:10px;">${heroBlock.heading}</h1>
                <p style="font-size:16px;margin-bottom:20px;">${heroBlock.subheading}</p>
                ${heroBlock.buttonText ? `<a href="${heroBlock.buttonUrl || '#'}" style="display:inline-block;padding:10px 20px;background-color:#2563EB;color:white;text-decoration:none;border-radius:4px;">${heroBlock.buttonText}</a>` : ''}
              </div>
            `;
          case 'text':
            const textBlock = block as TextBlock;
            return `
              <div style="width:100%;padding:20px;margin-bottom:20px;">
                <div style="font-size:16px;line-height:1.6;">${textBlock.content}</div>
              </div>
            `;
          case 'features':
            const featuresBlock = block as FeaturesBlock;
            const featuresHtml = featuresBlock.features && featuresBlock.features.length > 0 
              ? featuresBlock.features.map(feature => `
                <div style="flex:1;padding:15px;min-width:${100/block.columns}%;">
                  <h3 style="font-size:18px;font-weight:bold;margin-bottom:10px;">${feature.title}</h3>
                  <p style="font-size:14px;">${feature.description}</p>
                </div>
              `).join('')
              : '';
            
            return `
              <div style="width:100%;padding:20px;margin-bottom:20px;">
                <h2 style="font-size:24px;font-weight:bold;margin-bottom:20px;text-align:center;">${featuresBlock.heading}</h2>
                <div style="display:flex;flex-wrap:wrap;">${featuresHtml}</div>
              </div>
            `;
          // Add more cases for other block types as needed
          default:
            return `<div style="padding:20px;margin-bottom:20px;border:1px dashed #ccc;">Bloco do tipo ${block.type}</div>`;
        }
      }).join('');

    return blocksHtml;
  }
});
