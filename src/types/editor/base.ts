
export type ColumnLayout = 1 | 2 | 3 | 4;

export type ProductCategory = 
  | 'supplements'       // Suplementos
  | 'clothing'          // Roupas
  | 'accessories'       // Acessórios
  | 'shoes'             // Calçados
  | 'electronics'       // Eletrônicos
  | 'energy'            // Energéticos
  | 'health'            // Saúde e bem estar
  | 'beauty'            // Cosméticos
  | 'fashion'           // Moda
  | 'haute-couture'     // Alta Costura
  | 'home-decor'        // Casa e decoração
  | 'fitness'           // Fitness
  | 'beverages'         // Bebidas
  | 'water-purifiers'   // Purificadores de água
  | 'other';            // Outros

export type BlockSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'extra-large' | 'small' | 'medium' | 'large';

export interface BlockStyle {
  backgroundColor?: string;
  textColor?: string;
  headingColor?: string;
  padding?: 'sm' | 'md' | 'lg' | 'none';
  blockSpacing?: BlockSpacing;
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  borderWidth?: 'none' | 'sm' | 'md' | 'lg';
  borderColor?: string;
  boxShadow?: 'none' | 'sm' | 'md' | 'lg';
  fontFamily?: string;
  textAlign?: 'left' | 'center' | 'right';
  
  // Additional properties
  imageFit?: 'contain' | 'cover';
  fontSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
  fontStyle?: 'normal' | 'italic';
  textDecoration?: 'none' | 'underline';
  margin?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
  hasBorder?: boolean;
  hasShadow?: boolean;
  headingWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
  
  // Additional background properties
  backgroundImage?: string;
  backgroundPosition?: string;
  backgroundSize?: string;
  lineHeight?: string;
}

export interface BlockBase {
  id: string;
  type: string;
  title: string;
  columns: ColumnLayout;
  visible: boolean;
  style?: BlockStyle;
}

// Make the category property optional in ProductDescription interface
export interface ProductDescription {
  id: string;
  name: string;
  category?: ProductCategory; // Optional category
  blocks: Block[];
  thumbnail?: string;
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
}

export interface Template {
  id: string;
  name: string;
  category: ProductCategory;
  blocks: Block[];
  thumbnail: string;
}

// Import all block types
import { Block } from './blocks';
