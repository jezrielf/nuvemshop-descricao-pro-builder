
import { AIBlock } from '@/types/editor';
import { getStylesFromBlock } from '../styleConverter';

export const generateAIHtml = (block: AIBlock): string => {
  const blockStyleAttr = getStylesFromBlock(block) ? ` style="${getStylesFromBlock(block)}"` : '';
  
  // Cores e estilos baseados no layout escolhido
  let containerClass = 'bg-gradient-to-r from-purple-50 to-indigo-50';
  let headingClass = 'text-purple-800';
  
  if (block.colorScheme === 'vibrant') {
    containerClass = 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white';
    headingClass = 'text-white';
  } else if (block.colorScheme === 'pastel') {
    containerClass = 'bg-gradient-to-r from-pink-100 to-blue-100';
    headingClass = 'text-pink-800';
  } else if (block.colorScheme === 'monochrome') {
    containerClass = 'bg-gradient-to-r from-gray-100 to-gray-200';
    headingClass = 'text-gray-800';
  }
  
  // Layout moderno com design responsivo
  return `
    <div${blockStyleAttr} class="ai-generated-content ${containerClass} p-6 rounded-lg shadow-sm my-6">
      ${block.heading ? `<h2 class="${headingClass} text-2xl font-bold mb-3">${block.heading}</h2>` : ''}
      ${block.subheading ? `<h3 class="text-lg font-medium mb-4 opacity-80">${block.subheading}</h3>` : ''}
      
      ${block.imageUrl ? `
        <div class="my-5">
          <img src="${block.imageUrl}" alt="${block.heading || 'Imagem gerada por IA'}" class="w-full h-auto rounded-md shadow-md" />
        </div>
      ` : ''}
      
      <div class="prose max-w-none">
        ${block.content || ''}
      </div>
      
      <div class="mt-4 text-sm text-right">
        <em>Conteúdo gerado por IA</em>
      </div>
    </div>
  `;
};
