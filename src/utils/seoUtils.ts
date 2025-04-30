
/**
 * Extrai palavras-chave de uma descrição de produto
 * @param description Descrição do produto
 * @returns Array de palavras-chave
 */
export function extractKeywords(description: any): string[] {
  try {
    if (!description || !description.blocks) {
      return [];
    }
    
    // Filtrar blocos visíveis
    const visibleBlocks = description.blocks.filter((block: any) => block.visible);
    
    // Extrair texto de todos os blocos
    let fullText = '';
    
    visibleBlocks.forEach((block: any) => {
      // Extrair texto com base no tipo de bloco
      if (block.content && typeof block.content === 'string') {
        fullText += ' ' + block.content.replace(/<[^>]+>/g, ' ');
      }
      
      if (block.heading && typeof block.heading === 'string') {
        fullText += ' ' + block.heading;
      }
      
      if (block.title && typeof block.title === 'string') {
        fullText += ' ' + block.title;
      }
      
      // Processar tipos específicos de blocos
      if (block.type === 'features' && block.items) {
        block.items.forEach((item: any) => {
          if (item.title) fullText += ' ' + item.title;
          if (item.description) fullText += ' ' + item.description;
        });
      }
      
      if (block.type === 'faq' && block.items) {
        block.items.forEach((item: any) => {
          if (item.question) fullText += ' ' + item.question;
          if (item.answer) fullText += ' ' + item.answer;
        });
      }
    });
    
    // Limpar o texto
    const cleanText = fullText.toLowerCase()
      .replace(/[^\wáàâãéèêíìîóòôõúùûç\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    // Dividir em palavras e filtrar
    const words = cleanText.split(' ');
    
    // Remover palavras muito curtas e palavras comuns
    const stopWords = new Set([
      'para', 'como', 'mais', 'este', 'esta', 'isso', 'aquilo', 
      'pelo', 'pela', 'pelos', 'pelas', 'seja', 'seus', 'suas',
      'que', 'com', 'por', 'dos', 'das', 'uma', 'seu', 'sua'
    ]);
    
    // Contar frequência
    const wordCounts: {[key: string]: number} = {};
    
    words.forEach(word => {
      if (word.length > 3 && !stopWords.has(word)) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    });
    
    // Ordenar por frequência e pegar as 10 mais comuns
    return Object.entries(wordCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word]) => word);
    
  } catch (error) {
    console.error('Erro ao extrair palavras-chave:', error);
    return [];
  }
}
