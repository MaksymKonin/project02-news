import markupCard from './markupCard';
import { refs } from './refs';
//ф-я рендер всих карток новин
function renderNews(paginationPage) {
  if (!paginationPage || paginationPage?.length === 0) {
    return;
  }
  let cards = paginationPage
    .map(Data => {
      return markupCard(Data);
    })
    .join('');
  refs.containerCardEl.insertAdjacentHTML('beforeend', cards);
}
// створення карточки без новин
function createCardNotFound() {
  refs.weatherCard?.classList.add('is-display-none');
  const card = `<div class="not-found-container"><h1 class="not-found-title">We haven’t found news from <br/> this category</h1>
  <div class="not-found-img"></div></div>`;
  refs.containerCardEl.insertAdjacentHTML('beforeend', card);
}
//ф-я очистки контейнера новин
function clearMarkupNews() {
  if (refs.weatherCard?.classList.contains('is-display-none')) {
    refs.weatherCard?.classList.remove('is-display-none');
  }
  if (document.querySelector('.not-found-container')) {
    document.querySelector('.not-found-container').remove();
  }
  const cards = document.querySelectorAll('.js-card');
  cards.forEach(card => {
    card.remove();
  });
}

export { renderNews, createCardNotFound, clearMarkupNews };
