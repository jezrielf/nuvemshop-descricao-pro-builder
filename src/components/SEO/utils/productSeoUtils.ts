
import { extractTextFromHtml, getPortugueseStopwords } from './htmlUtils';
import { NuvemshopProduct } from '@/components/Nuvemshop/types';

export interface ProductSEOResult {
  score: number;
  keywords: Array<{
    keyword: string;
    count: number;
    density: number;
  }>;
  recommendations: Array<{
    text: string;
    type: 'success' | 'warning' | 'error';
  }>;
  wordCount: number;
  headingCount: number;
  hasImages: boolean;
  readabilityScore: number;
}

/**
 * Analyzes the SEO for a Nuvemshop product
 * @param product The Nuvemshop product to analyze
 * @returns SEO analysis results
 */
export const analyzeProductSEO = (product: NuvemshopProduct): ProductSEOResult => {
  try {
    // Get HTML content - safely handle different description formats
    const description = product.description || '';
    const htmlContent = typeof description === 'string' 
      ? description 
      : (description.pt || '');
      
    const textContent = extractTextFromHtml(htmlContent);
    
    // Calculate word count
    const wordCount = textContent.split(/\s+/).filter(Boolean).length;
    
    // Count headings
    const headingCount = (htmlContent.match(/<h[1-6][^>]*>/g) || []).length;
    
    // Check for images
    const hasImages = /<img/i.test(htmlContent);
    
    // Extract keywords
    const keywords = extractProductKeywords(textContent);
    
    // Calculate readability
    const readabilityScore = calculateReadabilityScore(textContent);
    
    // Calculate base score
    let score = 60;
    
    // Content length factors
    if (wordCount > 100) score += 5;
    if (wordCount > 200) score += 5;
    if (wordCount > 300) score += 10;
    
    // Image factors
    if (hasImages) score += 10;
    
    // Heading factors
    if (headingCount > 0) score += 5;
    if (headingCount > 2) score += 5;
    
    // Generate recommendations
    const recommendations = [];
    
    if (wordCount < 300) {
      recommendations.push({
        text: "A descrição está muito curta. Recomendamos pelo menos 300 palavras para um bom SEO.",
        type: 'warning' as const
      });
    } else {
      recommendations.push({
        text: "Bom comprimento de texto! Descrições mais longas tendem a classificar melhor.",
        type: 'success' as const
      });
    }
    
    if (!hasImages) {
      recommendations.push({
        text: "Nenhuma imagem encontrada. Adicione imagens relevantes para melhorar o SEO.",
        type: 'error' as const
      });
    } else {
      recommendations.push({
        text: "Imagens encontradas. Bom para engajamento e SEO.",
        type: 'success' as const
      });
    }
    
    if (headingCount === 0) {
      recommendations.push({
        text: "Nenhum cabeçalho (H1-H6) encontrado. Adicione cabeçalhos para estruturar seu conteúdo.",
        type: 'error' as const
      });
    } else if (headingCount < 3) {
      recommendations.push({
        text: `Apenas ${headingCount} cabeçalho(s) encontrado(s). Use mais cabeçalhos para melhor estrutura.`,
        type: 'warning' as const
      });
    } else {
      recommendations.push({
        text: `${headingCount} cabeçalhos encontrados. Boa estrutura de conteúdo.`,
        type: 'success' as const
      });
    }
    
    if (readabilityScore < 60) {
      recommendations.push({
        text: "O texto pode ser difícil de ler. Considere simplificar as frases e usar linguagem mais acessível.",
        type: 'warning' as const
      });
    }
    
    return {
      score: Math.min(100, score),
      keywords,
      wordCount,
      headingCount,
      hasImages,
      readabilityScore,
      recommendations
    };
  } catch (error) {
    console.error('Error analyzing product SEO:', error);
    return {
      score: 0,
      keywords: [],
      wordCount: 0,
      headingCount: 0,
      hasImages: false,
      readabilityScore: 0,
      recommendations: [{
        text: "Erro ao analisar o produto.",
        type: 'error'
      }]
    };
  }
};

/**
 * Extracts keywords from product text
 * @param text The text to extract keywords from
 * @returns Array of keywords with counts and density
 */
export const extractProductKeywords = (text: string) => {
  const stopWords = getPortugueseStopwords();
  
  const words = text.toLowerCase()
    .replace(/[^\wáàâãéèêíìîóòôõúùûç\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 3 && !stopWords.has(w));
  
  const wordCount = words.length;
  const keywordCounts: Record<string, number> = {};
  
  words.forEach(word => {
    keywordCounts[word] = (keywordCounts[word] || 0) + 1;
  });
  
  return Object.entries(keywordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([keyword, count]) => ({
      keyword,
      count,
      density: (count / wordCount) * 100
    }));
};

/**
 * Calculates readability score
 * @param text Text to analyze
 * @returns Readability score (0-100)
 */
export const calculateReadabilityScore = (text: string): number => {
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  if (!sentences.length) return 60;
  
  const avgSentenceLength = text.split(/\s+/).filter(Boolean).length / sentences.length;
  
  // Penalize very long or very short sentences
  let readabilityScore = 100;
  if (avgSentenceLength > 25) {
    readabilityScore -= (avgSentenceLength - 25) * 2;
  } else if (avgSentenceLength < 5) {
    readabilityScore -= (5 - avgSentenceLength) * 5;
  }
  
  return Math.max(0, Math.min(100, Math.round(readabilityScore)));
};
