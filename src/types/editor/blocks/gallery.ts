
import { BlockBase } from '../base';

export interface GalleryBlock extends BlockBase {
  type: 'gallery';
  heading?: string;
  columns?: number | string;
  images: {
    id: string;
    src: string;
    alt: string;
    caption?: string;
  }[];
}
