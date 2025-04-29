
import { ProductDescription, Block } from '@/types/editor';
import { SEOTechnicalDiagnosis, SEORecommendation, HeaderStructureAnalysis, KeywordAnalysis, ContentQualityAnalysis, SemanticAnalysis, ContentFreshnessAnalysis } from '@/types/seoTechnical';
import { getTextContentFromDescription } from './contentUtils';
import { extractKeywords } from '@/utils/seoUtils';

/**
 * Comprehensive technical SEO analyzer for product descriptions
 */
export function analyzeSEOTechnically(description: ProductDescription): SEOTechnicalDiagnosis {
  // Extract content for analysis
  const textContent = getTextContentFromDescription(description);
  const keywords = extractKeywords(description);
  const mainKeyword = keywords[0] || '';
  
  // Perform header structure analysis
  const headerStructure = analyzeHeaderStructure(description);
  
  // Perform keyword analysis
  const keywordAnalysis = analyzeKeywords(description, textContent, mainKeyword);
  
  // Analyze content quality
  const contentQuality = analyzeContentQuality(description, textContent);
  
  // Semantic analysis
  const semanticAnalysis = analyzeSemanticRelations(description, mainKeyword, textContent);
  
  // Content freshness
  const contentFreshness = analyzeContentFreshness(description);
  
  // Generate overall score based on all factors
  const overallScore = calculateOverallScore(
    headerStructure.score,
    keywordAnalysis.score,
    contentQuality.score,
    semanticAnalysis.score,
    contentFreshness.score
  );
  
  // Generate recommendations based on all analyses
  const recommendations = generateRecommendations(
    headerStructure, 
    keywordAnalysis, 
    contentQuality, 
    semanticAnalysis, 
    contentFreshness
  );
  
  return {
    overallScore,
    headerStructure,
    keywordAnalysis,
    contentQuality,
    semanticAnalysis,
    contentFreshness,
    recommendations
  };
}

/**
 * Analyzes header structure and hierarchy
 */
function analyzeHeaderStructure(description: ProductDescription): HeaderStructureAnalysis {
  const issues: string[] = [];
  let score = 100;
  let h1Count = 0;
  let h2Count = 0;
  let h3Count = 0;
  
  // Check for h1, h2, h3 tags in blocks
  description.blocks.forEach(block => {
    if (block.type === 'text' && 'content' in block) {
      const h1Matches = (block.content.match(/<h1[^>]*>.*?<\/h1>/g) || []);
      const h2Matches = (block.content.match(/<h2[^>]*>.*?<\/h2>/g) || []);
      const h3Matches = (block.content.match(/<h3[^>]*>.*?<\/h3>/g) || []);
      
      h1Count += h1Matches.length;
      h2Count += h2Matches.length;
      h3Count += h3Matches.length;
    }
    
    // Check for heading in hero block
    if (block.type === 'hero' && 'heading' in block) {
      h1Count++;
    }
    
    // Check headings in other block types
    if ((block.type === 'features' || block.type === 'benefits' || 
         block.type === 'faq' || block.type === 'specifications') && 
        'heading' in block) {
      h2Count++;
    }
  });
  
  // Issue: Multiple H1 tags
  if (h1Count > 1) {
    issues.push('Múltiplas tags H1 detectadas. Deve haver apenas uma tag H1 principal.');
    score -= 30;
  }
  
  // Issue: No H1 tag
  if (h1Count === 0) {
    issues.push('Nenhuma tag H1 encontrada. Adicione um título principal H1.');
    score -= 25;
  }
  
  // Issue: No H2 tags
  if (h2Count === 0) {
    issues.push('Nenhuma tag H2 encontrada. Adicione subtítulos para estruturar melhor o conteúdo.');
    score -= 15;
  }
  
  // Issue: Poor hierarchy (h3 without h2)
  if (h3Count > 0 && h2Count === 0) {
    issues.push('Hierarquia incorreta: Tags H3 sem tags H2 pai.');
    score -= 10;
  }
  
  // Check for proper hierarchy
  const hasProperHierarchy = (h1Count <= 1) && (h1Count > 0 || h2Count > 0) && !(h3Count > 0 && h2Count === 0);
  
  if (!hasProperHierarchy) {
    issues.push('Estrutura hierárquica de títulos inadequada.');
  }
  
  return {
    score: Math.max(0, score),
    h1Count,
    h2Count,
    h3Count,
    hasProperHierarchy,
    issues
  };
}

