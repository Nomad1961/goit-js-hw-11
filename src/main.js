// main.js
import iziToast from 'izitoast';
import { fetchImages } from './api/pixabay-api.js';
import { displayImages } from './render-functions.js';
import SimpleLightbox from 'simplelightbox';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();

  if (searchTerm === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term.',
    });
  } else {
    const images = await fetchImages(searchTerm);
    displayImages(images);

    const lightbox = new SimpleLightbox('.simplelightbox a', {
      elements: '.simplelightbox',
      closeText: 'Закрыть', // Fixed typo in the closeText property
      docClose: true,
    });
    lightbox.refresh();
  }
});
