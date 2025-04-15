
// Re-export from base
export type { 
  BaseBlock, 
  BlockBase,
  BlockStyle,
  ProductDescription,
  Template,
  ProductCategory,
  ColumnLayout,
  BlockSpacing
} from './base';

// Re-export from blocks directory - this will be our canonical source for Block types
export * from './blocks';

