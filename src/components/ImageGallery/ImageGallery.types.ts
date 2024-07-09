import { IImage } from '../../api/api.types';

export interface ImageGalleryProps {
  images: IImage[];
  openModal: (image: IImage) => void;
}