/**
 * Analyzes keyword usage and distribution
 */
function analyzeKeywords(
  description: ProductDescription, 
  textContent: string,
  mainKeyword: string
): KeywordAnalysis {
  const issues: string[] = [];
  let score = 100;
  const words = textContent.toLowerCase().split(/\s+/).filter(Boolean);
  const totalWords = words.length;
  
  // Count main keyword occurrences
  const mainKeywordRegex = new RegExp(mainKeyword.toLowerCase(), 'g');
  const mainKeywordMatches = textContent.toLowerCase().match(mainKeywordRegex) || [];
  const mainKeywordCount = mainKeywordMatches.length;
  const mainKeywordDensity = totalWords > 0 ? (mainKeywordCount / totalWords) * 100 : 0;
  
  // Secondary keywords
  const secondaryKeywords = extractKeywords(description).slice(1, 5).map(keyword => {
    const keywordRegex = new RegExp(keyword.toLowerCase(), 'g');
    const keywordMatches = textContent.toLowerCase().match(keywordRegex) || [];
    return {
      keyword,
      count: keywordMatches.length,
      density: totalWords > 0 ? (keywordMatches.length / totalWords) * 100 : 0
    };
  });
  
  // Analyze distribution
  const firstParagraph = extractFirstParagraph(textContent);
  const headings = extractHeadings(description);
  
  const keywordDistribution = {
    title: description.name.toLowerCase().includes(mainKeyword.toLowerCase()),
    firstParagraph: firstParagraph.toLowerCase().includes(mainKeyword.toLowerCase()),
    headings: headings.some(h => h.toLowerCase().includes(mainKeyword.toLowerCase())),
    throughout: mainKeywordCount > 1
  };
  
  // Check keyword density issues
  if (mainKeywordDensity === 0) {
    issues.push(`Palavra-chave principal "${mainKeyword}" não encontrada no texto.`);
    score -= 30;
  } else if (mainKeywordDensity < 0.5) {
    issues.push(`Densidade da palavra-chave principal "${mainKeyword}" muito baixa (${mainKeywordDensity.toFixed(2)}%).`);
    score -= 15;
  } else if (mainKeywordDensity > 3) {
    issues.push(`Densidade da palavra-chave principal "${mainKeyword}" muito alta (${mainKeywordDensity.toFixed(2)}%). Isso pode parecer spam.`);
    score -= 20;
  }
  
  // Check distribution issues
  if (!keywordDistribution.title) {
    issues.push(`Palavra-chave principal "${mainKeyword}" não presente no título da descrição.`);
    score -= 10;
  }
  
  if (!keywordDistribution.firstParagraph) {
    issues.push(`Palavra-chave principal "${mainKeyword}" não presente no primeiro parágrafo.`);
    score -= 10;
  }
  
  if (!keywordDistribution.headings) {
    issues.push(`Palavra-chave principal "${mainKeyword}" não presente em nenhum título ou subtítulo.`);
    score -= 10;
  }
  
  if (secondaryKeywords.length === 0) {
    issues.push('Não foram encontradas palavras-chave secundárias relevantes.');
    score -= 15;
  }
  
  return {
    score: Math.max(0, score),
    mainKeyword,
    mainKeywordDensity,
    keywordDistribution,
    secondaryKeywords,
    issues
  };
}

/**
 * Analyzes content quality factors
 */
