
/**
 * Extracts plain text from HTML content
 * @param html HTML string to extract text from
 * @returns Plain text without HTML tags and with normalized spacing
 */
export const extractTextFromHtml = (html: string): string => {
  if (!html) return '';
  
  // Remove script tags and their contents
  let text = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ');
  
  // Remove style tags and their contents
  text = text.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ');
  
  // Replace all other HTML tags with space
  text = text.replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  
  // Normalize whitespace
  text = text.replace(/\s+/g, ' ').trim();
  
  return text;
};

/**
 * Creates a list of common stopwords in Portuguese
 * @returns Set of stopwords
 */
export const getPortugueseStopwords = (): Set<string> => {
  return new Set([
    'a', 'ao', 'aos', 'aquela', 'aquelas', 'aquele', 'aqueles', 'aquilo', 'as', 'até',
    'com', 'como', 'da', 'das', 'de', 'dela', 'delas', 'dele', 'deles', 'depois',
    'do', 'dos', 'e', 'ela', 'elas', 'ele', 'eles', 'em', 'entre', 'era',
    'eram', 'éramos', 'essa', 'essas', 'esse', 'esses', 'esta', 'estas', 'este', 'estes',
    'eu', 'foi', 'fomos', 'for', 'foram', 'forem', 'formos', 'fosse', 'fossem', 'fôssemos',
    'há', 'haja', 'hajam', 'hajamos', 'hão', 'havemos', 'haver', 'hei', 'houve', 'houvemos',
    'houver', 'houverá', 'houverão', 'houverem', 'houveremos', 'houveria', 'houveriam', 'houveríamos', 'houvermos', 'houvesse',
    'houvessem', 'houvéssemos', 'isso', 'isto', 'já', 'lhe', 'lhes', 'mais', 'mas', 'me',
    'mesmo', 'meu', 'meus', 'minha', 'minhas', 'muito', 'na', 'não', 'nas', 'nem',
    'no', 'nos', 'nós', 'nossa', 'nossas', 'nosso', 'nossos', 'num', 'numa', 'o',
    'os', 'ou', 'para', 'pela', 'pelas', 'pelo', 'pelos', 'por', 'qual', 'quando',
    'que', 'quem', 'se', 'seja', 'sejam', 'sejamos', 'sem', 'será', 'serão', 'serei',
    'seremos', 'seria', 'seriam', 'seríamos', 'seu', 'seus', 'só', 'somos', 'são', 'sua',
    'suas', 'também', 'te', 'tem', 'têm', 'temos', 'tenha', 'tenham', 'tenhamos', 'tenho',
    'terá', 'terão', 'terei', 'teremos', 'teria', 'teriam', 'teríamos', 'teu', 'teus', 'teve',
    'tinha', 'tinham', 'tínhamos', 'tive', 'tivemos', 'tiver', 'tivera', 'tiveram', 'tiverem', 'tivermos',
    'tivesse', 'tivessem', 'tivéssemos', 'tu', 'tua', 'tuas', 'um', 'uma', 'você', 'vocês',
    'vos', 'vós'
  ]);
};

/**
 * Analyzes keyword density in a text
 * @param text Text to analyze
 * @param minWordLength Minimum word length to consider (default: 4)
 * @param maxKeywords Maximum number of keywords to return (default: 10)
 * @returns Object with keywords and their counts
 */
export const analyzeKeywordDensity = (
  text: string, 
  minWordLength: number = 4, 
  maxKeywords: number = 10
): Record<string, number> => {
  if (!text) return {};
  
  const words = text.toLowerCase()
    .replace(/[^\wáàâãéèêíìîóòôõúùûç\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length >= minWordLength);
    
  const stopWords = getPortugueseStopwords();
  const keywordCounts: Record<string, number> = {};
  
  // Count keywords while filtering stopwords
  words.forEach(word => {
    if (!stopWords.has(word)) {
      keywordCounts[word] = (keywordCounts[word] || 0) + 1;
    }
  });
  
  // Sort by frequency and limit results
  const sortedKeywords = Object.entries(keywordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxKeywords);
  
  return Object.fromEntries(sortedKeywords);
};
