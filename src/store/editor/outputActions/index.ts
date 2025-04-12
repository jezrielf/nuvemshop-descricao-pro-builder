
import { EditorState } from '../types';
import { generateCompleteHtml } from './htmlOutputGenerator';

export const createOutputActions = (get: () => EditorState) => ({
  getHtmlOutput: () => {
    try {
      // Use the new generator function to get properly formatted HTML
      const htmlOutput = generateCompleteHtml(get());
      
      // Log para debug
      console.log("HTML output length:", htmlOutput.length);
      
      // Verificar se todas as tags div estão fechadas corretamente
      const openTags = (htmlOutput.match(/<div/g) || []).length;
      const closeTags = (htmlOutput.match(/<\/div>/g) || []).length;
      
      if (openTags !== closeTags) {
        console.error(`ERRO: Tags div desbalanceadas! Abertas: ${openTags}, Fechadas: ${closeTags}`);
        return '<div class="product-description">Erro na geração do HTML - contate o suporte</div>';
      }
      
      // Verificação adicional de tags essenciais
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
