import axios from 'axios';

const API_KEY = '39085850-22ba7d8df6e098b6440144e47';

export const getImages = async (keyWord, page) => {
  const { data } = await axios.get(
    `https://pixabay.com/api/?q=${keyWord}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
};
