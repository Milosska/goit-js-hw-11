import { fetchPhotos } from './js/fetchPhotos';
import galleryMarkup from './templates/gallery-markup.hbs';
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
      console.log(hits);

      galleryEl.insertAdjacentHTML('beforeend', makePhotosMarkup(hits));
    })
    .catch(err => console.log(err));
}

function makePhotosMarkup(arr) {
  return galleryMarkup(arr);
}
