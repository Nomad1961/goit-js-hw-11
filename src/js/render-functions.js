// render-functions.js
import iziToast from 'izitoast'; // Added import statement for iziToast

export function displayImages(images) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';

  if (images.length === 0) {
    iziToast.error({
      title: 'Error',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
  } else {
    images.forEach(image => {
      const imgElement = document.createElement('img');
      imgElement.src = image.webformatURL;
      imgElement.alt = image.tags;
      imgElement.dataset.largeImage = image.largeImageURL;
      imgElement.dataset.likes = image.likes;
      imgElement.dataset.views = image.views;
      imgElement.dataset.comments = image.comments;
      imgElement.dataset.downloads = image.downloads;
      imgElement.addEventListener('click', showModal);
      gallery.appendChild(imgElement);
    });
  }
}

function showModal(event) {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const caption = document.getElementById('caption');
  const img = event.target;

  modal.style.display = 'block';
  modalImg.src = img.dataset.largeImage;
  caption.textContent = `Likes: ${img.dataset.likes}, Views: ${img.dataset.views}, Comments: ${img.dataset.comments}, Downloads: ${img.dataset.downloads}`;
}
