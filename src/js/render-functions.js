export function renderImages(images) {
  // Получаем ссылку на контейнер галереи
  const galleryContainer = document.getElementById('gallery');

  // Очищаем контейнер галереи
  galleryContainer.innerHTML = '';

  // Перебираем массив изображений
  images.forEach(image => {
    // Создаем элемент img для каждого изображения
    const imageElement = document.createElement('img');
    imageElement.src = image.url;
    imageElement.alt = image.title;

    // Добавляем элемент img в контейнер галереи
    galleryContainer.appendChild(imageElement);
  });
}

export function clearGallery() {
  // Получаем ссылку на контейнер галереи
  const galleryContainer = document.getElementById('gallery');

  // Очищаем контейнер галереи
  galleryContainer.innerHTML = '';
}
