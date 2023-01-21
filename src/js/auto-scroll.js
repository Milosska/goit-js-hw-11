const autoScrollBtnEl = document.querySelector('.auto-scroll-btn');
const startEl = document.querySelector('.start-scroll');
const stopEl = document.querySelector('.stop-scroll');

autoScrollBtnEl.addEventListener('click', onAutoScrollClick);
document.addEventListener('scroll', addAutoscrollFunc);

function addAutoscrollFunc() {
  if (document.querySelector('.gallery').children.length >= 12) {
    autoScrollBtnEl.removeAttribute('hidden');
  }
}

function onAutoScrollClick(e) {
  if (stopEl.hasAttribute('hidden')) {
    document.addEventListener('scroll', startScroll);
    startEl.setAttribute('hidden', true);
    stopEl.removeAttribute('hidden');
  } else if (startEl.hasAttribute('hidden')) {
    document.removeEventListener('scroll', startScroll);
    window.scrollBy({
      top: 0,
    });
    stopEl.setAttribute('hidden', true);
    startEl.removeAttribute('hidden');
  }
}

function startScroll() {
  //   const { height: cardHeight } = document
  //     .querySelector('.gallery')
  //     .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: 5000,
    behavior: 'smooth',
  });
}
