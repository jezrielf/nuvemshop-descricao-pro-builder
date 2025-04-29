
export interface SEOTechnicalDiagnosis {
  overallScore: number;
  headerStructure: HeaderStructureAnalysis;
  keywordAnalysis: KeywordAnalysis;
  contentQuality: ContentQualityAnalysis;
  semanticAnalysis: SemanticAnalysis;
  contentFreshness: ContentFreshnessAnalysis;
  recommendations: SEORecommendation[];
}

export interface HeaderStructureAnalysis {
  score: number;
  h1Count: number;
  h2Count: number;
  h3Count: number;
  hasProperHierarchy: boolean;
  issues: string[];
}

export interface KeywordAnalysis {
  score: number;
  mainKeyword: string;
  mainKeywordDensity: number;
  keywordDistribution: {
    title: boolean;
    firstParagraph: boolean;
    headings: boolean;
    throughout: boolean;
  };
  secondaryKeywords: Array<{
    keyword: string;
    density: number;
    count: number;
  }>;
  issues: string[];
}

export interface ContentQualityAnalysis {
  score: number;
  wordCount: number;
  paragraphCount: number;
  avgSentenceLength: number;
  readabilityScore: number;
  hasImages: boolean;
  imageAltText: boolean;
  issues: string[];
}

export interface SemanticAnalysis {
  score: number;
  titleContentMatch: number; // 0-100%
  topicCoverage: number; // 0-100%
  relatedTermsUsage: string[];
  issues: string[];
}

export interface ContentFreshnessAnalysis {
  score: number;
  lastUpdated: Date;
  daysSinceUpdate: number;
  updateFrequency: number; // average days between updates
  issues: string[];
}

export interface SEORecommendation {
  type: 'critical' | 'important' | 'improvement' | 'good';
  text: string;
  impact: number; // 1-100
  implementation?: string;
}

export interface SEOHistoricalComparison {
  currentVersion: SEOTechnicalDiagnosis;
  previousVersion: SEOTechnicalDiagnosis | null;
  changes: {
    overallScoreChange: number;
    improvements: string[];
    regressions: string[];
  };
}

// Import the SEOMetrics type from seo.ts
import { SEOMetrics } from './seo';

// Extended version of the existing SEOMetrics
export interface ExtendedSEOMetrics extends SEOMetrics {
  technicalDiagnosis: SEOTechnicalDiagnosis;
  historicalComparison?: SEOHistoricalComparison;
}
