import { useMemo } from 'react';
import { Template } from '@/types/editor';
import { 
  calculateWordCount, 
  calculateKeywordDensity, 
  extractTextFromBlocks,
  analyzeHeadingHierarchy,
  checkImageAltTexts,
  findCTABlocks,
  generateSEOScore,
  generateRecommendations
} from '@/utils/seo/templateSeo';

export interface TemplateSEOResult {
  score: number;
  wordCount: number;
  keywordDensity: number;
  headingAnalysis: {
    hasH1: boolean;
    hierarchy: string[];
    issues: string[];
  };
  imageAnalysis: {
    totalImages: number;
    imagesWithAlt: number;
    missingAlt: string[];
  };
  ctaAnalysis: {
    hasCTA: boolean;
    ctaCount: number;
  };
  recommendations: Array<{
    type: 'success' | 'warning' | 'error';
    message: string;
    action?: string;
  }>;
  keywords: string[];
}

export const useTemplateSEOAnalysis = (
  template: Template | null,
  keyword?: string
): TemplateSEOResult | null => {
  return useMemo(() => {
    if (!template || template.blocks.length === 0) {
      return null;
    }

    // Extract text content from all blocks
    const textContent = extractTextFromBlocks(template.blocks);
    const wordCount = calculateWordCount(textContent);
    
    // Calculate keyword density if keyword is provided
    const keywordDensity = keyword ? calculateKeywordDensity(textContent, keyword) : 0;
    
    // Analyze heading hierarchy
    const headingAnalysis = analyzeHeadingHierarchy(template.blocks);
    
    // Check image alt texts
    const imageAnalysis = checkImageAltTexts(template.blocks);
    
    // Find CTA blocks
    const ctaAnalysis = findCTABlocks(template.blocks);
    
    // Generate overall SEO score
    const score = generateSEOScore({
      wordCount,
      keywordDensity,
      headingAnalysis,
      imageAnalysis,
      ctaAnalysis,
      hasKeyword: !!keyword
    });
    
    // Generate recommendations
    const recommendations = generateRecommendations({
      wordCount,
      keywordDensity,
      headingAnalysis,
      imageAnalysis,
      ctaAnalysis,
      keyword
    });
    
    // Generate keyword suggestions based on content
    const keywords = generateKeywordSuggestions(textContent, keyword);

    return {
      score,
      wordCount,
      keywordDensity,
      headingAnalysis,
      imageAnalysis,
      ctaAnalysis,
      recommendations,
      keywords
    };
  }, [template, keyword]);
};

function generateKeywordSuggestions(content: string, primaryKeyword?: string): string[] {
  const words = content.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3);
  
  // Count word frequency
  const wordCount = words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Sort by frequency and take top suggestions
  const suggestions = Object.entries(wordCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([word]) => word)
    .filter(word => word !== primaryKeyword?.toLowerCase());
    
  return suggestions.slice(0, 5);
}