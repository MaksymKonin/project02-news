import { Notify } from 'notiflix/build/notiflix-notify-aio';
import throttle from 'lodash.throttle';
import changeTheme from './js/changeTheme';
import { userPositionConsent, weatherMarkup } from './js/weatherServiceMain';
import { createCalendar } from './js/renderCalendar';
import NewsApiService from './js/newsApiService';
import {
  renderNews,
  createCardNotFound,
  clearMarkupNews,
} from './js/renderNews';
import { createCategories } from './js/renderCategories';
import { refs } from './js/refs';
import {
  getDataForMarkupNews,
  getDataForMarkupPopularNews,
} from './js/getDataForMarkupNews';
import LocalStorageService from './js/localStorage';
const localStorageService = new LocalStorageService();
const newsApiService = new NewsApiService();
import changeStatusNews from './js/changeStatusNews';
let nameRequest = '';

changeTheme();
createCalendar();
renderListCategories();
weatherMarkup();
userPositionConsent(); //run weather according to location
if (localStorageService.loadFilters()) {
  createNewsCategory();
} else createPopularNews();

refs.formEl.addEventListener('submit', throttle(onFormSubmit, 300));
refs.containerCategoriesEl.addEventListener(
  'click',
  throttle(onCategoriesClick, 300)
);
refs.containerPaginationEl.addEventListener(
  'click',
  throttle(onPaginationClick, 300)
);

//ф-я обробка кліку по кнопці форми
function onFormSubmit(evt) {
  evt.preventDefault();
  clearData();
  clearMarkupNews();
  newsApiService.searchQuery =
    evt.currentTarget.elements.searchQuery.value.trim();
  searchNews();
}
//ф-я обробка кліку по категоріям
function onCategoriesClick(evt) {
  evt.preventDefault();
  clearData();
  selectedCategories(evt);
}
//ф-я обробка кліку по пагінації/вибір номера сторінки
function onPaginationClick(evt) {
  evt.preventDefault();
  clearMarkupNews();
  newsApiService.requestNum += 1;
  newsApiService.pageNum = Number(evt.target.innerHTML);
  selectionOptionGetNews();
}

//ф-я запиту новин по назві
async function searchNews(statusPagination) {
  if (statusPagination !== true) {
    clearMarkupNews();
    clearData();
  }

  const response = await newsApiService.getSearchNews();
  try {
    if (response.response.docs.length === 0) {
      createCardNotFound();
      return;
    }
    nameRequest = 'searchNews';
    let data = getDataForMarkupNews(response, newsApiService.pageNum);
    renderNews(data);
    changeStatusNews(data);
  } catch (err) {
    Notify.failure('Sorry, an error occurred, try again later');
  }
}
//ф-я створення популярних новин
async function createPopularNews(statusPagination) {
  if (statusPagination !== true) {
    clearMarkupNews();
    clearData();
  }
  const response = await newsApiService.getPopularNews();
  try {
    if (response.results.length === 0) {
      createCardNotFound();
      return;
    }
    nameRequest = 'popularNews';
    let data = getDataForMarkupNews(response, newsApiService.pageNum);
    renderNews(data);
    changeStatusNews(data);
  } catch (err) {
    Notify.failure('Sorry, an error occurred, try again later');
  }
}

//ф-я запиту новин по категорії
async function createNewsCategory(statusPagination) {
  if (statusPagination !== true) {
    clearMarkupNews();
    clearData();
  }
  let selectedDate = localStorageService.loadDataFilters();
  let selectedCategories = localStorageService.loadCategoriesFilters();
  const response = await newsApiService.getDateAndCategoryNews(
    selectedDate,
    selectedCategories
  );
  try {
    if (response.response.docs.length === 0) {
      createCardNotFound();
      return;
    }
    nameRequest = 'NewsCategory';
    let data = getDataForMarkupNews(response, newsApiService.pageNum);
    renderNews(data);
    changeStatusNews(data);
  } catch (err) {
    Notify.failure('Sorry, an error occurred, try again later');
  }
}
//ф-я рендеру списка категорій
function renderListCategories() {
  const categoriesAction = createListCategories();
  categoriesAction.then(r => {
    createCategories(r, refs.containerCategoriesEl);
    let selectedCategories = localStorageService.loadCategoriesFilters();
    setDefaultStatusCategories(selectedCategories);
  });
}
//ф-я запиту список категорій
async function createListCategories() {
  const arrayCategories = [];
  const response = await newsApiService.getlistCategories();
  response.results.forEach(element => {
    arrayCategories.push(element.section);
  });
  return arrayCategories;
}
// вибір категорій
function selectedCategories(evt) {
  if (evt.target.nodeName === 'BUTTON') {
    addSelectedCategories(evt.target.textContent);
    evt.target.classList.toggle('btn-categories-selected');
    if (evt.target.parentNode.classList.contains('categories-scrollable')) {
      const btnItem = document.querySelectorAll(
        '.categories-scrollable .btn-categories-selected'
      );
      const dropdownCategoriesArray =
        document.querySelectorAll('.js-list-others');
      dropdownCategoriesArray.forEach(dropdownCategories => {
        if (btnItem?.length > 3) {
          dropdownCategories.classList.add('btn-categories-selected');
        } else {
          dropdownCategories.classList.remove('btn-categories-selected');
        }
      });
    }
  }
  clearMarkupNews();
  createNewsCategory();
}

