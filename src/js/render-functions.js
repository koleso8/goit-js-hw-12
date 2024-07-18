const ulEl = document.querySelector('.gallery');

function imgTemplate({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<li class="gallery-item> 
    <figure class="sign">
        <a href="${largeImageURL}"><img class="list-img" src="${webformatURL}" alt="${tags}" title="" width="360" height="200"/></a><span class="title-img">
        <figcaption class="title-img"><ul class="figcaption">
      <li class="figcaption-item">Likes<p class="counter">${likes}</p></li>
      <li class="figcaption-item">Views<p class="counter">${views}</p></li>
      <li class="figcaption-item">Comments<p class="counter">${comments}</p></li>
      <li class="figcaption-item">Downloads<p class="counter">${downloads}</p></li>
    </ul></figcaption>
    </figure>
   </li>`;
}

function imagesTemplate(arr) {
  return arr.map(imgTemplate).join('');
}

export function renderImg(hits) {
  const markup = imagesTemplate(hits);
  ulEl.insertAdjacentHTML('beforeend', markup);
}
