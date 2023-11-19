import axios from 'axios';

const KEY = '38947314-3ea86442702c66f116a43faf4';

export const getImages = async (value, page) => {
  const { data } = await axios.get(
    `https://pixabay.com/api/?q=${value}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return data;
};

// return data.hits.map(image => {
//   return {
//     id: image.id,
//     webformatURL: image.webformatURL,
//     largeImageURL: image.largeImageURL,
//     tags: image.tags,
//   };
// });
