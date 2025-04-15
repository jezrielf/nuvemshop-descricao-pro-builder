
// Re-export from base only what's not in blocks
export type { 
  BaseBlock, 
  BlockBase,
  BlockStyle,
  ProductDescription,
  Template,
  ProductCategory,
  ColumnLayout,
  BlockType
} from './base';

// Re-export from blocks directory
export * from './blocks';

// Export BlockSpacing for styleConverter.ts
export interface BlockSpacing {
  margin?: string;
  padding?: string;
}
