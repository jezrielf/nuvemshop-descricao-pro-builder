
import { BenefitsBlock } from "@/types/editor";

export function generateBenefitsBlockHtml(block: BenefitsBlock): string {
  const { heading, benefits } = block;
  
  if (!benefits || benefits.length === 0) {
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
  
  // Map Portuguese icon names to their symbols or icons
  const iconMapping: Record<string, string> = {
    'relogio': '⏱️',
    'gota': '💧',
    'estrela': '⭐',
    'filtro': '🧹',
    'escudo': '🛡️',
    'verificado': '✅',
    'raio': '⚡',
    'lixo': '🗑️',
    'ajustes': '⚙️',
    'controles': '🎛️',
    'positivo': '👍',
  };
  
  return `
    <div class="benefits-block my-6">
      <h2 class="text-2xl font-bold mb-4">${heading || 'Benefícios'}</h2>
      <div class="grid grid-cols-1 md:grid-cols-${gridColumns} gap-6">
        ${benefits.map(benefit => {
          // Try to use mapping for icon names, otherwise use the original icon or fallback
          const iconDisplay = iconMapping[benefit.icon] || benefit.icon || '✓';
          
          return `
            <div class="flex flex-col items-center text-center p-4 border rounded-lg">
              <div class="text-3xl mb-2">${iconDisplay}</div>
              <h3 class="text-lg font-semibold mb-2">${benefit.title}</h3>
              <p>${benefit.description || ''}</p>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}
