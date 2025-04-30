
import { SpecificationsBlock } from '@/types/editor';

export const generateSpecificationsBlockHtml = (block: SpecificationsBlock): string => {
  if (!block.specs || block.specs.length === 0) {
    return '<div class="specifications-empty">Nenhuma especificação adicionada</div>';
  }

  // Determinar o título da seção
  const heading = block.heading || 'Especificações';
  
  // Gerar o HTML para o bloco de especificações
  let html = `<div class="specifications-container">`;
  
  // Adiciona o título
  html += `<h2 class="specifications-heading">${heading}</h2>`;
  
  // Verifica se parece ser uma lista de cuidados com o produto
  const isCareInstructions = heading.toLowerCase().includes('cuidado') || 
                            heading.toLowerCase().includes('instrução');
  
  // Gera o HTML para as especificações
  html += `<div class="specifications-list">`;
  
  block.specs.forEach(spec => {
    const specName = spec.name.trim();
    const specValue = spec.value ? spec.value.trim() : '';
    
    if (isCareInstructions) {
      // Para instruções de cuidados, usa um formato de lista com ícones de check
      html += `<div class="care-instruction-item">`;
      // Adiciona um ícone de check no SVG para compatibilidade máxima
      html += `<span class="care-instruction-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check-icon">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </span>`;
      
      // Adiciona o texto da especificação
      html += `<span class="care-instruction-text">${specName}</span>`;
      
      // Se tiver um valor, adiciona também
      if (specValue) {
        html += `<span class="care-instruction-value">${specValue}</span>`;
      }
      
      html += `</div>`;
    } else {
      // Para especificações normais, usa o formato de tabela
      html += `<div class="specification-item">`;
      html += `<span class="specification-name">${specName}</span>`;
      
      if (specValue) {
        html += `<span class="specification-value">${specValue}</span>`;
      }
      
      html += `</div>`;
    }
  });
  
  html += `</div>`;
  html += `</div>`;
  
  return html;
};
