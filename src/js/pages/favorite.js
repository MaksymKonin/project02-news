import setNewActiveLink from '../currentLink';
import changeTheme from '../changeTheme';
import LocalStorageService from '../localStorage';
import changeStatusNews from '../changeStatusNews';
import { renderNews, createCardNotFound, clearMarkupNews } from '../renderNews';
import { refs } from '../refs';
refs.containerCardEl.addEventListener('click', onClick);
const localStorageService = new LocalStorageService();
const favoriteNews = localStorageService.load(
  localStorageService.FAVORITES_NEWS
);

setNewActiveLink();
changeTheme();
clearMarkupNews();
createFavoriteNews(favoriteNews);

function onClick(evt) {
  if (evt.target.nodeName === 'BUTTON') location.reload();
}

function createFavoriteNews(favoriteNews) {
  if (!favoriteNews || favoriteNews?.length === 0) {
    createCardNotFound();
    return;
  }
  renderNews(favoriteNews);
  changeStatusNews(favoriteNews);
}
