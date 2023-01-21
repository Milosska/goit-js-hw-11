import { fetchPhotos } from './js/fetchPhotos';
import './js/auto-scroll';
import galleryMarkup from './templates/gallery-markup.hbs';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const onTopBtnEl = document.querySelector('.on-top');

let lightbox = new SimpleLightbox('.gallery a');
let currentPage = 1;
let query = '';
let viewedImg = 0;

formEl.addEventListener('submit', onFormSubmit);
galleryEl.addEventListener('click', onCardClick);
onTopBtnEl.addEventListener('click', onUpScrollBtnClick);

function onFormSubmit(e) {
  e.preventDefault();
  galleryEl.innerHTML = '';
  disableBtn(onTopBtnEl);
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
      makePhotosMarkup(hits);
    })
    .catch(err => console.log(err));

  currentPage += 1;
}

function onCardClick(e) {
  e.preventDefault();
  lightbox.open(e.currentTarget);
}

function makePhotosMarkup(arr) {
  galleryEl.insertAdjacentHTML('beforeend', galleryMarkup(arr));
  lightbox.refresh();
  viewedImg += arr.length;

  if (arr.length < 40) {
    return;
  }

  observer.observe(galleryEl.lastElementChild);
  // enableBtn(loadMoreBtnEl);
}

function onUpScrollBtnClick() {
  let yOffset = window.pageYOffset;
  if (yOffset > 0) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}

// ============== Code Infinite Scroll Initiation =============
const observerOptions = {
  root: null,
  rootMargin: '1000px',
  threshold: 0,
};
let observer = new IntersectionObserver(onScrollDownload, observerOptions);

function onScrollDownload(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting === true) {
      fetchPhotos(query, currentPage)
        .then(({ hits, totalHits }) => {
          makePhotosMarkup(hits);
          enableBtn(onTopBtnEl);

          if (totalHits === viewedImg) {
            observer.unobserve(galleryEl.lastElementChild);
            return Notiflix.Notify.info(
              "We're sorry, but you've reached the end of search results."
            );
          }
        })
        .catch(err => console.log(err));
      currentPage += 1;

      let yOffset = window.pageYOffset;
      console.log(yOffset);
    }
  });
}

// ============== Code for Load Btn Initiation =============

// const loadMoreBtnEl = document.querySelector('.load-more');

// loadMoreBtnEl.addEventListener('click', onLoadBtnClick);

// function onLoadBtnClick() {
//   disableBtn(loadMoreBtnEl);
//   fetchPhotos(query, currentPage)
//     .then(({ hits, totalHits }) => {
//       makePhotosMarkup(hits);
//       if (totalHits === viewedImg) {
//         disableBtn(loadMoreBtnEl);
//         return Notiflix.Notify.info(
//           "We're sorry, but you've reached the end of search results."
//         );
//       }
//     })
//     .catch(err => console.log(err));
//   currentPage += 1;
// }

function enableBtn(btn) {
  btn.removeAttribute('hidden');
}

function disableBtn(btn) {
  btn.setAttribute('hidden', true);
}
