
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

export interface BlockBase {
  id: string;
  type: BlockType;
  title: string;
  columns: ColumnLayout;
  visible: boolean;
}

export interface HeroBlock extends BlockBase {
  type: 'hero';
  heading: string;
  subheading: string;
  backgroundImage?: string;
  buttonText?: string;
  buttonUrl?: string;
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
  content: string;
}

export interface ImageBlock extends BlockBase {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
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
