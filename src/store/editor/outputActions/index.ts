
import { EditorState } from '../types';
import { generateCompleteHtml } from './htmlOutputGenerator';

export const createOutputActions = (get: () => EditorState) => ({
  getHtmlOutput: () => {
    try {
      // Use the new generator function to get properly formatted HTML
      const htmlOutput = generateCompleteHtml(get());
      
      // Log para debug
      console.log("HTML output length:", htmlOutput.length);
      
      // Verifica se o HTML contém tags de abertura e fechamento básicas
      if (!htmlOutput.includes('<div class="product-description"') || 
          !htmlOutput.includes('</div>')) {
        console.error('HTML output missing essential tags:', htmlOutput);
        return '<div class="product-description">Erro na geração do HTML - contate o suporte</div>';
      }
      
      return htmlOutput;
    } catch (error) {
      console.error('Error generating HTML output:', error);
      return '<div class="product-description">Erro ao gerar HTML da descrição</div>';
    }
  }
});
