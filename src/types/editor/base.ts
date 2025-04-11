
export type BlockType = 
  | 'hero' 
  | 'features' 
  | 'benefits' 
  | 'specifications' 
  | 'text' 
  | 'image' 
  | 'gallery'
  | 'imageText'
  | 'textImage'
  | 'faq'
  | 'cta';

export type ColumnLayout = 1 | 2 | 3 | 4;

export type TextAlign = 'left' | 'center' | 'right' | 'justify';
export type SpacingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type FontSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
export type BlockSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'small' | 'medium' | 'large' | 'extra-large';
export type FontWeight = 'normal' | 'medium' | 'semibold' | 'bold';
export type FontStyle = 'normal' | 'italic';
export type TextDecoration = 'none' | 'underline';
export type ImageFit = 'contain' | 'cover';

export interface BlockStyle {
  backgroundColor?: string;
  textColor?: string;
  headingColor?: string;
  fontFamily?: 'sans' | 'serif' | 'mono';
  fontSize?: FontSize;
  textAlign?: TextAlign;
  fontWeight?: FontWeight;
  fontStyle?: FontStyle;
  textDecoration?: TextDecoration;
  headingWeight?: FontWeight;
  padding?: SpacingSize;
  margin?: SpacingSize;
  blockSpacing?: BlockSpacing;
  borderRadius?: SpacingSize;
  borderColor?: string;
  hasBorder?: boolean;
  hasShadow?: boolean;
  imageFit?: ImageFit;
  backgroundImage?: string;
  backgroundPosition?: string;
  backgroundSize?: string;
  lineHeight?: string;
  borderWidth?: string;
  boxShadow?: string;
}

export interface BlockBase {
  id: string;
  type: BlockType;
  title: string;
  columns: ColumnLayout;
  visible: boolean;
  style?: BlockStyle;
}

export type ProductCategory = 
  | 'supplements' 
  | 'clothing' 
  | 'accessories' 
  | 'shoes' 
  | 'electronics' 
  | 'energy' 
  | 'other';

export interface ProductDescription {
  id: string;
  name: string;
  blocks: Block[];
  createdAt: string;
  updatedAt: string;
}

export interface Template {
  id: string;
  name: string;
  category: ProductCategory;
  blocks: Block[];
  thumbnail?: string;
}

// Corrigido o export usando 'export type' para resolver o erro TS1205
import type { Block } from './blocks';
export type { Block };

