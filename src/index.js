import { Notify } from 'notiflix/build/notiflix-notify-aio';
import changeTheme from './js/changeTheme';
import { userPositionConsent, weatherMarkup } from './js/weatherServiceMain';
import createCalendar from './js/renderCalendar';
import NewsApiService from './js/newsApiService';
import calendarApiService from './js/calendarApiService';
import normalaizData from './js/normalaizData';
import {
  renderNews,
  createCardNotFound,
  clearMarkupNews,
} from './js/renderNews';
import { createCategories } from './js/renderCategories';
import { refs } from './js/refs';
import LocalStorageService from './js/localStorage';
const localStorageService = new LocalStorageService();
const newsApiService = new NewsApiService();

changeTheme();
createCalendar();
//---render categories---

const categoriesAction = createListCategories();
categoriesAction.then(r => {
  createCategories(r, refs.containerCategoriesEl);
});

//---END OF render categories---

//run default weather
// renderWeatherCardContainer();
weatherMarkup();
//run weather according to location
userPositionConsent();

let arraySelectedCategories = [];

console.log(loadingSavedFilters());
if (loadingSavedFilters()) {
  arraySelectedCategories =
    newsApiService.selectedCategories !== ''
      ? newsApiService.selectedCategories
      : [];
  createNewsCategory();
} else createpopularNews();

refs.formEl.addEventListener('submit', onFormSubmit);
refs.containerCategoriesEl.addEventListener('click', onCategoriesClick);
refs.containerCategoriesEl.addEventListener('change', onCategoriesClick);

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
let categoryButton;

function onCategoriesClick(evt) {
  evt.preventDefault();
  newsApiService.resetData();
  clearMarkupNews();
  selectedCategories(evt);
  createNewsCategory();
  let target = evt.target;
  // console.log(target);
  if (target.nodeName !== 'BUTTON') return;
  colorBtn(target);
};

function colorBtn(btn) {
    categoryButton = btn;
    if (categoryButton) {
      categoryButton.classList.toggle('btn-color')
    };  
}

//ф-я запиту новин по назві
async function searchNews() {
  clearMarkupNews();
  const response = await newsApiService.getsearchNews();
  // try {
  if (response.response.docs.length === 0) {
    createCardNotFound();
  }
  let normalizedData = normalaizData(response.response.docs);
  renderNews(normalizedData);
  // } catch (err) {
  //   Notify.failure('Sorry, an error occurred, try again later');
  // }
}
//ф-я створення популярних новин
async function createpopularNews() {
  clearMarkupNews();
  const response = await newsApiService.getpopularNews();
  try {
    if (response.results.length === 0) {
      createCardNotFound();
    }
    let normalizedData = normalaizData(response.results);
    renderNews(normalizedData);
  } catch (err) {
    Notify.failure('Sorry, an error occurred, try again later');
  }
}
//ф-я запиту новин по категорії
async function createNewsCategory() {
  const response = await newsApiService.getcategoryNews();
  console.log(response);
  // try {
  if (response.response.docs.length === 0) {
    createCardNotFound();
  }
  let normalizedData = normalaizData(response.response.docs);
  renderNews(normalizedData);
  // } catch (err) {
  //   Notify.failure('Sorry, an error occurred, try again later');
  // }
}
//ф-я запиту по даті новин
async function dataNews() {
  const response = await calendarApiService();
  try {
    if (response.response.docs.length === 0) {
      createCardNotFound();
    }
    let normalizedData = normalaizData(response.response.docs);
    renderNews(normalizedData);
  } catch (err) {
    Notify.failure('Sorry, an error occurred, try again later');
  }
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
  if (evt.type === 'click' && evt.target.nodeName === 'BUTTON') {
    addSelectedCategories(evt.target.textContent);
  } else if (evt.type === 'change' && evt.target.nodeName === 'SELECT') {
    addSelectedCategories(evt.target.value);
  }
  console.log(newsApiService.selectedCategories);
}

function addSelectedCategories(category) {
  console.log(arraySelectedCategories);

  if (!arraySelectedCategories.includes(category))
    arraySelectedCategories.push(category);
  else {
    arraySelectedCategories.splice(
      arraySelectedCategories.indexOf(category),
      1
    );
  }

  let filters = newsApiService.selectedDate
    ? {
        selectedCategories: arraySelectedCategories,
        selectedDate: newsApiService.selectedDate,
      }
    : { selectedCategories: arraySelectedCategories };
  localStorageService.save(localStorageService.keySavedFilters, filters);
}

function loadingSavedFilters() {
  let filters = localStorageService.loadFilters();
  if (filters) {
    newsApiService.selectedCategories = filters?.selectedCategories
      ? filters?.selectedCategories
      : '';
    newsApiService.selectedDate = filters?.selectedDate
      ? filters?.selectedDate
      : '';
  }
  return filters;
}
