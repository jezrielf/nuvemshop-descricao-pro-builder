
import { FeaturesBlock } from "@/types/editor";

export function generateFeaturesBlockHtml(block: FeaturesBlock): string {
  const { heading, features } = block;
  
  if (!features || features.length === 0) {
    return '';
  }
  
  // Determine the number of columns based on block.columns
  const columnsValue = typeof block.columns === 'number' 
    ? block.columns 
    : typeof block.columns === 'string' && !isNaN(parseInt(block.columns, 10))
      ? parseInt(block.columns, 10)
      : 1;
  
  // Convert to number for comparison
  const gridColumns = Math.min(Math.max(Number(columnsValue), 1), 4); // Between 1 and 4 columns
  
  return `
    <div class="features-block my-6">
      <h2 class="text-2xl font-bold mb-4">${heading || 'Características'}</h2>
      <div class="grid grid-cols-1 md:grid-cols-${gridColumns} gap-6">
        ${features.map(feature => `
          <div class="flex ${block.layout === 'vertical' ? 'flex-col items-center text-center' : 'items-start'} p-4 border rounded-lg">
            ${feature.icon ? `<div class="text-3xl ${block.layout === 'vertical' ? 'mb-2' : 'mr-3'}">${feature.icon}</div>` : ''}
            <div>
              <h3 class="text-lg font-semibold mb-2">${feature.title}</h3>
              <p>${feature.description || ''}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
