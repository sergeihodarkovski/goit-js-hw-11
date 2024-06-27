export function createImageCard(image) {
  return `
    <a href="${image.largeImageURL}" class="gallery-item">
      <img src="${image.webformatURL}" alt="${image.tags}" />
      <div class="info">
        <p><strong>Likes:</strong> ${image.likes}</p>
        <p><strong>Views:</strong> ${image.views}</p>
        <p><strong>Comments:</strong> ${image.comments}</p>
        <p><strong>Downloads:</strong> ${image.downloads}</p>
      </div>
    </a>
  `;
}

export function renderGallery(images) {
  const gallery = document.querySelector('.gallery[data-gallery]');
  gallery.innerHTML = images.map(createImageCard).join('');
}

export function clearGallery(gallery) {
  gallery.innerHTML = '';
}
