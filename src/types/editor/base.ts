
import { ProductCategory } from './products';

export type BlockType = 
  | 'hero'
  | 'text'
  | 'features'
  | 'benefits'
  | 'specifications'
  | 'image'
  | 'gallery'
  | 'imageText'
  | 'textImage'
  | 'faq'
  | 'cta'
  | 'video';

export type ColumnLayout = 'full' | '1/2' | '1/3' | '2/3' | '1/4' | '3/4' | 1 | 2 | 3 | 4;

export type BlockSpacing = 'none' | 'small' | 'medium' | 'large';

export interface BlockStyle {
  backgroundColor?: string;
  backgroundGradient?: string;
  backgroundGradientDirection?: string;
  backgroundGradientStartColor?: string;
  backgroundGradientEndColor?: string;
  backgroundImage?: string;
  textColor?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  borderWidth?: string;
  borderColor?: string;
  borderStyle?: string;
  boxShadow?: string;
  fontFamily?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  imageFit?: 'cover' | 'contain' | 'fill' | 'none';
  imagePosition?: string;
  headingColor?: string;
  colorMode?: 'solid' | 'gradient' | 'predefined';
  [key: string]: any;
}

export interface BlockBase {
  id: string;
  type: BlockType;
  title: string;
  visible: boolean;
  columns: ColumnLayout;
  style: BlockStyle;
}

export interface Template {
  id: string;
  name: string;
  category: ProductCategory;
  thumbnail?: string;
  blocks: any[];
}

export interface ProductDescription {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  productName?: string;
  category?: ProductCategory;
  blocks: any[];
}

// Export ProductCategory using export type for TypeScript's isolatedModules
export type { ProductCategory };
