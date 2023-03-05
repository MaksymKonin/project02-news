import markupCard from './markupCard';
import { refs } from './refs';
//ф-я рендер всих карток новин
function renderNews(normalizedData) {
  let cards = normalizedData
    .map(Data => {
      return markupCard(Data);
    })
    .join('');
  refs.containerCardEl.insertAdjacentHTML('beforeend', cards);
}
// створення карточки без новин
function createCardNotFound() {
  card = `<div class="not-found-container"><h1 class="not-found-title">We haven’t found news from this category</h1>
  <img class="not-found-img" src="./images/News.jpg" alt="photo news" /></div>`;
  refs.containerCardEl.insertAdjacentHTML('beforeend', card);
}
//ф-я очистки контейнера новин
function clearMarkupNews() {
  const cards = document.querySelectorAll('.news-card-marker');
  cards.forEach(card => card.remove());
}

export { renderNews, createCardNotFound, clearMarkupNews };
