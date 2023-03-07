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
import { renderPagination, slicePage,activePageOnPagination } from './js/pagination';
import LocalStorageService from './js/localStorage';
const localStorageService = new LocalStorageService();
const newsApiService = new NewsApiService();

const HAVE_READ_ID = 'have-read-id';
const FAVORITES_NEWS = 'favorite-news';
let haveReadArray = [];
let favoritesNewsArray = [];
let queryStorage = null;

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
  activePageOnPagination(pageNum)
  slicePage(pageNum, queryStorage);
}


//ф-я запиту новин по назві
async function searchNews() {
  clearMarkupNews();
  const response = await newsApiService.getsearchNews();
  try {
    if (response.response.docs.length === 0) {
      createCardNotFound();
    }
    let normalizedData = normalaizData(response.response.docs);
    // -----------------------------------------------------------
    queryStorage = [...normalizedData];
    // console.log('queryStorage від запиту getsearchNews ', queryStorage);
    let paginationPage = renderPagination(queryStorage);
    renderNews(paginationPage);
    //  renderNews(normalizedData);
    // ------------------------------------------------------
    saveHaveReadNews();
    saveFavoriteNews(normalizedData);
    removeFavoriteNews(normalizedData);
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
    }
    let normalizedData = normalaizData(response.results);
    // -----------------------------------------------------------
    queryStorage = [...normalizedData];
    // console.log('queryStorage від запиту getpopularNews', queryStorage);

    let paginationPage = renderPagination(queryStorage);

    renderNews(paginationPage);
    // renderNews(normalizedData);
    // ------------------------------------------------------
    setDefaultParams(paginationPage);

    saveHaveReadNews();

    saveFavoriteNews(paginationPage);

    removeFavoriteNews(paginationPage);
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
  // -----------------------------------------------------------
  queryStorage = [...normalizedData];
  // console.log('queryStorage від запиту getcategoryNews ', queryStorage);
  let paginationPage = renderPagination(queryStorage);
  renderNews(paginationPage);
  // renderNews(normalizedData);
  // ------------------------------------------------------

  setDefaultParams(paginationPage);

  saveHaveReadNews(paginationPage);

  saveFavoriteNews(paginationPage);

  removeFavoriteNews(paginationPage);

  // } catch (err) {
  //   Notify.failure('Sorry, an error occurred, try again later');
  // }
}
//ф-я запиту по даті новин
// async function dataNews(selectedDate) {
//   const response = await calendarApiService();
//   try {
//     if (response.response.docs.length === 0) {
//       createCardNotFound();
//     }
//     let normalizedData = normalaizData(response.response.docs);
//     renderNews(normalizedData);
//   } catch (err) {
//     Notify.failure('Sorry, an error occurred, try again later');
//   }
// }

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
    console.log(0);
  } else if (evt.type === 'change' && evt.target.nodeName === 'SELECT') {
    addSelectedCategories(evt.target.value);

    console.log(1);
  }
  console.log(2);
  console.log(newsApiService.selectedCategories);
}

function addSelectedCategories(category) {
  clearMarkupNews();
  createNewsCategory();

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

function saveHaveReadNews() {
  const readMoreButtons = document.querySelectorAll('.read-more');
  let readMoreArray = Array.from(readMoreButtons);

  readMoreArray.map(readMoreLink => {
    readMoreLink.addEventListener('click', event => {
      const parentLi = event.target.parentNode.parentNode.parentNode.parentNode;
      const parentLiId = parentLi.dataset.idNews;
      const isIncludeId = haveReadArray.includes(parentLiId);
      if (!isIncludeId) {
        haveReadArray.push(parentLiId);
        localStorageService.save(HAVE_READ_ID, JSON.stringify(haveReadArray));
      }
    });
  });
}

function saveFavoriteNews(normalizedData) {
  const addFavoriteButtons = document.querySelectorAll('.add-status-js');

  let favoriteButtonsArray = Array.from(addFavoriteButtons);

  favoriteButtonsArray.map(addButtonHTML => {
    addButtonHTML.addEventListener('click', event => {
      const addButton = event.target;
      const removeButton = addButton.nextElementSibling;
      const parentLi = addButton.parentNode.parentNode;
      const parentLiId = parentLi.dataset.idNews;

      addButton.style.display = 'none';
      removeButton.style.display = 'block';

      normalizedData.map(element => {
        if (String(element.id_news) === parentLiId) {
          favoritesNewsArray.push(element);
          localStorageService.save(FAVORITES_NEWS, favoritesNewsArray);
        }
      });
    });
  });
}

function removeFavoriteNews(normalizedData) {
  const removeFavoriteButtons = document.querySelectorAll('.remove-status-js');

  let removeFavoriteButtonsArray = Array.from(removeFavoriteButtons);

  removeFavoriteButtonsArray.map(removeButtonHTML => {
    removeButtonHTML.addEventListener('click', event => {
      const removeButton = event.target;
      const addButton = removeButton.previousElementSibling;
      const parentLi = removeButton.parentNode.parentNode;
      const parentLiId = parentLi.dataset.idNews;

      addButton.style.display = 'block';
      removeButton.style.display = 'none';

      normalizedData.map(element => {
        if (String(element.id_news) === parentLiId) {
          const index = favoritesNewsArray.indexOf(element);
          favoritesNewsArray.splice(index, 1);
          localStorageService.save(
            FAVORITES_NEWS,
            JSON.stringify(favoritesNewsArray)
          );
        }
      });
    });
  });
}

function setDefaultParams(normalizedData) {
  const favoriteNews = localStorageService.load(FAVORITES_NEWS);
  if (favoriteNews) {
    const favoriteNewsParse = JSON.parse(favoriteNews);

    normalizedData.map(element => {
      const test = favoriteNewsParse.includes(element);
      // if (favoriteNewsParse)
      // if (String(element.id_news) === parentLiId) {
      //   const index = favoritesNewsArray.indexOf(element)
      //   favoritesNewsArray.splice(index, 1)
      //   localStorage.save(FAVORITES_NEWS, JSON.stringify(favoritesNewsArray))

      // }
    });
  }

  // removeFavoriteButtonsArray.map(removeButtonHTML => {
  //   removeButtonHTML.addEventListener("click", event => {
  //     const removeButton = event.target
  //     const addButton = removeButton.previousElementSibling
  //     const parentLi = removeButton.parentNode.parentNode;
  //     const parentLiId = parentLi.dataset.idNews;

  //     addButton.style.display = "block"
  //     removeButton.style.display = "none"

  //     normalizedData.map(element => {
  //       if (String(element.id_news) === parentLiId) {
  //         const index = favoritesNewsArray.indexOf(element)
  //         favoritesNewsArray.splice(index, 1)
  //         localStorage.save(FAVORITES_NEWS, JSON.stringify(favoritesNewsArray))

  //       }
  //     })
  //   })
  // })
}
