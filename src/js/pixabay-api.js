import axios from 'axios';

const pixabayAPI = axios.create({
  baseURL: 'https://pixabay.com/api/docs/',
  params: {
    key: '43839854-7e39202c3c35776610ceb4193',

    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  },
});

export const searchImages = async query => {
  try {
    const response = await pixabayAPI.get('search', {
      params: {
        q: query,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error while fetching images:', error);
  }
};
