import { Notify } from 'notiflix/build/notiflix-notify-aio';
import changeTheme from './js/changeTheme';
import { userPositionConsent, weatherMarkup } from './js/weatherServiceMain';
import { createCalendar } from './js/renderCalendar';
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
  onSlicePage,
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
  let paginationPage = onSlicePage(pageNum,queryStorage);
  renderNews(paginationPage);
  changeStatusNews(paginationPage);
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
    // -------------------------------------------------
    queryStorage = [...normalizedData];
    let paginationPage = renderPagination(queryStorage);
    renderNews(paginationPage);
    changeStatusNews(paginationPage);
    // ------------------------------------------------
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
    //console.log('Маємо queryStorage з запиту createpopularNews')
    queryStorage = [...normalizedData];
    let paginationPage = renderPagination(queryStorage);
    renderNews(paginationPage);
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
  try {
    if (response.response.docs.length === 0) {
      createCardNotFound();
      return;
    }
    let normalizedData = normalaizData(response.response.docs);
  // console.log('Маємо queryStorage з запиту createNewsCategory')
    queryStorage = [...normalizedData];
    let paginationPage = renderPagination(queryStorage);
    renderNews(paginationPage);
    changeStatusNews(paginationPage);
  
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
  // console.log('renderListCategories');
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
      console.log(dropdownCategoriesArray);

      // console.log(btnItem?.length);
      // console.log(btnItem?.length > 3);
      dropdownCategoriesArray.forEach(dropdownCategories => {
        if (btnItem?.length > 3) {
          // console.log('add');
          dropdownCategories.classList.add('btn-categories-selected');
        } else {
          // console.log('remove');
          dropdownCategories.classList.remove('btn-categories-selected');
        }
      });
      //   const dropdownCategories =
      //     evt.target.parentNode.parentNode.previousSibling;

      //   if (dropdownCategories.classList.contains('btn-categories-selected')) {
      //     if (btnItem?.length === 0)
      //       dropdownCategories.classList.remove('btn-categories-selected');
      //   } else dropdownCategories.classList.add('btn-categories-selected');
    }
  }
  clearMarkupNews();
  createNewsCategory();
}

function setDefaultStatusCategories(selectedCategories) {
  if (selectedCategories === '""') {
    // console.log('stop');
    return;
  }

  const arrayBtnCategories = document.querySelectorAll('.js-category-anchor');
  arrayBtnCategories.forEach(btnCategory => {
    if (selectedCategories.includes(btnCategory.textContent)) {
      btnCategory.classList.add('btn-categories-selected');
    }
  });

  const dropdownCategoriesArray = document.querySelectorAll('.js-list-others');
  // console.log(dropdownCategoriesArray);
  const btnItem = document.querySelectorAll(
    '.categories-scrollable .btn-categories-selected'
  );
  // console.log(btnItem?.length);
  // console.log(btnItem?.length > 3);
  dropdownCategoriesArray.forEach(dropdownCategories => {
    if (btnItem?.length > 3) {
      console.log('add');
      dropdownCategories.classList.add('btn-categories-selected');
    } else {
      console.log('remove');
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
