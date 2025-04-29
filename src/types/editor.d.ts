
export interface ProductDescription {
  id: string;
  name: string;
  blocks: Block[];
  createdAt: string;
  updatedAt: string;
  userId?: string;
  history?: DescriptionHistory[];
  category?: ProductCategory;  // Added missing category property
  productName?: string;
}

export interface DescriptionHistory {
  date: string;
  version: number;
  changes: string;
}

// Import Block type to ensure it's available in this file
import { Block, BlockType, ColumnLayout, BlockBase, BlockStyle } from './editor/blocks';
import { ProductCategory } from './editor/products';

// Re-export these types so they're available when importing from this file
export { Block, BlockType, ColumnLayout, BlockBase, BlockStyle, ProductCategory };

