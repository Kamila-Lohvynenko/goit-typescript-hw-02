import { IImage } from '../../api/api.types';

export interface ImageModalProps {
  isOpen: boolean;
  closeModal: () => void;
  selectedImage: IImage | null;
}
