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
import localStorage from './js/localStorage';

const newsApiService = new NewsApiService();

const HAVE_READ_ID = "have-read-id" 
const FAVORITES_NEWS = "favorite-news"
let haveReadArray = [];
let favoritesNewsArray = [];


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
createpopularNews();

refs.formEl.addEventListener('submit', onFormSubmit);
refs.containerCategoriesEl.addEventListener('click', onCategoriesClick);

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
  clearMarkupNews();
  createNewsCategory();
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

  saveHaveReadNews()

  saveFavoriteNews(normalizedData)

  removeFavoriteNews(normalizedData)
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

    setDefaultParams(normalizedData)  

    saveHaveReadNews()

    saveFavoriteNews(normalizedData)

    removeFavoriteNews(normalizedData)

  } catch (err) {
    Notify.failure('Sorry, an error occurred, try again later');
  }
}
//ф-я запиту новин по категорії
async function createNewsCategory() {
  selectedСategories();
  const response = await newsApiService.getcategoryNews();
  try {
    if (response.results.length === 0) {
      createCardNotFound();
    }
    let normalizedData = normalaizData(response.results);
    renderNews(normalizedData);

    saveHaveReadNews(normalizedData)

    removeFavoriteNews(normalizedData)

  } catch (err) {
    Notify.failure('Sorry, an error occurred, try again later');
  }
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
function selectedСategories() {
  newsApiService.selectedСategories = 'automobiles, arts';
}

function saveHaveReadNews() {
  const readMoreButtons = document.querySelectorAll(".read-more");
    let readMoreArray = Array.from(readMoreButtons)
    
    readMoreArray.map(readMoreLink => {
      readMoreLink.addEventListener("click", event => {
        const parentLi = event.target.parentNode.parentNode.parentNode.parentNode;
        const parentLiId = parentLi.dataset.idNews;
        const isIncludeId = haveReadArray.includes(parentLiId)
        if (!isIncludeId) {
          haveReadArray.push(parentLiId)
          localStorage.save(HAVE_READ_ID, JSON.stringify(haveReadArray))
        }
      })
    })
}

function saveFavoriteNews(normalizedData) {
  const addFavoriteButtons = document.querySelectorAll(".add-status-js");

  let favoriteButtonsArray = Array.from(addFavoriteButtons)
  
  favoriteButtonsArray.map(addButtonHTML => {
    addButtonHTML.addEventListener("click", event => {
      const addButton = event.target 
      const removeButton = addButton.nextElementSibling
      const parentLi = addButton.parentNode.parentNode;
      const parentLiId = parentLi.dataset.idNews;

      addButton.style.display = "none"
      removeButton.style.display = "block"

      normalizedData.map(element => {
        if (String(element.id_news) === parentLiId) {
          favoritesNewsArray.push(element)
          localStorage.save(FAVORITES_NEWS, JSON.stringify(favoritesNewsArray))
          
        }
      })
    })
  })
}

function removeFavoriteNews(normalizedData) {
  const removeFavoriteButtons = document.querySelectorAll(".remove-status-js");

  let removeFavoriteButtonsArray = Array.from(removeFavoriteButtons)
  
  removeFavoriteButtonsArray.map(removeButtonHTML => {
    removeButtonHTML.addEventListener("click", event => {
      const removeButton = event.target 
      const addButton = removeButton.previousElementSibling
      const parentLi = removeButton.parentNode.parentNode;
      const parentLiId = parentLi.dataset.idNews;

      addButton.style.display = "block"
      removeButton.style.display = "none"

      normalizedData.map(element => {
        if (String(element.id_news) === parentLiId) {
          const index = favoritesNewsArray.indexOf(element)
          favoritesNewsArray.splice(index, 1)
          localStorage.save(FAVORITES_NEWS, JSON.stringify(favoritesNewsArray))
          
        }
      })
    })
  })
}

function setDefaultParams(normalizedData) {
  const favoriteNews = localStorage.load(FAVORITES_NEWS)
  if (favoriteNews) {
    const favoriteNewsParse = JSON.parse(favoriteNews)
    
    normalizedData.map(element => {
      const test = favoriteNewsParse.includes(element)
      // if (favoriteNewsParse)
      // if (String(element.id_news) === parentLiId) {
      //   const index = favoritesNewsArray.indexOf(element)
      //   favoritesNewsArray.splice(index, 1)
      //   localStorage.save(FAVORITES_NEWS, JSON.stringify(favoritesNewsArray))
        
      // }
    })
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