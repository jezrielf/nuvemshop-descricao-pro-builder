
import { ProductDescription } from '@/types/editor';

export interface HeadingItem {
  level: number;
  text: string;
}

export interface HeadingStructure {
  headings: HeadingItem[];
  hasValidH1: boolean;
  hasProperHierarchy: boolean;
  count: number;
  topKeywords: string[];
  structure: string;
}

export interface HeadingSuggestion {
  level: number;
  text: string;
  original?: string;
  locked?: boolean;
}

export interface HeadingStructureTabProps {
  headingStructure: HeadingStructure;
  currentProductTitle?: string;
  productId?: number;
  onUpdateHeadings?: (headings: HeadingSuggestion[]) => Promise<boolean>;
}
