
import { EditorState } from '../types';
import { generateCompleteHtml } from './htmlOutputGenerator';

export const createOutputActions = (get: () => EditorState) => ({
  getHtmlOutput: (productTitle?: string) => {
    try {
      // Use the new generator function to get properly formatted HTML
      const htmlOutput = generateCompleteHtml(get(), productTitle);
      
      // Log para debug
      console.log("HTML output length:", htmlOutput.length);
      
      // Basic validation for debugging purposes
      if (!htmlOutput || htmlOutput.trim() === '') {
        console.error('Empty HTML output generated');
        return '<div>Erro na geração do HTML - contate o suporte</div>';
      }
      
      return htmlOutput;
    } catch (error) {
      console.error('Error generating HTML output:', error);
      return '<div>Erro ao gerar HTML da descrição</div>';
    }
  }
});
