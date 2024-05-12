import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { Toast } from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const renderImages = async images => {
  const galleryContainer = document.getElementById('gallery');
  galleryContainer.innerHTML = '';

  if (!images || images.length === 0) {
    Toast.error(
      'Sorry, there are no images matching your search query. Please try again!'
    );
    return;
  }

  images.forEach(image => {
    const imageHTML = `
      <a href="${image.largeImageURL}" data-lightbox="gallery">
        <img src="${image.webformatURL}" alt="${image.tags}" />
      </a>
    `;
    galleryContainer.insertAdjacentHTML('beforeend', imageHTML);
  });

  SimpleLightbox.refresh();
};

export { renderImages };
