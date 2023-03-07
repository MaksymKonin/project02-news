import newsApiService from './newsApiService';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { createCardNotFound } from './renderNews';
import localStorageService from './localStorage';
import { refs } from './refs';
import normalaizData from './normalaizData';
import { renderNews } from './renderNews';
import { clearMarkupNews } from './renderNews';

const SELECTED_DATE = 'selected-date';
const localStorage = new localStorageService();

// Перейменувати ключ і змінну
const TEST_SELECTED_CATEGORY = 'test-selected-category';

function addZero(value) {
  return String(value).padStart(2, '0');
}

function createCalendar() {
  const options = {
    enableTime: false,
    time_24hr: true,
    dateFormat: 'd/m/Y',
    defaultDate: new Date(),
    minuteIncrement: 1,
    onOpen: [
      function () {
        refs.calendarWrapper.classList.add('active');
      },
    ],
    onClose(selectedDates) {
      let selectedDate = selectedDates[0];
      refs.calendarWrapper.classList.remove('active');

      clearMarkupNews();

      calendarApiService(selectedDate);
    },
  };
  return flatpickr(refs.dateTimePicker, options);
}

function calendarApiService(date) {
  let selectedDate =
    addZero(date.getFullYear()) +
    addZero(date.getMonth() + 1) +
    addZero(date.getDate());

  localStorage.save(SELECTED_DATE, selectedDate);

  // Прийом категорій з локал сторідж
  const paramsFromLocalStorage = localStorage.load(TEST_SELECTED_CATEGORY);
  let selectedCategories = '""';

  // Перевірка наявності вибраних категорій
  if (paramsFromLocalStorage) {
    selectedCategories = JSON.parse(paramsFromLocalStorage).join(', ');
  }

  const apiService = new newsApiService();
  apiService
    .getDateAndCategoryNews(selectedDate, selectedCategories)
    .then(articles => {
      let normalizedData = normalaizData(articles);
      renderNews(normalizedData);
    })
    .catch(error => {
      console.log(error);
      createCardNotFound();
    });
}

export { calendarApiService, createCalendar };
