
import { BlockBase } from '../base';

export interface CarouselImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface CarouselBlock extends BlockBase {
  type: 'carousel';
  images: CarouselImage[];
  autoplay: boolean;
  autoplaySpeed: number;
  showArrows: boolean;
  showDots: boolean;
  infinite: boolean;
}
