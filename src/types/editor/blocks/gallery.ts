
import { BlockBase } from '../base';

export interface GalleryBlock extends BlockBase {
  type: 'gallery';
  images: {
    id: string;
    src: string;
    alt: string;
    caption?: string;
  }[];
}
