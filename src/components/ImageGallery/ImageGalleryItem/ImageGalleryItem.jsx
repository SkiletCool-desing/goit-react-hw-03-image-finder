import css from './ImageGalleryItem.module.css';
export const ImageGalleryItem = ({ preview, largeImage, tag, tgModal }) => {
  return (
    <li className={css.ImageGalleryItem} onClick={() => tgModal(largeImage)}>
      <img src={preview} alt={tag} className={css.ImageGalleryItem_image} />
    </li>
  );
};
