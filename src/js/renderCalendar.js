import newsApiService from './newsApiService';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { createCardNotFound } from './renderNews';
import localStorageService from './localStorage';
import { refs } from './refs';
import normalaizData from './normalaizData';
import { renderNews } from './renderNews';
import { clearMarkupNews } from './renderNews';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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
  if (selectedDate === localStorage.loadDataFilters()) selectedDate = null;
  localStorage.saveDataFilters(selectedDate);
  let selectedCategories = localStorage.loadCategoriesFilters();

  const apiService = new newsApiService();
  apiService
    .getDateAndCategoryNews(selectedDate, selectedCategories)
    .then(response => {
      if (response.response.docs.length === 0) {
        createCardNotFound();
        return;
      }
      let normalizedData = normalaizData(response.response.docs);
      renderNews(normalizedData);
    })
    .catch(error => {
      Notify.failure('Sorry, an error occurred, try again later');
    });
}

export { calendarApiService, createCalendar };
