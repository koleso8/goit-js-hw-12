import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { searchImages } from './js/pixabay-api';

const refs = {
  btnSubEl: document.querySelector('.btn-search'),
  formEl: document.querySelector('.form'),
  input: document.querySelector('[name="text"]'),
  ul: document.querySelector('ul'),
  btnLoadMore: document.querySelector('.load-more'),
};

let userValue;
let page = 1;

refs.formEl.addEventListener('submit', evt => {
  evt.preventDefault();
  userValue = refs.input.value.trim();
  page = 1;
  if (userValue) {
    searchImages(userValue, page);
    document.querySelector('.load-more').classList.remove('visually-hidden');
    refs.formEl.addEventListener('click', e => {
      if (e.target.name !== 'text') return;
      refs.input.value = '';
    });
  } else {
    iziToast.error({
      message: 'Please fill in the input field',
      position: 'topRight',
    });
  }
});

refs.btnLoadMore.addEventListener('click', () => {
  page += 1;
  console.log(page);
  searchImages(userValue, page);
});
