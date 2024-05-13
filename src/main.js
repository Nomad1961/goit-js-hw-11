import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { fetchImages } from './pixabay-api.js';
import { renderImages, clearGallery } from './render-functions.js';

const searchForm = document.querySelector('#search-form');
const loader = document.querySelector('.loader');

searchForm.addEventListener('submit', async e => {
  e.preventDefault();

  const searchInput = document.querySelector('#search-input');
  const searchQuery = searchInput.value.trim();

  if (searchQuery === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term',
    });
    return;
  }

  clearGallery();
  loader.style.display = 'block';

  try {
    const images = await fetchImages(searchQuery);
    if (images.length === 0) {
      iziToast.info({
        title: 'Info',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      renderImages(images);
      const lightbox = new SimpleLightbox('.gallery a');
      lightbox.refresh();
    }
  } catch (error) {
    console.error(error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again.',
    });
  } finally {
    loader.style.display = 'none';
  }
});
