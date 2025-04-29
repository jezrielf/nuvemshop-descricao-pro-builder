
import { ProductDescription } from '@/types/editor';
import { getTextContentFromDescription } from '@/components/SEO/utils/contentUtils';

/**
 * Extract keywords from product description
 */
export function extractKeywords(description: ProductDescription): string[] {
  const textContent = getTextContentFromDescription(description);
  
  // Remove common words and stopwords
  const stopWords = ['o', 'a', 'os', 'as', 'um', 'uma', 'uns', 'umas', 'e', 'ou', 'de', 'da', 'do', 'das', 'dos', 'em', 'no', 'na', 'para', 'com', 'seu', 'sua', 'que', 'por', 'é'];
  
  // Clean the text and split into words
  const words = textContent
    .toLowerCase()
    .replace(/[^\w\sáàâãéèêíïóôõöúçñ]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.includes(word));
  
  // Count word frequencies
  const wordCounts: {[key: string]: number} = {};
  words.forEach(word => {
    wordCounts[word] = (wordCounts[word] || 0) + 1;
  });
  
  // Convert to array and sort by frequency
  const sortedWords = Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0]);
  
  // Return top keywords (up to 10)
  return sortedWords.slice(0, 10);
}
