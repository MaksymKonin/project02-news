import setNewActiveLink from '../currentLink';
import changeTheme from '../changeTheme';
import LocalStorageService from '../localStorage';
import changeStatusNews from '../changeStatusNews';
import { renderNews, createCardNotFound, clearMarkupNews } from '../renderNews';
import { refs } from '../refs';
refs.containerCardEl.addEventListener('click', onClick);
setNewActiveLink();
changeTheme();
const localStorageService = new LocalStorageService();
const favoriteNews = localStorageService.load(
  localStorageService.FAVORITES_NEWS
);
if (favoriteNews) {
  clearMarkupNews();
  renderNews(favoriteNews);
  changeStatusNews(favoriteNews);
} else {
  createCardNotFound();
}

function onClick(evt) {
  if (evt.target.nodeName === 'BUTTON') location.reload();
}