function analyzeContentQuality(
  description: ProductDescription, 
  textContent: string
): ContentQualityAnalysis {
  const issues: string[] = [];
  let score = 100;
  
  // Word count
  const words = textContent.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  
  // Paragraph count
  const paragraphs = textContent.split(/\n\n+/).filter(Boolean);
  const paragraphCount = paragraphs.length;
  
  // Sentence length
  const sentences = textContent.split(/[.!?]+\s/).filter(Boolean);
  const avgSentenceLength = sentences.length > 0 ? wordCount / sentences.length : 0;
  
  // Calculate readability
  const readabilityScore = calculateReadabilityScore(textContent);
  
  // Check for images
  const hasImages = description.blocks.some(block => {
    return ['image', 'gallery', 'hero', 'imageText', 'textImage'].includes(block.type);
  });
  
  // Check for alt text in images
  const imageAltText = hasImages ? checkImagesHaveAltText(description) : false;
  
  // Word count issues
  if (wordCount < 100) {
    issues.push(`Conteúdo muito curto (${wordCount} palavras). Recomenda-se pelo menos 300 palavras para um bom SEO.`);
    score -= 30;
  } else if (wordCount < 300) {
    issues.push(`Conteúdo moderadamente curto (${wordCount} palavras). Considere expandir para melhorar o SEO.`);
    score -= 15;
  }
  
  // Paragraph issues
  if (paragraphCount < 2) {
    issues.push('Poucos parágrafos. Divida o conteúdo em mais parágrafos para melhor leitura.');
    score -= 10;
  }
  
  // Sentence length issues
  if (avgSentenceLength > 25) {
    issues.push(`Sentenças muito longas (média de ${avgSentenceLength.toFixed(1)} palavras). Tente reduzir para melhor legibilidade.`);
    score -= 15;
  }
  
  // Image issues
  if (!hasImages) {
    issues.push('Nenhuma imagem encontrada. Adicione imagens relevantes para melhorar o engajamento e SEO.');
    score -= 20;
  } else if (!imageAltText) {
    issues.push('Uma ou mais imagens não possuem texto alternativo (alt). Adicione descrições alt para acessibilidade e SEO.');
    score -= 15;
  }
  
  // Readability issues
  if (readabilityScore < 60) {
    issues.push(`Baixa legibilidade (${readabilityScore}/100). Tente simplificar o texto.`);
    score -= 15;
  }
  
  return {
    score: Math.max(0, score),
    wordCount,
    paragraphCount,
    avgSentenceLength,
    readabilityScore,
    hasImages,
    imageAltText,
    issues
  };
}

/**
 * Analyzes semantic relevance between title, content and keywords
 */
function analyzeSemanticRelations(
  description: ProductDescription,
  mainKeyword: string,
  textContent: string
): SemanticAnalysis {
  const issues: string[] = [];
  let score = 100;
  
  // Check title-content semantic match
  const title = description.name;
  const titleWords = new Set(title.toLowerCase().split(/\s+/).filter(Boolean));
  const contentWords = new Set(textContent.toLowerCase().split(/\s+/).filter(Boolean));
  
  // Calculate title-content match percentage
  let matchingWords = 0;
  titleWords.forEach(word => {
    if (contentWords.has(word) && word.length > 3) {
      matchingWords++;
    }
  });
  
  const titleContentMatch = titleWords.size > 0 ? (matchingWords / titleWords.size) * 100 : 0;
  
  // Generate list of related terms that should be in the content
  const relatedTerms = generateRelatedTerms(mainKeyword);
  const usedRelatedTerms = relatedTerms.filter(term => 
    textContent.toLowerCase().includes(term.toLowerCase())
  );
  
  // Calculate topic coverage
  const topicCoverage = relatedTerms.length > 0 ? (usedRelatedTerms.length / relatedTerms.length) * 100 : 0;
  
  // Title-content match issues
  if (titleContentMatch < 50) {
    issues.push(`Baixa correlação semântica entre título e conteúdo (${titleContentMatch.toFixed(0)}%).`);
    score -= 20;
  }
  
  // Topic coverage issues
  if (topicCoverage < 30) {
    issues.push(`Cobertura limitada do tópico (${topicCoverage.toFixed(0)}%). Considere incluir termos relacionados.`);
    score -= 20;
  } else if (topicCoverage < 60) {
    issues.push(`Cobertura média do tópico (${topicCoverage.toFixed(0)}%). Adicione mais termos relacionados para melhorar.`);
    score -= 10;
  }
  
  return {
    score: Math.max(0, score),
    titleContentMatch,
    topicCoverage,
    relatedTermsUsage: usedRelatedTerms,
    issues
  };
}

