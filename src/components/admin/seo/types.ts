
export interface ReadabilityBreakdownItem {
  metric: string;
  score: number;
  ideal: string;
  current: string;
}

export interface ReadabilityMetrics {
  overallScore: number;
  averageSentenceLength: string;
  longSentencesPercentage: number;
  complexWordsPercentage: number;
  readingTime: string;
  breakdown: ReadabilityBreakdownItem[];
  descriptionsData: DescriptionMetric[];
}

export interface DescriptionMetric {
  id: number;
  title: string;
  score: number;
  avgSentenceLength: string;
  complexWordsPerc: number;
}
