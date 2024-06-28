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
      message: 'Please enter a search keyword.',
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
            'Sorry, no images matching your search query were found. Please try again!',
        });
      } else {
        renderGallery(images);
        initializeLightbox();
        searchInput.value = '';
      }
    })
    .catch(error => {
      console.error('Error loading images:', error);
      iziToast.error({
        message: 'Failed to load images. Please try again later.',
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