/**
 * Analyzes content freshness and update frequency
 */
function analyzeContentFreshness(description: ProductDescription): ContentFreshnessAnalysis {
  const issues: string[] = [];
  let score = 100;
  
  // Last updated date
  const lastUpdated = new Date(description.updatedAt);
  const now = new Date();
  
  // Calculate days since last update
  const daysSinceUpdate = Math.floor((now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24));
  
  // Calculate update frequency (if we have history)
  let updateFrequency = 0;
  if (description.history && description.history.length > 1) {
    const dates = description.history.map(h => new Date(h.date).getTime()).sort();
    const intervals = [];
    
    for (let i = 1; i < dates.length; i++) {
      intervals.push(Math.floor((dates[i] - dates[i-1]) / (1000 * 60 * 60 * 24)));
    }
    
    updateFrequency = intervals.reduce((sum, val) => sum + val, 0) / intervals.length;
  } else {
    // If no history, just use a default frequency
    updateFrequency = 0;
  }
  
  // Content freshness issues
  if (daysSinceUpdate > 365) {
    issues.push(`Conteúdo muito antigo (${daysSinceUpdate} dias). Atualize regularmente para SEO.`);
    score -= 30;
  } else if (daysSinceUpdate > 180) {
    issues.push(`Conteúdo desatualizado (${daysSinceUpdate} dias). Considere uma atualização.`);
    score -= 15;
  }
  
  // Update frequency issues
  if (updateFrequency > 0) {
    if (updateFrequency > 365) {
      issues.push(`Frequência de atualização muito baixa (${Math.round(updateFrequency)} dias entre atualizações).`);
      score -= 15;
    }
  }
  
  return {
    score: Math.max(0, score),
    lastUpdated,
    daysSinceUpdate,
    updateFrequency,
    issues
  };
}

/**
 * Generates technical SEO recommendations based on all analyses
 */
function generateRecommendations(
  headerStructure: HeaderStructureAnalysis,
  keywordAnalysis: KeywordAnalysis,
  contentQuality: ContentQualityAnalysis,
  semanticAnalysis: SemanticAnalysis,
  contentFreshness: ContentFreshnessAnalysis
): SEORecommendation[] {
  const recommendations: SEORecommendation[] = [];
  
  // Critical recommendations (score < 50)
  [...headerStructure.issues, 
   ...keywordAnalysis.issues, 
   ...contentQuality.issues, 
   ...semanticAnalysis.issues, 
   ...contentFreshness.issues].forEach(issue => {
    // Different types of recommendations based on the issue severity
    // This is a simplified version, in production we would have more complex logic
    if (issue.includes('muito curto') || issue.includes('Múltiplas tags H1') || issue.includes('Nenhuma tag H1')) {
      recommendations.push({
        type: 'critical',
        text: issue,
        impact: 80,
        implementation: generateImplementationSuggestion(issue)
      });
    } else if (issue.includes('Densidade da palavra-chave') || issue.includes('Nenhuma imagem')) {
      recommendations.push({
        type: 'important',
        text: issue,
        impact: 60,
        implementation: generateImplementationSuggestion(issue)
      });
    } else if (issue.includes('não presente') || issue.includes('alt')) {
      recommendations.push({
        type: 'improvement',
        text: issue,
        impact: 40,
        implementation: generateImplementationSuggestion(issue)
      });
    } else {
      recommendations.push({
        type: 'improvement',
        text: issue,
        impact: 30
      });
    }
  });
  
  // Sort recommendations by impact
  return recommendations.sort((a, b) => b.impact - a.impact);
}

