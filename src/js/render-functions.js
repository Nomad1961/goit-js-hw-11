import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

export function displayImages(images) {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';

  if (images.length === 0) {
    iziToast.error({
      title: 'Error',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
  } else {
    images.forEach(image => {
      const imageCard = document.createElement('div');
      imageCard.classList.add('image-card');

      gallery.appendChild(imageCard);
    });

    new SimpleLightbox('.gallery a');
  }
}
