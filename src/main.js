import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import { createGallery } from './js/render-functions';
import { clearGallery } from './js/render-functions';
import { showLoader } from './js/render-functions';
import { hideLoader } from './js/render-functions';

import errorIcon from '/img/err.svg';

const input = document.querySelector('input');
const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const requestKey = input.value.trim();

  if (!requestKey) {
    iziToast.warning({
      message: 'Please enter a search query.',
      iconUrl: errorIcon,
      iconColor: '#fff',
      messageColor: '#fff',
      position: 'topRight',
      messageSize: '16px',
      backgroundColor: ' #EF4040',
    });
    return;
  }
  clearGallery();
  showLoader();
  getImagesByQuery(requestKey)
    .then(response => {
      if (response.totalHits === 0) {
        iziToast.warning({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          iconUrl: errorIcon,
          iconColor: '#fff',
          messageColor: '#fff',
          position: 'topRight',
          messageSize: '16px',
          backgroundColor: ' #EF4040',
        });
        hideLoader();
      } else createGallery(response.hits);
    })
    .catch(err => {
      iziToast.error({
        message: 'Error',
        position: 'topRight',
      });
      console.log(err);
    })
    .finally(() => {
      hideLoader();
    });
});
