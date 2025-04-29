
import React from 'react';
import { HeadingStructureTab as HeadingStructureTabComponent } from './headings/HeadingStructureTab';
import { HeadingStructure } from '../types/headingTypes';
import { HeadingSuggestion } from '../types/headingTypes';

interface HeadingStructureTabProps {
  headingStructure: HeadingStructure;
  currentProductTitle?: string;
  productId?: number;
  onUpdateHeadings?: (headings: HeadingSuggestion[]) => Promise<boolean>;
}

export const HeadingStructureTab: React.FC<HeadingStructureTabProps> = (props) => {
  // Forward all props to the refactored component
  return <HeadingStructureTabComponent {...props} />;
};

export default HeadingStructureTab;
