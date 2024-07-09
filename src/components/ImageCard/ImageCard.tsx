import css from './ImageCard.module.css';
import { ImageCardProps } from './ImageCard.types';
const ImageCard: React.FC<ImageCardProps> = ({ image, openModal }) => {
  const handleClick = () => {
    openModal(image);
  };
  return (
    <div className={css.wrapper}>
      <img
        className={css.img}
        src={image.urls.small}
        alt={image.alt_description}
        onClick={handleClick}
      />
    </div>
  );
};

export default ImageCard;
