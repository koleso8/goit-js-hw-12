import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { innerImg } from './render-functions';
import { insertImg } from './render-functions';

import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import axios from 'axios';

function startLoader() {
  document
    .querySelector('.gallery')
    .insertAdjacentHTML('afterend', '<div id="loader" class="loader"></div>');
}
function endLoader() {
  document.querySelector('.loader').remove();
}

export function searchImages(value, page) {
  startLoader(); //_________________________loader_start

  const baseUrl = 'https://pixabay.com/api/';
  //__________________________________________________________________________________________params
  const params = {
    params: {
      key: '44959261-ea439a2adbf8f7e5770dfe1a3',
      q: value,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page,
    },
  };

  axios
    .get(baseUrl, params)
    .then(response => {
      if (!response) {
        throw new Error(response.status);
      }
      return response.data;
    })
    .then(response => {
      if (response.total !== 0) {
        if (page > 1) {
          insertImg(response.hits);
        } else {
          const totalPages = Math.ceil(response.totalHits / 15);
          console.log(totalPages);
          if (page < totalPages) {
            innerImg(response.hits);
          } else {
            document
              .querySelector('.load-more')
              .classList.add('visually-hidden');
            iziToast.info({
              message:
                "We're sorry, but you've reached the end of search results",
              position: 'topRight',
            });
          }
        }
        let gallery = new SimpleLightbox('.gallery a');
        gallery.refresh(); //_________________________________????????????????????????
      } else {
        iziToast.error({
          message: 'Image is not found',
          position: 'topRight',
        }); //____________________________________________________iziToast_ERROR
      }
    })
    .catch(error => console.log(error))
    .finally(() => {
      endLoader(); //____________________loader_remove
    });
}