// Helper functions

/**
 * Extracts the first paragraph from text content
 */
function extractFirstParagraph(textContent: string): string {
  const paragraphs = textContent.split(/\n\n+/);
  return paragraphs[0] || '';
}

/**
 * Extracts headings from description
 */
function extractHeadings(description: ProductDescription): string[] {
  const headings: string[] = [];
  
  description.blocks.forEach(block => {
    if (block.type === 'text' && 'content' in block) {
      const h1Matches = block.content.match(/<h1[^>]*>(.*?)<\/h1>/g) || [];
      const h2Matches = block.content.match(/<h2[^>]*>(.*?)<\/h2>/g) || [];
      const h3Matches = block.content.match(/<h3[^>]*>(.*?)<\/h3>/g) || [];
      
      [...h1Matches, ...h2Matches, ...h3Matches].forEach(match => {
        const text = match.replace(/<[^>]+>/g, '').trim();
        if (text) headings.push(text);
      });
    }
    
    if ('heading' in block && block.heading) {
      headings.push(block.heading);
    }
  });
  
  return headings;
}

/**
 * Checks if all images in the description have alt text
 */
function checkImagesHaveAltText(description: ProductDescription): boolean {
  let allHaveAlt = true;
  
  description.blocks.forEach(block => {
    if (block.type === 'image' && 'alt' in block) {
      if (!block.alt) allHaveAlt = false;
    } else if (block.type === 'gallery' && 'images' in block) {
      if (Array.isArray(block.images)) {
        block.images.forEach((img: any) => {
          if (!img.alt) allHaveAlt = false;
        });
      }
    } else if ((block.type === 'hero' || block.type === 'imageText' || block.type === 'textImage') && 'image' in block) {
      if (block.image && (!block.image.alt || block.image.alt === '')) {
        allHaveAlt = false;
      }
    }
  });
  
  return allHaveAlt;
}

/**
 * Calculates readability score for text
 */
function calculateReadabilityScore(text: string): number {
  // Simplified readability calculation
  const words = text.split(/\s+/).filter(Boolean);
  const sentences = text.split(/[.!?]+\s/).filter(Boolean);
  
  if (words.length === 0 || sentences.length === 0) return 70; // Default score
  
  const avgWordsPerSentence = words.length / sentences.length;
  
  // Count complex words (words with 3+ syllables)
  const complexWords = words.filter(word => countSyllables(word) > 3);
  const complexWordPercentage = (complexWords.length / words.length) * 100;
  
  // Base readability calculation
  let readabilityScore = 100;
  
  // Penalize for very long sentences
  if (avgWordsPerSentence > 25) {
    readabilityScore -= Math.min(30, (avgWordsPerSentence - 25) * 2);
  }
  
  // Penalize for too many complex words
  if (complexWordPercentage > 10) {
    readabilityScore -= Math.min(30, (complexWordPercentage - 10) * 1.5);
  }
  
  return Math.max(0, Math.min(100, readabilityScore));
}

/**
 * Count syllables in a word (simplified for Portuguese)
 */
function countSyllables(word: string): number {
  // Simplistic syllable counting for Portuguese
  const cleanWord = word.toLowerCase().replace(/[.,!?;:()\-]/g, '');
  const vowels = ['a', 'e', 'i', 'o', 'u', 'y', 'á', 'é', 'í', 'ó', 'ú', 'â', 'ê', 'î', 'ô', 'û', 'ã', 'õ'];
  
  let syllableCount = 0;
  let prevIsVowel = false;
  
  for (let i = 0; i < cleanWord.length; i++) {
    const isVowel = vowels.includes(cleanWord[i]);
    
    if (isVowel && !prevIsVowel) {
      syllableCount++;
    }
    
    prevIsVowel = isVowel;
  }
  
  return syllableCount || 1; // At least one syllable
}

