export interface BaseBlock {
  id: string;
  type: string;
  title: string;
  columns: number;
  visible: boolean;
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
  buttonText: string;
  buttonUrl: string;
  backgroundImage: string;
}

// Text Block
export interface TextBlock extends BaseBlock {
  type: 'text';
  content: string;
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
}

// Specifications Block
export interface SpecificationsBlock extends BaseBlock {
  type: 'specifications';
  heading: string;
  specifications: {
    id: string;
    name: string;
    value: string;
  }[];
}

// Image Block
export interface ImageBlock extends BaseBlock {
  type: 'image';
  imageUrl: string;
  altText: string;
}

// Gallery Block
export interface GalleryBlock extends BaseBlock {
  type: 'gallery';
  images: {
    id: string;
    imageUrl: string;
    altText: string;
  }[];
}

// Image + Text Block
export interface ImageTextBlock extends BaseBlock {
  type: 'imageText';
  imageUrl: string;
  altText: string;
  content: string;
}

// Text + Image Block
export interface TextImageBlock extends BaseBlock {
  type: 'textImage';
  imageUrl: string;
  altText: string;
  content: string;
}

// FAQ Block
export interface FAQBlock extends BaseBlock {
  type: 'faq';
  questions: {
    id: string;
    question: string;
    answer: string;
  }[];
}

// CTA Block
export interface CTABlock extends BaseBlock {
  type: 'cta';
  heading: string;
  subheading: string;
  buttonText: string;
  buttonUrl: string;
}

// Video Block
export interface VideoBlock extends BaseBlock {
  type: 'video';
  videoUrl: string;
  description: string;
}
