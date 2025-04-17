
export interface BlockBase {
  id: string;
  type: string;
  title: string;
  columns: ColumnLayout;
  visible: boolean;
  style?: BlockStyle;
}

export interface BlockStyle {
  backgroundColor?: string;
  textColor?: string;
  headingColor?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  borderWidth?: string;
  borderColor?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: string;
  boxShadow?: string;
  hasBorder?: boolean;
  hasShadow?: boolean;
  blockSpacing?: string;
  [key: string]: any; // For other custom styles
}

export interface ProductDescription {
  id: string;
  name: string;
  blocks: Block[];
  createdAt: string;
  updatedAt: string;
}

export type ColumnLayout = 1 | 2 | 3 | 4;

// Import block types from the blocks directory
import { Block } from './blocks';
import { BlockType } from './blocks';

// Export these types for use in other files
export type { Block, BlockType };

export type ProductCategory = 
  | 'supplements' 
  | 'clothing' 
  | 'accessories' 
  | 'shoes' 
  | 'electronics' 
  | 'energy' 
  | 'health'
  | 'beauty'
  | 'fashion'
  | 'haute-couture'
  | 'home-decor' // Added home-decor category
  | 'other';

export interface Template {
  id: string;
  name: string;
  category: ProductCategory;
  blocks: Block[];
  thumbnail: string;
}

// Define BlockSpacing for styleConverter.ts
export interface BlockSpacing {
  margin?: string;
  padding?: string;
}
