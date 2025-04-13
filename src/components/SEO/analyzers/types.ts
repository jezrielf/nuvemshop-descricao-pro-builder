
export interface SEOKeyword {
  word: string;
  count: number;
  relevance: number;
}

export interface SEORecommendation {
  text: string;
  type: 'success' | 'warning' | 'error';
}

export interface SEOResult {
  score: number;
  recommendations: SEORecommendation[];
  keywords: SEOKeyword[];
}
