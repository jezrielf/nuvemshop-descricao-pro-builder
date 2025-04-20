
export function getKeywordDensity(text: string): { [key: string]: number } {
  // Remove special characters and convert to lowercase
  const cleanText = text.toLowerCase().replace(/[^\w\s]/g, '');
  
  // Split into words and filter out common words and short words
  const words = cleanText.split(/\s+/).filter(word => 
    word.length > 3 && !isStopWord(word)
  );

  // Count word frequencies
  const frequencies: { [key: string]: number } = {};
  words.forEach(word => {
    frequencies[word] = (frequencies[word] || 0) + 1;
  });

  return frequencies;
}

// Portuguese stop words (common words to ignore)
const stopWords = new Set([
  'isso', 'este', 'esta', 'isso', 'aquilo', 'pelo', 'pela', 'pelos', 'pelas',
  'para', 'como', 'mas', 'mais', 'menos', 'seja', 'seus', 'suas', 'entre',
  'com', 'sem', 'você', 'seu', 'sua', 'são', 'dos', 'das', 'aos', 'tem',
  'que', 'por', 'nas', 'nos', 'não', 'sim', 'uma', 'uns', 'uma', 'umas'
]);

export function isStopWord(word: string): boolean {
  return stopWords.has(word.toLowerCase());
}

export function calculateReadabilityMetrics(text: string) {
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  const words = text.split(/\s+/).filter(Boolean);
  const syllables = countSyllables(text);

  return {
    averageSentenceLength: words.length / sentences.length,
    averageWordLength: words.join('').length / words.length,
    syllablesPerWord: syllables / words.length
  };
}

function countSyllables(text: string): number {
  // Simple Portuguese syllable counter
  const words = text.toLowerCase().split(/\s+/);
  let count = 0;

  const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'y', 'á', 'é', 'í', 'ó', 'ú', 'â', 'ê', 'î', 'ô', 'û', 'ã', 'õ']);
  
  words.forEach(word => {
    let syllableCount = 0;
    let prevChar = '';
    
    for (let i = 0; i < word.length; i++) {
      if (vowels.has(word[i]) && !vowels.has(prevChar)) {
        syllableCount++;
      }
      prevChar = word[i];
    }
    
    count += syllableCount || 1;
  });

  return count;
}
