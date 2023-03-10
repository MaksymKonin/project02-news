import NewsApiService from './newsApiService';
const newsApiService = new NewsApiService();
export default class localStorageService {
  constructor() {
    this.keySavedFilters = 'Filters';
    this.FAVORITES_NEWS = 'favorite-news';
    this.PAGINATION_NEWS = 'pagination-news';
    this.CLICKED_PAGES = 'clickedPages';
    this.PAGE_DATA_NEWS = 'pageDataNews';
    this.CALENDAR_PARAMETERS = 'calendarParameters';
  }
  save(key, value) {
    try {
      const valueJson = JSON.stringify(value);
      localStorage.setItem(key, valueJson);
    } catch (error) {
      console.error(error);
    }
  }
  load(key) {
    try {
      const data = localStorage.getItem(key);
      return data === null ? undefined : JSON.parse(data);
    } catch (error) {
      console.error(error);
    }
  }
  loadFilters() {
    return this.load(this.keySavedFilters)
      ? this.load(this.keySavedFilters)
      : undefined;
  }
  saveDataFilters(date) {
    let filters = this.loadFilters() ? this.loadFilters() : {};
    filters.selectedDate = date;
    this.save(this.keySavedFilters, filters);
  }
  saveCategoriesFilters(categories) {
    let filters = this.loadFilters() ? this.loadFilters() : {};
    filters.selectedCategories = categories;
    this.save(this.keySavedFilters, filters);
  }

  loadDataFilters() {
    let filters = this.loadFilters();
    let selectedDate = filters?.selectedDate ? filters.selectedDate : null;
    return selectedDate;
  }

  loadCategoriesFilters() {
    let filters = this.loadFilters();
    let selectedCategories = filters?.selectedCategories
      ? filters.selectedCategories.join('", "')
      : '""';
    return selectedCategories;
  }
}
