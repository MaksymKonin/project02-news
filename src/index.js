import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { userPositionConsent, weatherMarkup } from './js/weatherServiceMain';
import createCalendar from './js/renderCalendar';
import NewsApiService from './js/newsApiService';
import calendarApiService from './js/calendarApiService';
import markupCard from './js/markupCard';
import { refs } from './js/refs';
import localStorage from './js/localStorage';

const newsApiService = new NewsApiService();

createCalendar();
createListCategories();
//run default weather
weatherMarkup();
//run weather according to location
userPositionConsent();
createpopularNews();

refs.formEl.addEventListener('submit', onFormSubmit);
refs.containerCategoriesEl.addEventListener('click', onCategoriesClick);

//ф-я обробка кліку по кнопці
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
  try {
    if (response.response.docs.length === 0) {
      createCardNoNews();
    }
    let normalizedData = normalaizData(response.response.docs);
    renderNews(normalizedData);
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
      createCardNoNews();
    }
    let normalizedData = normalaizData(response.results);
    renderNews(normalizedData);
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
      createCardNoNews();
    }
    let normalizedData = normalaizData(response.results);
    renderNews(normalizedData);
  } catch (err) {
    Notify.failure('Sorry, an error occurred, try again later');
  }
}
//ф-я запиту по даті новин
async function dataNews() {
  const response = await calendarApiService();
  try {
    if (response.results.length === 0) {
      createCardNoNews();
    }
    let normalizedData = normalaizData(response.results);
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
  console.log(arrayCategories);
  return arrayCategories;
}
//ф-я рендер всих карток новин
function renderNews(normalizedData) {
  let cards = normalizedData
    .map(Data => {
      return markupCard(Data);
    })
    .join('');
  refs.containerCardEl.insertAdjacentHTML('beforeend', cards);
}
//ф-я очистки контейнера новин
function clearMarkupNews() {
  refs.containerCardEl.innerHTML = ``;
}
// свибір категорій/тестово
function selectedСategories() {
  newsApiService.selectedСategories = 'automobiles';
}
// створення карточки без новин
function createCardNoNews() {
  card = `<h1>We haven’t found news from this category</h1>
  <img src="./images/News.jpg" alt="photo news" />`;
  refs.containerCardEl.insertAdjacentHTML('beforeend', card);
}
// приводимо дані від сервера до одного виду
function normalaizData(data) {
  const araayData = [];
  data.forEach(element => {
    let photoEl = getPhotoNews(element);
    let publishedDataEl = getPublishedDataNews(element);
    let dataEl = {
      id_news:
        element?._id || element?.id || newsApiService.dataNewsDefolt.id_news,
      photo_url: photoEl || newsApiService.dataNewsDefolt.photo_url,
      page_url:
        element?.web_url ||
        element?.url ||
        newsApiService.dataNewsDefolt.page_url,
      statusFavorite: newsApiService.dataNewsDefolt.statusFavorite,
      title:
        element?.headline?.main ||
        element?.title ||
        newsApiService.dataNewsDefolt.title,
      abstract: element?.abstract || newsApiService.dataNewsDefolt.abstract,
      published_date: publishedDataEl,
    };
    araayData.push(dataEl);
  });
  return araayData;
}
//отримуємо фото новин
function getPhotoNews(element) {
  let photoEl = element?.multimedia || element?.media;
  if (photoEl?.length === 0) {
    return newsApiService.dataNewsDefolt.photo_url;
  }
  if ((photoEl = element?.media)) {
    photoEl =
      element.media[0]['media-metadata'].length === 0
        ? newsApiService.dataNewsDefolt.photo_url
        : element.media[0]['media-metadata'][2].url;
  } else {
    photoEl = element?.multimedia[0].url.includes('https://static01.nyt.com/')
      ? element?.multimedia[0].url
      : `https://static01.nyt.com/${element?.multimedia[0].url}`;
  }
  return photoEl;
}
//отримуємо дату публікації новин і форматуємо в необхідний вид
function getPublishedDataNews(element) {
  let date = new Date(
    element?.pub_date ||
      element?.published_date ||
      newsApiService.dataNewsDefolt.published_date
  );
  return (
    addZero(date.getDate()) +
    '/' +
    addZero(date.getMonth() + 1) +
    '/' +
    addZero(date.getFullYear())
  );
}
//добавляємо попереду 0 в даті де місяць і день менше 10
function addZero(num) {
  if (num >= 0 && num <= 9) {
    return '0' + num;
  } else {
    return num;
  }
}


