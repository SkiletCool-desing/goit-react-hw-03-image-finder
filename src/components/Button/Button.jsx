import css from './Button.module.css';
export const Button = ({ addPhotos }) => {
  return (
    <button type="button" onClick={addPhotos} className={css.Button}>
      Load More
    </button>
  );
};
