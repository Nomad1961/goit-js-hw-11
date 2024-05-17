import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from './js/pixabay-api.js';
import { displayImages } from './js/render-functions.js';

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const loader = document.querySelector('.loader');

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
      displayImages(images);

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

// -----------close_buttom-------------------------

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

// preview-next=====================

let currentIndex = 0;
let totalImages = 0;
let images = [];

function showGalleryNavigation() {
  const prevNav = document.querySelector('.gallery-nav-prev');
  const nextNav = document.querySelector('.gallery-nav-next');

  prevNav.style.display = currentIndex > 0 ? 'block' : 'none';
  nextNav.style.display = currentIndex < totalImages - 1 ? 'block' : 'none';
}

document
  .querySelectorAll('.gallery-nav-prev, .gallery-nav-next')
  .forEach(nav => {
    nav.addEventListener('click', () => {
      if (nav.classList.contains('gallery-nav-prev')) {
        currentIndex = Math.max(currentIndex - 1, 0);
      } else {
        currentIndex = Math.min(currentIndex + 1, totalImages - 1);
      }
      showModal(currentIndex);
      showGalleryNavigation();
    });
  });

document.getElementById('modal-img').addEventListener('mouseover', () => {
  document
    .querySelectorAll('.gallery-nav-prev, .gallery-nav-next')
    .forEach(nav => {
      nav.style.display = 'none';
    });
});

document.getElementById('modal-img').addEventListener('mouseout', () => {
  document
    .querySelectorAll('.gallery-nav-prev, .gallery-nav-next')
    .forEach(nav => {
      nav.style.display = 'block';
    });
});
function addImagesToGallery(imageData) {
  const gallery = document.getElementById('gallery');
  images = imageData;
  totalImages = images.length;

  images.forEach((image, index) => {
    const img = document.createElement('img');
    img.src = image.src;
    img.alt = image.alt;
    img.addEventListener('click', () => {
      showModal(index);
    });
    gallery.appendChild(img);
  });

  showGalleryNavigation();
}

addImagesToGallery(imageData);
