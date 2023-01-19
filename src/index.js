import { fetchPhotos } from './js/fetchPhotos';
import galleryMarkup from './templates/gallery-markup.hbs';
import Notiflix from 'notiflix';

const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');
let currentPage = 1;
let query = '';
let viewedImg = 0;

formEl.addEventListener('submit', onFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadBtnClick);

function onFormSubmit(e) {
  e.preventDefault();
  galleryEl.innerHTML = '';
  currentPage = 1;
  query = formEl.children[0].value.trim();

  if (query.length === 0) {
    return Notiflix.Notify.failure('Please, enter a query.');
  }

  fetchPhotos(query, currentPage)
    .then(({ hits, totalHits }) => {
      if (hits.length === 0) {
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      galleryEl.insertAdjacentHTML('beforeend', makePhotosMarkup(hits));
      enableBtn(loadMoreBtnEl);
      viewedImg += hits.length;
    })
    .catch(err => console.log(err));

  currentPage += 1;
}

function onLoadBtnClick() {
  disableBtn(loadMoreBtnEl);
  fetchPhotos(query, currentPage)
    .then(({ hits, totalHits }) => {
      galleryEl.insertAdjacentHTML('beforeend', makePhotosMarkup(hits));
      enableBtn(loadMoreBtnEl);
      viewedImg += hits.length;

      if (totalHits === viewedImg) {
        disableBtn(loadMoreBtnEl);
        return Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(err => console.log(err));
  currentPage += 1;
}

function makePhotosMarkup(arr) {
  return galleryMarkup(arr);
}

function enableBtn(btn) {
  btn.removeAttribute('hidden');
}

function disableBtn(btn) {
  btn.setAttribute('hidden', true);
}
