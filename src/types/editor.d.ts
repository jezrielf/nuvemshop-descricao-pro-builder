
// Add this to your existing editor.d.ts file or create it if it doesn't exist
export type BlockSpacing = 'none' | 'small' | 'medium' | 'large';

// Make sure BlockStyle includes blockSpacing
export interface BlockStyle {
  padding?: string;
  margin?: string;
  backgroundColor?: string;
  backgroundGradient?: string;
  textColor?: string;
  borderRadius?: string;
  borderWidth?: string;
  borderColor?: string;
  blockSpacing?: BlockSpacing;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  imageFit?: 'cover' | 'contain' | 'fill' | 'none';
  // Allow any other properties
  [key: string]: any;
}

// Add this to ensure name is allowed in Block updates
export interface BlockBase {
  id: string;
  type: BlockType;
  visible: boolean;
  title: string;
  columns: ColumnLayout;
  style?: BlockStyle;
  name?: string; // Add this to make it valid for the description
}

// Make sure all block types are defined
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
  | 'video'
  | 'videoText'
  | 'textVideo'
  | 'carousel';

// Re-export ProductCategory
export type ProductCategory = string;

// Define ColumnLayout type
export type ColumnLayout = 'full' | '1/2' | '1/3' | '2/3' | '1/4' | '3/4' | 1 | 2 | 3 | 4;
