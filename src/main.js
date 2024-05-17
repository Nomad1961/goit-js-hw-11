// main.js
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// import iziToast from 'izitoast';
import { fetchImages } from './js/pixabay-api.js';
import { displayImages } from './js/render-functions.js';
// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

// import SimpleLightbox from 'simplelightbox';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

const lightbox = new SimpleLightbox('.simplelightbox a', {
  elements: '.simplelightbox',
  closeText: 'Закрыть',
  docClose: true,
});

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
      closeText: 'Закрыть',
      docClose: true,
    });
    lightbox.refresh();
  }
});
// ===========индикатор загрузки==========================

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();

  gallery.innerHTML = '';

  const loader = document.querySelector('.loader');
  loader.style.display = 'block';

  if (searchTerm === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term.',
    });
  } else {
    try {
      const images = await fetchImages(searchTerm);
      displayImages(images);
      // ---------------------------------------------------------
      // const lightbox = new SimpleLightbox('.simplelightbox a', {
      //   elements: '.simplelightbox',
      //   closeText: 'Закрыть',
      //   docClose: true,
      // });
      // ---------------------------------------------------
      lightbox.refresh();
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: 'An error occurred while fetching images. Please try again.',
      });
    } finally {
      loader.style.display = 'none';
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
  const prevNav = document.querySelector('.gallery-nav.prev');
  const nextNav = document.querySelector('.gallery-nav.next');

  prevNav.style.display = currentIndex > 0 ? 'block' : 'none';
  nextNav.style.display = currentIndex < totalImages - 1 ? 'block' : 'none';
}

document.querySelectorAll('.gallery-nav').forEach(nav => {
  nav.addEventListener('click', () => {
    if (nav.classList.contains('prev')) {
      currentIndex = Math.max(currentIndex - 1, 0);
    } else {
      currentIndex = Math.min(currentIndex + 1, totalImages - 1);
    }
    showModal(currentIndex);
    showGalleryNavigation();
  });
});

function showModal(index) {
  const modal = document.getElementById('modal');
  const modalImage = document.getElementById('modalImage');
  const caption = document.getElementById('caption');

  modal.style.display = 'block';
  modalImage.src = images[index].src;
  caption.textContent = images[index].alt;

  showGalleryNavigation();
}

document.getElementById('modalImage').addEventListener('mouseover', () => {
  document.querySelectorAll('.gallery-nav').forEach(nav => {
    nav.style.display = 'block';
  });
});

document.getElementById('modalImage').addEventListener('mouseout', () => {
  document.querySelectorAll('.gallery-nav').forEach(nav => {
    nav.style.display = 'none';
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
