
export interface SEOMetrics {
  totalDescriptions: number;
  newDescriptionsToday: number;
  averageWordCount: number;
  averageSEOScore: number;
  averageReadabilityScore: number;
  historicalData: {
    date: string;
    seoScore: number;
    readabilityScore: number;
  }[];
  keywordMetrics: {
    keyword: string;
    frequency: number;
    relevance: number;
  }[];
}

export interface ReadabilityMetrics {
  averageSentenceLength: number;
  averageWordLength: number;
  syllablesPerWord: number;
}
