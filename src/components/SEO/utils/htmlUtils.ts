
/**
 * Extracts plain text from HTML content
 * @param html HTML string to extract text from
 * @returns Plain text without HTML tags and with normalized spacing
 */
export const extractTextFromHtml = (html: string): string => {
  if (!html) return '';
  
  try {
    // Use DOMParser to properly handle HTML entities
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Remove script and style elements
    const scripts = doc.querySelectorAll('script, style');
    scripts.forEach(el => el.remove());
    
    // Get the text content, which automatically decodes HTML entities
    let text = doc.body.textContent || '';
    
    // Normalize whitespace
    text = text.replace(/\s+/g, ' ').trim();
    
    return text;
  } catch (e) {
    console.error('Error parsing HTML with DOMParser, falling back to regex:', e);
    
    // Fallback method using regex
    // Remove script tags and their contents
    let text = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ');
    
    // Remove style tags and their contents
    text = text.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ');
    
    // Create a temporary element to decode HTML entities
    const tempElement = document.createElement('div');
    
    // Replace all HTML tags with space
    text = text.replace(/<[^>]+>/g, ' ');
    
    // Decode HTML entities by setting innerHTML and reading textContent
    tempElement.innerHTML = text;
    text = tempElement.textContent || tempElement.innerText || '';
    
    // Normalize whitespace
    text = text.replace(/\s+/g, ' ').trim();
    
    return text;
  }
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
  
  // Clean and normalize the text before analysis
  const cleanText = text.toLowerCase();
  
  // Split into words and filter by length
  const words = cleanText
    .replace(/[^\wáàâãéèêíìîóòôõúùûç\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length >= minWordLength);
  
  // Filter HTML entity patterns that might have survived
  const filteredWords = words.filter(word => 
    !word.match(/^[a-z]+;$/) && // Avoid things like "eacute;"
    !word.match(/^[a-z]+[0-9]+$/) && // Avoid things like "nbsp160"
    !word.includes('&') && // Avoid partial entities with ampersand
    word !== 'nbsp' && // Common entity name
    word !== 'eacute' && // Common entity name
    word !== 'ccedil' && // Common entity name
    word !== 'atilde' && // Common entity name
    word !== 'otilde' && // Common entity name
    word !== 'aacute' // Common entity name
  );
    
  const stopWords = getPortugueseStopwords();
  const keywordCounts: Record<string, number> = {};
  
  // Count keywords while filtering stopwords
  filteredWords.forEach(word => {
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
