
export interface BaseBlock {
  id: string;
  type: string;
  title: string;
  columns: ColumnLayout;
  visible: boolean;
  style?: BlockStyle;
}

// Adding BlockBase and BlockStyle interfaces
export interface BlockBase extends BaseBlock {
  id: string;
  type: string;
  title: string;
  columns: ColumnLayout;
  visible: boolean;
  style?: BlockStyle;
}

export interface BlockStyle {
  backgroundColor?: string;
  textColor?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  borderWidth?: string;
  borderColor?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: string;
  boxShadow?: string;
  [key: string]: any; // For other custom styles
}

export interface ProductDescription {
  id: string;
  name: string;
  blocks: Block[];
  createdAt: string;
  updatedAt: string;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  blocks: Block[];
}

export type ProductCategory = 'supplements' | 'clothing' | 'accessories' | 'shoes' | 'electronics' | 'energy' | 'other' | string;

export type Block =
  | HeroBlock
  | TextBlock
  | FeaturesBlock
  | BenefitsBlock
  | SpecificationsBlock
  | ImageBlock
  | GalleryBlock
  | ImageTextBlock
  | TextImageBlock
  | FAQBlock
  | CTABlock
  | VideoBlock;

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
  | 'video';

export type ColumnLayout = 1 | 2 | 3 | 4;

// Hero Block
export interface HeroBlock extends BaseBlock {
  type: 'hero';
  heading: string;
  subheading: string;
  buttonText?: string;
  buttonUrl?: string;
  backgroundImage?: string;
  image?: {
    src: string;
    alt: string;
  };
  style?: BlockStyle;
}

// Text Block
export interface TextBlock extends BaseBlock {
  type: 'text';
  heading: string;
  content: string;
  style?: BlockStyle;
}

// Features Block
export interface FeaturesBlock extends BaseBlock {
  type: 'features';
  heading: string;
  features: {
    id: string;
    title: string;
    description: string;
    icon: string;
  }[];
  style?: BlockStyle;
}

// Benefits Block
export interface BenefitsBlock extends BaseBlock {
  type: 'benefits';
  heading: string;
  benefits: {
    id: string;
    title: string;
    description: string;
    icon: string;
  }[];
  style?: BlockStyle;
}

// Specifications Block
export interface SpecificationsBlock extends BaseBlock {
  type: 'specifications';
  heading: string;
  specs: {
    id: string;
    name: string;
    value: string;
  }[];
  style?: BlockStyle;
}

// Image Block
export interface ImageBlock extends BaseBlock {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
  style?: BlockStyle;
}

// Gallery Block
export interface GalleryBlock extends BaseBlock {
  type: 'gallery';
  images: {
    id: string;
    src: string;
    alt: string;
    caption?: string;
  }[];
  style?: BlockStyle;
}

// Image + Text Block
export interface ImageTextBlock extends BaseBlock {
  type: 'imageText';
  image: {
    src: string;
    alt: string;
  };
  heading: string;
  content: string;
  style?: BlockStyle;
}

// Text + Image Block
export interface TextImageBlock extends BaseBlock {
  type: 'textImage';
  image: {
    src: string;
    alt: string;
  };
  heading: string;
  content: string;
  style?: BlockStyle;
}

// FAQ Block
export interface FAQBlock extends BaseBlock {
  type: 'faq';
  heading: string;
  questions: {
    id: string;
    question: string;
    answer: string;
  }[];
  style?: BlockStyle;
}

// CTA Block
export interface CTABlock extends BaseBlock {
  type: 'cta';
  heading: string;
  subheading?: string;
  content: string;
  buttonText: string;
  buttonUrl?: string;
  style?: BlockStyle;
}

// Video Block
export interface VideoBlock extends BaseBlock {
  type: 'video';
  videoUrl: string;
  description: string;
  autoplay?: boolean;
  style?: BlockStyle;
}
