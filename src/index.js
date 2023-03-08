import { Notify } from 'notiflix/build/notiflix-notify-aio';
import changeTheme from './js/changeTheme';
import { userPositionConsent, weatherMarkup } from './js/weatherServiceMain';
import { createCalendar, calendarApiService } from './js/renderCalendar';
import NewsApiService from './js/newsApiService';
import normalaizData from './js/normalaizData';
import {
  renderNews,
  createCardNotFound,
  clearMarkupNews,
} from './js/renderNews';
import { createCategories } from './js/renderCategories';
import { refs } from './js/refs';
import {
  renderPagination,
  slicePage,
  activePageOnPagination,
} from './js/pagination';
import LocalStorageService from './js/localStorage';
const localStorageService = new LocalStorageService();
const newsApiService = new NewsApiService();
import changeStatusNews from './js/changeStatusNews';
let queryStorage = null;
changeTheme();
createCalendar();
renderListCategories();
weatherMarkup();
userPositionConsent(); //run weather according to location
if (localStorageService.loadFilters()) {
  createNewsCategory();
} else createpopularNews();

refs.formEl.addEventListener('submit', onFormSubmit);
refs.containerCategoriesEl.addEventListener('click', onCategoriesClick);
// refs.containerCategoriesEl.addEventListener('change', onCategoriesClick);
refs.containerPaginationEl.addEventListener('click', onPaginationClick);

//ф-я обробка кліку по кнопці форми
function onFormSubmit(evt) {
  evt.preventDefault();
  newsApiService.resetData();
  clearMarkupNews();
  newsApiService.searchQuery =
    evt.currentTarget.elements.searchQuery.value.trim();
  searchNews();
}
//ф-я обробка кліку по категоріям
function onCategoriesClick(evt) {
  evt.preventDefault();
  newsApiService.resetData();
  selectedCategories(evt);
}
//ф-я обробка кліку по пагінації/вибір номера сторінки
function onPaginationClick(evt) {
  evt.preventDefault();
  clearMarkupNews();
  const pageNum = evt.target.innerHTML;
  activePageOnPagination(pageNum);
  slicePage(pageNum, queryStorage);
}

//ф-я запиту новин по назві
async function searchNews() {
  clearMarkupNews();
  const response = await newsApiService.getsearchNews();
  try {
    if (response.response.docs.length === 0) {
      createCardNotFound();
      return;
    }
    let normalizedData = normalaizData(response.response.docs);
    // -----------------------------------------------------------
    queryStorage = [...normalizedData];
    // console.log('queryStorage від запиту getsearchNews ', queryStorage);
    let paginationPage = renderPagination(queryStorage);
    renderNews(paginationPage);
    //  renderNews(normalizedData);
    // ------------------------------------------------------
    changeStatusNews(paginationPage);
  } catch (err) {
    Notify.failure('Sorry, an error occurred, try again later');
  }
}
//ф-я створення популярних новин
async function createpopularNews() {
  clearMarkupNews();
  const response = await newsApiService.getpopularNews();
  try {
    if (response.results.length === 0) {
      createCardNotFound();
      return;
    }
    let normalizedData = normalaizData(response.results);
    // -----------------------------------------------------------
    queryStorage = [...normalizedData];
    // console.log('queryStorage від запиту getpopularNews', queryStorage);

    let paginationPage = renderPagination(queryStorage);

    renderNews(paginationPage);
    // renderNews(normalizedData);
    // ------------------------------------------------------
    changeStatusNews(paginationPage);
  } catch (err) {
    Notify.failure('Sorry, an error occurred, try again later');
  }
}

//ф-я запиту новин по категорії
async function createNewsCategory() {
  let selectedDate = localStorageService.loadDataFilters();
  let selectedCategories = localStorageService.loadCategoriesFilters();
  const response = await newsApiService.getDateAndCategoryNews(
    selectedDate,
    selectedCategories
  );
  // try {
  if (response.response.docs.length === 0) {
    createCardNotFound();
    return;
  }

  let normalizedData = normalaizData(response.response.docs);
  // -----------------------------------------------------------
  queryStorage = [...normalizedData];
  // console.log('queryStorage від запиту getcategoryNews ', queryStorage);
  let paginationPage = renderPagination(queryStorage);
  renderNews(paginationPage);
  // renderNews(normalizedData);
  // ------------------------------------------------------

  changeStatusNews(paginationPage);

  // } catch (err) {
  //   Notify.failure('Sorry, an error occurred, try again later');
  // }
}

function renderListCategories() {
  const categoriesAction = createListCategories();
  categoriesAction.then(r => {
    createCategories(r, refs.containerCategoriesEl);
  });
}
//ф-я запиту список категорій
async function createListCategories() {
  const arrayCategories = [];
  const response = await newsApiService.getlistCategories();
  response.results.forEach(element => {
    arrayCategories.push(element.section);
  });
  // console.log('categories-->', arrayCategories);
  return arrayCategories;
}
// свибір категорій/тестово
function selectedCategories(evt) {
  if (evt.target.nodeName === 'BUTTON') {
    addSelectedCategories(evt.target.textContent);
    evt.target.classList.toggle('btn-categories-selected');
    console.log(evt.target);
    const dropdownCategories = document.querySelector('#dropdownDesktopID');
    console.log(dropdownCategories);
    dropdownCategories;
    clearMarkupNews();
    createNewsCategory();
  }
}

function addSelectedCategories(category) {
  let filters = localStorageService.loadFilters();
  let arraySelectedCategories = filters?.selectedCategories
    ? filters.selectedCategories
    : [];
  console.log(arraySelectedCategories);
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
