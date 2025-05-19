
import { SpecificationsBlock } from '@/types/editor';

export const generateSpecificationsBlockHtml = (block: SpecificationsBlock): string => {
  if (!block.specs || block.specs.length === 0) {
    return '<div class="specifications-empty">Nenhuma especificação adicionada</div>';
  }

  // Determinar o título da seção
  const heading = block.heading || 'Especificações';
  
  // Determine layout columns
  const columnsValue = typeof block.columns === 'number' 
    ? block.columns 
    : typeof block.columns === 'string' && !isNaN(parseInt(block.columns, 10))
      ? parseInt(block.columns, 10)
      : 1;
  
  // Convert to number for comparison
  const columnCount = Math.min(Math.max(Number(columnsValue), 1), 2); // Max 2 columns for specs
  
  // Verifica se parece ser uma lista de cuidados com o produto
  const isCareInstructions = heading.toLowerCase().includes('cuidado') || 
                            heading.toLowerCase().includes('instrução');
  
  let html = `
    <div class="specifications-container" style="margin: 1.5rem 0;">
      <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem;">${heading}</h2>
      <div class="specifications-grid" style="display: flex; flex-wrap: wrap; margin: -8px;">
  `;
  
  // Split specs into columns
  const specsPerColumn = Math.ceil(block.specs.length / columnCount);
  const columns = Array.from({ length: columnCount }, (_, colIndex) => {
    const startIndex = colIndex * specsPerColumn;
    const endIndex = Math.min(startIndex + specsPerColumn, block.specs.length);
    return block.specs.slice(startIndex, endIndex);
  });
  
  // Generate HTML for each column
  columns.forEach(columnSpecs => {
    if (columnSpecs.length === 0) return;
    
    html += `
      <div class="specs-column" style="flex: 0 0 calc(${100/columnCount}% - 16px); margin: 8px; box-sizing: border-box;">
    `;
    
    columnSpecs.forEach(spec => {
      const specName = spec.name.trim();
      const specValue = spec.value ? spec.value.trim() : '';
      
      if (isCareInstructions) {
        // Para instruções de cuidados, usa um formato de lista com ícones de check
        html += `
          <div class="care-instruction-item" style="display: flex; align-items: flex-start; margin-bottom: 0.5rem;">
            <span class="care-instruction-icon" style="color: #22c55e; margin-right: 0.5rem;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check-icon">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
            <span class="care-instruction-text" style="flex: 1;">${specName}${specValue ? `: ${specValue}` : ''}</span>
          </div>
        `;
      } else {
        // Para especificações normais, usa o formato de tabela
        html += `
          <div class="specification-item" style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #e5e7eb;">
            <span class="specification-name" style="font-weight: 500;">${specName}</span>
            ${specValue ? `<span class="specification-value" style="color: #4b5563;">${specValue}</span>` : ''}
          </div>
        `;
      }
    });
    
    html += `</div>`;
  });
  
  html += `
      </div>
      
      <!-- Responsive styles for mobile devices -->
      <style>
        @media (max-width: 768px) {
          .specifications-grid .specs-column {
            flex: 0 0 calc(100% - 16px) !important;
          }
        }
      </style>
    </div>
  `;
  
  return html;
};
