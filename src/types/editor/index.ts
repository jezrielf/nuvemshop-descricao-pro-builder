
// Re-export from base
export type { 
  BlockBase,
  BlockStyle,
  ProductDescription,
  Template,
  ProductCategory,
  ColumnLayout,
  BlockSpacing,
  BlockType
} from './base';

// Re-export from products directory
export type { ProductCategory } from './products';

// Re-export from blocks directory - this will be our canonical source for Block types
export * from './blocks';

// Additional exports to fix specific import issues
export type { Block } from './blocks';
