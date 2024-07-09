import { IImage } from '../../api/api.types';

export interface ImageCardProps {
  image: IImage;
  openModal: (image: IImage) => void;
}
