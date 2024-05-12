import { fetchImages } from './pixabay-api.js';
import { displayImages } from './render-functions.js';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const loader = document.querySelector('.loader');

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  const searchQuery = searchInput.value.trim();

  if (searchQuery === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search keyword',
    });
    return;
  }

  loader.style.display = 'block';

  try {
    const images = await fetchImages(searchQuery);
    displayImages(images);
  } catch (error) {
    console.error(error);
  } finally {
    loader.style.display = 'none';
  }
});
