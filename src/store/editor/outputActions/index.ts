
import { EditorState } from '../types';
import { generateCompleteHtml } from './htmlOutputGenerator';

export const createOutputActions = (get: () => EditorState) => ({
  getHtmlOutput: () => {
    try {
      // Use the new generator function to get properly formatted HTML
      return generateCompleteHtml(get());
    } catch (error) {
      console.error('Error generating HTML output:', error);
      return '<div class="product-description">Erro ao gerar HTML da descrição</div>';
    }
  }
});
