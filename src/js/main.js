import { searchImages } from './pixabay-api';
import { renderImages } from './render-functions';
import './css-loader/dist/css-loader.min.css';

let searchQuery = '';

const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  searchQuery = document.getElementById('search-input').value.trim();
  if (!searchQuery) {
    Toast.error('Please enter a search query');
    return;
  }

  const loadingIndicator = document.getElementById('loading-indicator');
  loadingIndicator.style.display = 'block';

  try {
    const images = await searchImages(searchQuery);
    renderImages(images);
  } catch (error) {
    console.error('Error while rendering images:', error);
  } finally {
    loadingIndicator.style.display = 'none';
  }
});
