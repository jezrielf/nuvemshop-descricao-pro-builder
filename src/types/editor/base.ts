
export interface BlockBase {
  id: string;
  type: BlockType;
  title: string;
  columns: ColumnLayout;
  visible: boolean;
  style?: BlockStyle;
}

export interface BlockStyle {
  backgroundColor?: string;
  textColor?: string;
  headingColor?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  fontStyle?: string;
  textDecoration?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  headingWeight?: string;
  borderRadius?: string;
  borderWidth?: string;
  borderColor?: string;
  boxShadow?: string;
  padding?: string;
  margin?: string;
  imageFit?: 'cover' | 'contain' | 'fill' | 'none';
  hasBorder?: boolean;
  hasShadow?: boolean;
  blockSpacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export interface ProductDescription {
  id: string;
  name: string;
  blocks: any[];
  createdAt: string;
  updatedAt: string;
  productId?: string;
  userId?: string;
  storeId?: string;
  isPublished?: boolean;
  category?: ProductCategory;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

export interface Template {
  id: string;
  name: string;
  description?: string;
  category: ProductCategory;
  blocks: any[];
  thumbnailUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type ProductCategory = 
  | 'supplements'
  | 'clothing' 
  | 'accessories' 
  | 'shoes' 
  | 'electronics' 
  | 'energy' 
  | 'Casa e decoração' 
  | 'other'
  | 'Alimentos'
  | 'Bebidas' 
  | 'Beleza' 
  | 'Casa' 
  | 'Decoração' 
  | 'Eletrônicos' 
  | 'Esporte' 
  | 'Moda' 
  | 'Saúde';

export type ColumnLayout = 'full' | '2col' | '3col' | '4col';

export type BlockSpacing = 'none' | 'small' | 'medium' | 'large';

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
  | 'textVideo';