/**
 * Generate related terms for a keyword (simplified)
 */
function generateRelatedTerms(keyword: string): string[] {
  // In a real application, this would use a more sophisticated method
  // Like a semantic API or a pre-built dictionary
  // This is just a simple example
  if (!keyword) return [];
  
  // Some very basic examples
  const commonRelatedTerms: {[key: string]: string[]} = {
    'camiseta': ['roupa', 'vestuário', 'algodão', 'confortável', 'casual', 'moda'],
    'vestido': ['roupa', 'feminino', 'elegante', 'casual', 'festa', 'tecido'],
    'calça': ['jeans', 'alfaiataria', 'conforto', 'casual', 'cintura', 'ajuste'],
    'tênis': ['calçado', 'confortável', 'esportivo', 'casual', 'palmilha', 'solado'],
    'bolsa': ['acessório', 'couro', 'compartimentos', 'alça', 'feminina', 'moda'],
    'relógio': ['acessório', 'pulso', 'hora', 'ponteiros', 'pulseira', 'tempo'],
    'celular': ['smartphone', 'tela', 'bateria', 'câmera', 'processador', 'memória'],
    'notebook': ['computador', 'portátil', 'tela', 'processador', 'memória', 'bateria'],
    'mesa': ['móvel', 'madeira', 'escritório', 'sala', 'jantar', 'superfície'],
    'sofá': ['móvel', 'estofado', 'sala', 'conforto', 'assento', 'decoração']
  };
  
  // Check if we have related terms for this keyword
  for (const [key, terms] of Object.entries(commonRelatedTerms)) {
    if (keyword.toLowerCase().includes(key)) {
      return terms;
    }
  }
  
  // If not found, return generic product terms
  return ['qualidade', 'durável', 'design', 'material', 'garantia', 'especificações'];
}

/**
 * Generate implementation suggestion for an issue
 */
function generateImplementationSuggestion(issue: string): string {
  if (issue.includes('Múltiplas tags H1')) {
    return 'Mantenha apenas um H1 principal e converta os outros para H2.';
  } else if (issue.includes('Nenhuma tag H1')) {
    return 'Adicione um título principal H1 no início da descrição com a palavra-chave principal.';
  } else if (issue.includes('muito curto')) {
    return 'Expanda o conteúdo adicionando mais detalhes sobre características, benefícios e usos do produto.';
  } else if (issue.includes('Densidade da palavra-chave') && issue.includes('baixa')) {
    return 'Adicione mais ocorrências da palavra-chave de forma natural no texto, especialmente no início.';
  } else if (issue.includes('Densidade da palavra-chave') && issue.includes('alta')) {
    return 'Reduza a repetição excessiva da palavra-chave e use sinônimos ou termos relacionados.';
  } else if (issue.includes('Nenhuma imagem')) {
    return 'Adicione pelo menos uma imagem relevante do produto com texto alternativo descritivo.';
  } else if (issue.includes('não possuem texto alternativo')) {
    return 'Adicione texto alternativo (alt) descritivo a todas as imagens.';
  }
  
  return 'Revise o conteúdo considerando esta recomendação.';
}

/**
 * Calculate overall score based on component scores
 */
function calculateOverallScore(
  headerScore: number,
  keywordScore: number,
  contentScore: number,
  semanticScore: number,
  freshnessScore: number
): number {
  return Math.round((
    headerScore * 0.2 +
    keywordScore * 0.3 +
    contentScore * 0.25 +
    semanticScore * 0.15 +
    freshnessScore * 0.1
  ));
}
