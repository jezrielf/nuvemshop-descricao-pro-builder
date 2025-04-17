
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

export interface BlockStyle {
  backgroundColor?: string;
  textColor?: string;
  headingColor?: string;
  padding?: 'sm' | 'md' | 'lg' | 'none';
  blockSpacing?: 'sm' | 'md' | 'lg' | 'none';
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  borderWidth?: 'none' | 'sm' | 'md' | 'lg';
  borderColor?: string;
  boxShadow?: 'none' | 'sm' | 'md' | 'lg';
  fontFamily?: string;
  textAlign?: 'left' | 'center' | 'right';
}

export interface BlockBase {
  id: string;
  type: string;
  title: string;
  columns: ColumnLayout;
  visible: boolean;
  style?: BlockStyle;
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
