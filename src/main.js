import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

import errorIcon from '/img/err.svg';

const input = document.querySelector('input');
const form = document.querySelector('.form');

function showWarning(message) {
  iziToast.warning({
    message,
    iconUrl: errorIcon,
    iconColor: '#fff',
    messageColor: '#fff',
    position: 'topRight',
    messageSize: '16px',
    backgroundColor: '#EF4040',
  });
}

form.addEventListener('submit', event => {
  event.preventDefault();

  const requestKey = input.value.trim();

  if (!requestKey) {
    showWarning('Please enter a search query.');
    return;
  }
  clearGallery();
  showLoader();
  getImagesByQuery(requestKey)
    .then(response => {
      if (response.totalHits === 0) {
        showWarning(
          'Sorry, there are no images matching your search query. Please try again!'
        );
      } else createGallery(response.hits);
    })
    .catch(error => {
      iziToast.error({
        message: 'Error',
        position: 'topRight',
      });
      console.log(error);
    })
    .finally(() => {
      hideLoader();
      input.value = '';
    });
});
