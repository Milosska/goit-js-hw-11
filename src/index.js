import { fetchPhotos } from './js/fetchPhotos';
import Notiflix from 'notiflix';

const formEl = document.querySelector('.search-form');

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const query = formEl.children[0].value;

  fetchPhotos(query)
    .then(res => {
      if (res.length === 0) {
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      //   Notiflix.Notify.success(`Hooray! We found totalHits images.`);
      console.log(res);
    })
    .catch(err => console.log(err));
}
