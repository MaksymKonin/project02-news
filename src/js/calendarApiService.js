import axios from 'axios';
import LocalStorageService from './localStorage';
const localStorageService = new LocalStorageService();
const SELECTED_DATE = 'selected-date';
// Перейменувати ключ і змінну
const TEST_SELECTED_CATEGORY = 'test-selected-category';

// Видалити після отримання реального ключа START
const testArray = [];
testArray.push('Sports');

// Значення запишеться іншою людиною
localStorage.setItem(TEST_SELECTED_CATEGORY, JSON.stringify(testArray));
// Видалити після отримання реального ключа END

export default function calendarApiService(date) {
  let toTimestamp = date.getTime();
  console.log(toTimestamp);
  localStorage.setItem(SELECTED_DATE, toTimestamp);

  // Прийом категорій з локал сторідж
  const paramsFromLocalStorage = localStorage.getItem(TEST_SELECTED_CATEGORY);
  let selectedCategories = null;
  let params = '';

  // Перевірка наявності вибраних категорій
  if (paramsFromLocalStorage) {
    selectedCategories = JSON.parse(paramsFromLocalStorage);
    params = `&fq=news_desk:(${selectedCategories})`;
  }
  let filter = selectedCategories
    ? { selectedСategories: selectedCategories, selectedDate: toTimestamp }
    : { selectedDate: toTimestamp };

  localStorageService.save(localStorageService.keySavedFilters, filter);

  const baseUrl = 'https://api.nytimes.com/svc/search/v2';
  const apiKey = 'H4EzmbJjzcMKAQjlOxUvVd6TipG3GhzM';
  const searchUrl = `/articlesearch.json?pub_date=${toTimestamp}&api-key=${apiKey}`;

  return axios.get(`${baseUrl}${searchUrl}${params}`).then(response => {
    if (response.status !== 200 || response.data.response.docs.length === 0) {
      throw new Error(response.status);
    }
    return response.data.response.docs;
  });
}
