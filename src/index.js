import { fetchPhotos } from './js/fetchPhotos';
import Notiflix from 'notiflix';

const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
let currentPage = 1;

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const query = formEl.children[0].value;

  fetchPhotos(query, currentPage)
    .then(({ hits, total }) => {
      if (hits.length === 0) {
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      Notiflix.Notify.success(`Hooray! We found ${total} images.`);

      galleryEl.insertAdjacentHTML('beforeend', makePhotosMarkup(hits));
    })
    .catch(err => console.log(err));
}

function makePhotosMarkup(arr) {
  return arr
    .map(({ webformatURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div>`;
    })
    .join('');
}
