// main.js
import iziToast from 'izitoast';
import { fetchImages } from './js/pixabay-api.js';
import { displayImages } from './js/render-functions.js';
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
// =====================================
// Добавляем обработку индикатора загрузки перед и после запроса к бекенду
searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();

  // Очищаем предыдущие результаты поиска
  gallery.innerHTML = '';

  // Показываем индикатор загрузки
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
      // Скрываем индикатор загрузки после завершения запроса
      loader.style.display = 'none';
    }
  }
});
/
