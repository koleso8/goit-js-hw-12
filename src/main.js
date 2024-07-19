import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { searchImages } from './js/pixabay-api';
import { innerImg, insertImg } from './js/render-functions';

const refs = {
  btnSubEl: document.querySelector('.btn-search'),
  formEl: document.querySelector('.form'),
  input: document.querySelector('[name="text"]'),
  ul: document.querySelector('ul'),
  btnLoadMore: document.querySelector('.load-more'),
};

let limitPage = 0;
let userValue;
let page = 1;

refs.formEl.addEventListener('submit', async evt => {
  try {
    evt.preventDefault();
    startLoader();
    userValue = refs.input.value.trim();
    page = 1;

    if (!userValue) iziError();
    else {
      const res = await searchImages(userValue, page);

      limitPage = Math.ceil(res.totalHits / 15);
      if (res.hits.length === 0) {
        iziNotFound();
      }
      innerImg(res.hits);
      scrollBy(75);
      const lightbox = new simpleLightbox('.gallery a');

      refs.btnLoadMore.classList.remove('visually-hidden');

      refs.formEl.addEventListener('click', e => {
        if (e.target.name !== 'text') return;
        refs.input.value = '';
      });
    }
  } catch (error) {
    console.log(error.message);
  }
  stopLoader();
});

refs.btnLoadMore.addEventListener('click', async () => {
  refs.btnLoadMore.classList.add('visually-hidden');
  startLoader();
  if (page === limitPage) {
    refs.btnLoadMore.classList.add('visually-hidden');
    stopLoader();
    return iziInfo();
  }
  page += 1;
  const res = await searchImages(userValue, page);
  insertImg(res.hits);
  const lightbox = new simpleLightbox('.gallery a');
  lightbox.refresh();
  stopLoader();
  scrollBy();
  refs.btnLoadMore.classList.remove('visually-hidden');
});

function iziError() {
  return iziToast.error({
    message: 'Please fill in the input field',
    position: 'topRight',
  });
}
function iziNotFound() {
  iziToast.error({
    message: 'Image is not found',
    position: 'topRight',
  });
}
function iziInfo() {
  iziToast.info({
    message: "We're sorry, but you've reached the end of search results",
    position: 'topRight',
  });
}
function startLoader() {
  refs.btnLoadMore.insertAdjacentHTML(
    'afterend',
    '<div id="loader" class="loader"></div>',
  );
}
function stopLoader() {
  document.querySelector('.loader').remove();
}

function scrollBy(val) {
  const imgHeight = refs.ul.firstElementChild.getBoundingClientRect().height;
  window.scrollBy({
    top: val || imgHeight * 2,
    behavior: 'smooth',
  });
}
