
import { ProductCategory, BlockSpacing, SpacingSize, TextAlign } from '@/types/editor';

export interface AIDescriptionInput {
  productName: string;
  productCategory: string;
  productPrice?: string;
  companyInfo: string;
  targetAudience: string;
  mainFeatures: string;
  additionalInfo?: string;
  tone: 'formal' | 'casual' | 'professional' | 'enthusiastic';
  imageUrl?: string;
  modelImageUrl?: string;
}

export interface LayoutStyle {
  backgroundColor: string;
  headingColor: string;
  textAlign: TextAlign;
  padding: SpacingSize;
  blockSpacing: BlockSpacing;
}