function setDefaultStatusCategories(selectedCategories) {
  if (selectedCategories === '""') {
    return;
  }

  const arrayBtnCategories = document.querySelectorAll('.js-category-anchor');
  arrayBtnCategories.forEach(btnCategory => {
    if (selectedCategories.includes(btnCategory.textContent)) {
      btnCategory.classList.add('btn-categories-selected');
    }
  });

  const dropdownCategoriesArray = document.querySelectorAll('.js-list-others');
  const btnItem = document.querySelectorAll(
    '.categories-scrollable .btn-categories-selected'
  );
  dropdownCategoriesArray.forEach(dropdownCategories => {
    if (btnItem?.length > 3) {
      dropdownCategories.classList.add('btn-categories-selected');
    } else {
      dropdownCategories.classList.remove('btn-categories-selected');
    }
  });
}

function addSelectedCategories(category) {
  let filters = localStorageService.loadFilters();
  let arraySelectedCategories = filters?.selectedCategories
    ? filters.selectedCategories
    : [];
  if (!arraySelectedCategories.includes(category)) {
    arraySelectedCategories.push(category);
    localStorageService.saveCategoriesFilters(arraySelectedCategories);
  } else {
    arraySelectedCategories.splice(
      arraySelectedCategories.indexOf(category),
      1
    );
    localStorageService.saveCategoriesFilters(arraySelectedCategories);
  }
}

function getRemainderDataLocalStorage() {
  if (newsApiService.requestNum % 5 === 0) {
    let response = localStorageService.load(
      localStorageService.PAGINATION_NEWS
    );
    localStorage.removeItem(localStorageService.PAGINATION_NEWS);
    let data = getDataForMarkupNews(response, newsApiService.pageNum, 'ls');
    return data;
  }
  return false;
}

function getNewsLocalStorage() {
  let pageNumDataNews = localStorageService.load(
    localStorageService.PAGE_DATA_NEWS
  );
  if (pageNumDataNews) {
    const keys = Object.keys(pageNumDataNews);
    for (const key of keys) {
      if (Number(key) === newsApiService.pageNum) {
        let data = getDataForMarkupNews(
          pageNumDataNews[key],
          newsApiService.pageNum,
          'ls'
        );
        newsApiService.requestNum -= 1;
        return data;
      }
    }
  }
  return false;
}

function clearData() {
  newsApiService.resetData;
  localStorage.removeItem(localStorageService.PAGINATION_NEWS);
  localStorage.removeItem(localStorageService.PAGE_DATA_NEWS);
}

function selectionOptionGetNews() {
  let data = getNewsLocalStorage();
  if (data !== false) {
    renderNews(data);
    changeStatusNews(data);
    return;
  }
  data = getRemainderDataLocalStorage();
  if (data !== false) {
    renderNews(data);
    changeStatusNews(data);
    return;
  }
  newsApiService.page += 1;
  if (nameRequest === 'searchNews') {
    searchNews(true);
  } else if (nameRequest === 'NewsCategory') {
    createNewsCategory(true);
  } else {
    let response = localStorageService.load(
      localStorageService.PAGINATION_NEWS
    );
    localStorage.removeItem(localStorageService.PAGINATION_NEWS);
    let data = getDataForMarkupPopularNews(response, newsApiService.pageNum);
    renderNews(data);
    changeStatusNews(data);
  }
}
