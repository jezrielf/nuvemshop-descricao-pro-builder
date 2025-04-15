
export interface BaseBlock {
  id: string;
  type: string;
  title: string;
  columns: ColumnLayout;
  visible: boolean;
  style?: BlockStyle;
}

// Adding BlockBase and BlockStyle interfaces
export interface BlockBase extends BaseBlock {
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
  padding?: string;
  margin?: string;
  borderRadius?: string;
  borderWidth?: string;
  borderColor?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: string;
  boxShadow?: string;
  [key: string]: any; // For other custom styles
}

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
  category: string;
  blocks: Block[];
}

export type ProductCategory = 'supplements' | 'clothing' | 'accessories' | 'shoes' | 'electronics' | 'energy' | 'other' | string;

// Import block types from the blocks directory
import { Block, BlockType } from './blocks';
export { Block, BlockType };

export type ColumnLayout = 1 | 2 | 3 | 4;

// Define BlockSpacing for styleConverter.ts
export interface BlockSpacing {
  margin?: string;
  padding?: string;
}
