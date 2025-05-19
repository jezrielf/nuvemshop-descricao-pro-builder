
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
  
  // Using standard CSS instead of Tailwind for Nuvemshop compatibility
  return `
    <div class="benefits-container" style="margin: 1.5rem 0;">
      <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem;">${heading || 'Benefícios'}</h2>
      <div class="benefits-grid" style="display: flex; flex-wrap: wrap; margin: -8px;">
        ${benefits.map(benefit => {
          // Try to use mapping for icon names, otherwise use the original icon or fallback
          const iconDisplay = iconMapping[benefit.icon] || benefit.icon || '✓';
          
          // Calculate width based on number of columns (with some margin)
          const columnWidth = (100 / gridColumns);
          
          return `
            <div class="benefit-item" style="flex: 0 0 calc(${columnWidth}% - 16px); margin: 8px; box-sizing: border-box;">
              <div style="display: flex; flex-direction: column; align-items: center; text-align: center; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 0.5rem; height: 100%;">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">${iconDisplay}</div>
                <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem;">${benefit.title}</h3>
                <p style="margin: 0; font-size: 0.875rem; color: #4b5563;">${benefit.description || ''}</p>
              </div>
            </div>
          `;
        }).join('')}
      </div>
      
      <!-- Responsive styles for mobile devices -->
      <style>
        @media (max-width: 768px) {
          .benefits-grid .benefit-item {
            flex: 0 0 calc(100% - 16px) !important;
          }
        }
      </style>
    </div>
  `;
}
