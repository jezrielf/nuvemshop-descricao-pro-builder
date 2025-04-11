
export type BlockType = 
  | 'hero' 
  | 'features' 
  | 'benefits' 
  | 'specifications' 
  | 'text' 
  | 'image' 
  | 'gallery'
  | 'imageText'
  | 'textImage'
  | 'faq'
  | 'cta';

export type ColumnLayout = 1 | 2 | 3 | 4;

export type TextAlign = 'left' | 'center' | 'right' | 'justify';
export type SpacingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type FontSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
export type BlockSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'small' | 'medium' | 'large' | 'extra-large';
export type FontWeight = 'normal' | 'medium' | 'semibold' | 'bold';
export type FontStyle = 'normal' | 'italic';
export type TextDecoration = 'none' | 'underline';
export type ImageFit = 'contain' | 'cover';

export interface BlockStyle {
  backgroundColor?: string;
  textColor?: string;
  headingColor?: string;
  fontFamily?: 'sans' | 'serif' | 'mono';
  fontSize?: FontSize;
  textAlign?: TextAlign;
  fontWeight?: FontWeight;
  fontStyle?: FontStyle;
  textDecoration?: TextDecoration;
  headingWeight?: FontWeight;
  padding?: SpacingSize;
  margin?: SpacingSize;
  blockSpacing?: BlockSpacing;
  borderRadius?: SpacingSize;
  borderColor?: string;
  hasBorder?: boolean;
  hasShadow?: boolean;
  imageFit?: ImageFit;
  // Propriedades adicionais para resolver erros
  backgroundImage?: string;
  backgroundPosition?: string;
  backgroundSize?: string;
  lineHeight?: string;
  borderWidth?: string;
  boxShadow?: string;
}

export interface BlockBase {
  id: string;
  type: BlockType;
  title: string;
  columns: ColumnLayout;
  visible: boolean;
  style?: BlockStyle;
}

export interface HeroBlock extends BlockBase {
  type: 'hero';
  heading: string;
  subheading: string;
  backgroundImage?: string;
  buttonText?: string;
  buttonUrl?: string;
  image?: {
    src: string;
    alt: string;
  };
}

export interface FeaturesBlock extends BlockBase {
  type: 'features';
  heading: string;
  features: {
    id: string;
    title: string;
    description: string;
    icon?: string;
  }[];
}

export interface BenefitsBlock extends BlockBase {
  type: 'benefits';
  heading: string;
  benefits: {
    id: string;
    title: string;
    description: string;
    icon?: string;
  }[];
}

export interface SpecificationsBlock extends BlockBase {
  type: 'specifications';
  heading: string;
  specs: {
    id: string;
    name: string;
    value: string;
  }[];
}

export interface TextBlock extends BlockBase {
  type: 'text';
  heading: string;
  content: string;
}

export interface ImageBlock extends BlockBase {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
}

export interface GalleryBlock extends BlockBase {
  type: 'gallery';
  images: {
    id: string;
    src: string;
    alt: string;
    caption?: string;
  }[];
}

export interface ImageTextBlock extends BlockBase {
  type: 'imageText';
  image: {
    src: string;
    alt: string;
  };
  heading: string;
  content: string;
}

export interface TextImageBlock extends BlockBase {
  type: 'textImage';
  image: {
    src: string;
    alt: string;
  };
  heading: string;
  content: string;
}

export interface FAQBlock extends BlockBase {
  type: 'faq';
  heading: string;
  questions: {
    id: string;
    question: string;
    answer: string;
  }[];
}

export interface CTABlock extends BlockBase {
  type: 'cta';
  heading: string;
  content: string;
  buttonText: string;
  buttonUrl?: string;
}

export type Block = 
  | HeroBlock 
  | FeaturesBlock 
  | BenefitsBlock 
  | SpecificationsBlock 
  | TextBlock 
  | ImageBlock 
  | GalleryBlock
  | ImageTextBlock
  | TextImageBlock
  | FAQBlock
  | CTABlock;

export interface ProductDescription {
  id: string;
  name: string;
  blocks: Block[];
  createdAt: string;
  updatedAt: string;
}

export type ProductCategory = 
  | 'supplements' 
  | 'clothing' 
  | 'accessories' 
  | 'shoes' 
  | 'electronics' 
  | 'energy' 
  | 'other';

export interface Template {
  id: string;
  name: string;
  category: ProductCategory;
  blocks: Block[];
  thumbnail?: string;
}
