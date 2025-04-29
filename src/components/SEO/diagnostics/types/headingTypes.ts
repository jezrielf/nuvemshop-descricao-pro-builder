
export interface HeadingSuggestion {
  level: number; 
  text: string;
  original?: string;
}

export interface HeadingStructure {
  headings: { level: number; text: string }[];
  hasValidH1: boolean;
  hasProperHierarchy: boolean;
  count: number;
  topKeywords: string[];
  structure: string;
}

export interface HeadingStructureTabProps {
  headingStructure: HeadingStructure;
  currentProductTitle?: string;
  productId?: number;
  onUpdateHeadings?: (headings: HeadingSuggestion[]) => Promise<boolean>;
}
