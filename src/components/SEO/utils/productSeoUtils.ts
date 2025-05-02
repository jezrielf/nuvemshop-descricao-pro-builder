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
  googleView?: {
    simplifiedHtml: string;
    crawlabilityScore: number;
    technicalIssues: Array<{
      issue: string;
      severity: 'high' | 'medium' | 'low';
      details: string;
    }>;
    hasStructuredData: boolean;
    structuredDataValidity: boolean;
  };
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
    
    // Generate Google View analysis
    const googleView = simulateGoogleView(htmlContent);
    
    return {
      score: Math.min(100, score),
      keywords,
      wordCount,
      headingCount,
      hasImages,
      readabilityScore,
      recommendations,
      googleView
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

/**
 * Simulates how Google would view the page content
 * @param htmlContent Original HTML content
 * @returns Google view analysis results
 */
export const simulateGoogleView = (htmlContent: string) => {
  try {
    // Simplify HTML as Google would see it
    const simplifiedHtml = simplifyHtml(htmlContent);
    
    // Extract and validate structured data
    const structuredDataResult = extractStructuredData(htmlContent);
    
    // Analyze crawlability and identify technical issues
    const crawlabilityResult = analyzeCrawlability(htmlContent);
    
    return {
      simplifiedHtml,
      crawlabilityScore: crawlabilityResult.score,
      technicalIssues: crawlabilityResult.issues,
      hasStructuredData: structuredDataResult.hasStructuredData,
      structuredDataValidity: structuredDataResult.isValid
    };
  } catch (error) {
    console.error('Error simulating Google view:', error);
    return {
      simplifiedHtml: '<p>Erro ao processar HTML</p>',
      crawlabilityScore: 0,
      technicalIssues: [{
        issue: 'Erro ao analisar conteúdo',
        severity: 'high' as const,
        details: 'Ocorreu um erro ao processar o HTML para simulação.'
      }],
      hasStructuredData: false,
      structuredDataValidity: false
    };
  }
};

/**
 * Simplifies HTML content to simulate Google's view
 * @param html Original HTML content
 * @returns Simplified HTML string
 */
const simplifyHtml = (html: string): string => {
  if (!html) return '';
  
  let simplified = html;
  
  // Remove scripts - Google mostly ignores JavaScript
  simplified = simplified.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove style tags - focus on content not styling
  simplified = simplified.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  
  // Remove comments
  simplified = simplified.replace(/<!--[\s\S]*?-->/g, '');
  
  // Simplify complex HTML structures but maintain content
  simplified = simplified
    .replace(/(\r\n|\n|\r)/gm, ' ')  // Remove line breaks
    .replace(/\s+/g, ' ')           // Normalize whitespace
    .replace(/<\/?div[^>]*>/gi, '') // Remove div tags
    .replace(/<\/?span[^>]*>/gi, '') // Remove span tags
    .trim();
  
  // Add highlighting for important elements
  simplified = simplified
    .replace(/<h1([^>]*)>(.*?)<\/h1>/gi, '<h1 style="color:#1a73e8">$2</h1>')
    .replace(/<h2([^>]*)>(.*?)<\/h2>/gi, '<h2 style="color:#1a73e8">$2</h2>')
    .replace(/<h3([^>]*)>(.*?)<\/h3>/gi, '<h3 style="color:#1a73e8">$2</h3>')
    .replace(/<a([^>]*)>(.*?)<\/a>/gi, '<a style="color:#1a0dab" $1>$2</a>');
  
  return simplified;
};

/**
 * Extracts and validates structured data from HTML
 * @param html HTML content
 * @returns Structure data analysis result
 */
const extractStructuredData = (html: string) => {
  try {
    // Check for JSON-LD script tags
    const structuredDataMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
    
    if (!structuredDataMatch) {
      return { 
        hasStructuredData: false, 
        isValid: false 
      };
    }
    
    // Extract JSON content
    const jsonContent = structuredDataMatch[1];
    
    // Check if it's valid JSON
    try {
      JSON.parse(jsonContent.trim());
      return { 
        hasStructuredData: true, 
        isValid: true 
      };
    } catch (e) {
      return { 
        hasStructuredData: true, 
        isValid: false 
      };
    }
  } catch (error) {
    console.error('Error extracting structured data:', error);
    return { 
      hasStructuredData: false, 
      isValid: false 
    };
  }
};

/**
 * Analyzes crawlability issues in HTML content
 * @param html HTML content
 * @returns Crawlability analysis
 */
const analyzeCrawlability = (html: string) => {
  const issues: Array<{
    issue: string;
    severity: 'high' | 'medium' | 'low';
    details: string;
  }> = [];
  
  let score = 100;
  
  // Check missing title
  if (!/<title>(.*?)<\/title>/i.test(html)) {
    issues.push({
      issue: 'Tag <title> não encontrada',
      severity: 'high',
      details: 'A tag title é crucial para SEO e deve descrever claramente o conteúdo da página.'
    });
    score -= 20;
  }
  
  // Check missing meta description
  if (!/<meta\s+[^>]*name=["']description["'][^>]*>/i.test(html)) {
    issues.push({
      issue: 'Meta description não encontrada',
      severity: 'medium',
      details: 'A meta description ajuda os mecanismos de busca a entender o conteúdo da página.'
    });
    score -= 10;
  }
  
  // Check for noindex, nofollow
  if (/<meta\s+[^>]*content=["'][^"']*noindex[^"']*["'][^>]*>/i.test(html)) {
    issues.push({
      issue: 'Meta noindex detectada',
      severity: 'high',
      details: 'Esta página está configurada para não ser indexada pelo Google.'
    });
    score -= 50;
  }
  
  // Check for broken image tags
  const imgTags = html.match(/<img[^>]+>/g) || [];
  let imgTagsWithoutAlt = 0;
  
  imgTags.forEach(tag => {
    if (!/ alt=["'][^"']*["']/i.test(tag)) {
      imgTagsWithoutAlt++;
    }
  });
  
  if (imgTagsWithoutAlt > 0) {
    issues.push({
      issue: `${imgTagsWithoutAlt} imagem(ns) sem atributo alt`,
      severity: 'medium',
      details: 'Imagens sem texto alternativo prejudicam a acessibilidade e o SEO.'
    });
    score -= Math.min(15, imgTagsWithoutAlt * 3);
  }
  
  // Check heading structure
  const h1Count = (html.match(/<h1[^>]*>/gi) || []).length;
  
  if (h1Count === 0) {
    issues.push({
      issue: 'Sem cabeçalho H1',
      severity: 'high',
      details: 'Cada página deve ter um cabeçalho H1 que descreva claramente o conteúdo.'
    });
    score -= 15;
  } else if (h1Count > 1) {
    issues.push({
      issue: 'Múltiplos cabeçalhos H1',
      severity: 'medium',
      details: 'É recomendado ter apenas um cabeçalho H1 por página.'
    });
    score -= 5;
  }
  
  // Check for empty links
  const emptyLinks = (html.match(/<a[^>]*>\s*<\/a>/gi) || []).length;
  
  if (emptyLinks > 0) {
    issues.push({
      issue: `${emptyLinks} link(s) vazio(s)`,
      severity: 'low',
      details: 'Links sem conteúdo afetam negativamente SEO e acessibilidade.'
    });
    score -= Math.min(10, emptyLinks * 2);
  }
  
  // Check for canonical tag
  if (!/<link\s+[^>]*rel=["']canonical["'][^>]*>/i.test(html)) {
    issues.push({
      issue: 'Link canônico não encontrado',
      severity: 'low',
      details: 'Um link canônico ajuda a evitar conteúdo duplicado.'
    });
    score -= 5;
  }
  
  return {
    score: Math.max(0, Math.min(100, Math.round(score))),
    issues: issues
  };
};
