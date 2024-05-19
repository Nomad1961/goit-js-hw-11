import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api.js';
import { displayImages } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const loader = document.querySelector('.loader');
const gallery = document.getElementById('gallery');

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();

  loader.style.display = 'block';

  if (searchTerm === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term.',
    });
    loader.style.display = 'none';
  } else {
    try {
      const images = await fetchImages(searchTerm);
      displayImages(images, gallery);

      const lightbox = new SimpleLightbox('.simplelightbox a', {
        elements: '.simplelightbox',
        closeText: 'Закрыть',
        docClose: true,
      });
      lightbox.refresh();
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: 'An error occurred while fetching images. Please try again.',
      });
    } finally {
      loader.style.display = 'none';
      searchInput.value = '';
    }
  }
});

const closeButton = document.querySelector('.close-button');
const modal = document.getElementById('modal');

closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', event => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});
