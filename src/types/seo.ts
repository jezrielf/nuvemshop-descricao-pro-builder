
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
}
