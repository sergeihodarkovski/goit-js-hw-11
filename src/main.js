import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api';
import { renderGallery, clearGallery } from './js/render-functions.js';

const form = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const gallery = document.getElementById('gallery');
const loadingIndicator = document.querySelector('.loader');

form.addEventListener('submit', event => {
  event.preventDefault();

  const searchTerm = searchInput.value.trim();

  if (searchTerm === '') {
    iziToast.error({
      message: 'Пожалуйста, введите ключевое слово для поиска.',
    });
    return;
  }

  clearGallery(gallery);
  showLoadingIndicator();

  fetchImages(searchTerm)
    .then(images => {
      if (images.length === 0) {
        iziToast.info({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      } else {
        renderGallery(gallery, images);
        initializeLightbox();
      }
    })
    .catch(error => {
      console.error('Ошибка при загрузке изображений:', error);
      iziToast.error({
        message:
          'Не удалось загрузить изображения. Пожалуйста, попробуйте позже.',
      });
    })
    .finally(() => {
      hideLoadingIndicator();
    });
});

function showLoadingIndicator() {
  loadingIndicator.classList.remove('hidden');
}

function hideLoadingIndicator() {
  loadingIndicator.classList.add('hidden');
}

function initializeLightbox() {
  const lightbox = new SimpleLightbox('.gallery a', {});
  lightbox.refresh();
}
