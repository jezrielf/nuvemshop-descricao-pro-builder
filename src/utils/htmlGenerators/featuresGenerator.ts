
import { FeaturesBlock } from "@/types/editor";
import { getStylesFromBlock } from "../styleConverter";

export function generateFeaturesBlockHtml(block: FeaturesBlock): string {
  const { heading, features } = block;
  
  if (!features || features.length === 0) {
    return '';
  }
  
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
  
  // Using standard CSS instead of Tailwind for Nuvemshop compatibility
  return `
    <div class="features-container" style="margin: 1.5rem 0;">
      <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; text-align: center;">${heading || 'Características'}</h2>
      <div class="features-grid" style="display: flex; flex-wrap: wrap; margin: -8px;">
        ${features.map(feature => {
          // Calculate width based on number of columns (with some margin)
          const columnWidth = (100 / columnCount);
          
          return `
            <div class="feature-item" style="flex: 0 0 calc(${columnWidth}% - 16px); margin: 8px; box-sizing: border-box;">
              <div style="border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 1rem; height: 100%; box-sizing: border-box;">
                ${feature.icon ? 
                  `<div style="${block.layout === 'vertical' ? 'text-align: center; margin-bottom: 0.5rem;' : 'float: left; margin-right: 0.75rem;'} font-size: 1.5rem;">${feature.icon}</div>` 
                  : ''}
                <div style="${block.layout === 'vertical' ? 'text-align: center;' : ''}">
                  <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem; margin-top: 0;">${feature.title}</h3>
                  <p style="margin: 0; color: #4b5563; font-size: 0.875rem;">${feature.description || ''}</p>
                </div>
                <div style="clear: both;"></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
      
      <!-- Responsive styles for mobile devices -->
      <style>
        @media (max-width: 768px) {
          .features-grid .feature-item {
            flex: 0 0 calc(100% - 16px) !important;
          }
        }
      </style>
    </div>
  `;
}
