
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

/**
 * Gera uma meta descrição para uma descrição de produto
 * @param description Descrição do produto
 * @returns Meta descrição gerada
 */
export function generateMetaDescription(description: any): string {
  try {
    if (!description || !description.blocks) {
      return '';
    }

    // Filtrar blocos visíveis
    const visibleBlocks = description.blocks.filter((block: any) => block.visible);
    
    // Primeiro, tenta encontrar uma descrição curta em um bloco de texto ou hero
    let shortDescription = '';
    for (const block of visibleBlocks) {
      if (block.type === 'hero' && block.subtitle) {
        shortDescription = block.subtitle;
        break;
      }
      if (block.type === 'text' && block.content) {
        // Remover tags HTML e pegar o primeiro parágrafo
        const textContent = block.content.replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        
        if (textContent.length > 30) {
          shortDescription = textContent;
          break;
        }
      }
    }
    
    // Se não encontrou uma descrição curta, gera a partir do conteúdo completo
    if (!shortDescription) {
      let fullText = '';
      visibleBlocks.forEach((block: any) => {
        if (block.content && typeof block.content === 'string') {
          fullText += ' ' + block.content.replace(/<[^>]+>/g, ' ');
        }
        
        if (block.subtitle && typeof block.subtitle === 'string') {
          fullText += ' ' + block.subtitle;
        }
      });

      shortDescription = fullText.replace(/\s+/g, ' ').trim();
    }
    
    // Limitar a descrição a um tamanho adequado para meta description (150-160 caracteres)
    if (shortDescription.length > 157) {
      return shortDescription.substring(0, 157).trim() + '...';
    }
    
    return shortDescription;
  } catch (error) {
    console.error('Erro ao gerar meta descrição:', error);
    return '';
  }
}

/**
 * Gera um schema JSON-LD para uma descrição de produto
 * @param product Informações básicas do produto
 * @param description Descrição completa do produto
 * @returns String contendo o schema JSON-LD
 */
export function generateProductSchema(product: { name: string }, description: any): string {
  try {
    // Extrair imagens da descrição
    const images: string[] = [];
    
    if (description && description.blocks) {
      description.blocks.forEach((block: any) => {
        if (block.type === 'image' && block.imageUrl) {
          images.push(block.imageUrl);
        }
        if (block.type === 'gallery' && block.images && Array.isArray(block.images)) {
          block.images.forEach((img: any) => {
            if (img.url) images.push(img.url);
          });
        }
        if (block.type === 'hero' && block.imageUrl) {
          images.push(block.imageUrl);
        }
      });
    }

    // Extrair descrição
    const metaDescription = generateMetaDescription(description);
    
    // Gerar objeto de esquema
    const schema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": product.name,
      "description": metaDescription,
      "image": images.length > 0 ? images : undefined,
      "brand": {
        "@type": "Brand",
        "name": "Marca do Produto" // Substituir pela marca real quando disponível
      }
    };
    
    // Converter para string JSON formatada
    return JSON.stringify(schema, null, 2);
  } catch (error) {
    console.error('Erro ao gerar schema do produto:', error);
    return JSON.stringify({
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": product.name
    }, null, 2);
  }
}
