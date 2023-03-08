import NewsApiService from './newsApiService';
const newsApiService = new NewsApiService();
export default class localStorageService {
  constructor() {
    this.keySavedFilters = 'Filters';
    this.FAVORITES_NEWS = 'favorite-news';
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
    console.log('saveDataFilters');
    let filters = this.loadFilters() ? this.loadFilters() : {};
    filters.selectedDate = date;
    this.save(this.keySavedFilters, filters);
  }
  saveCategoriesFilters(categories) {
    console.log('saveCategoriesFilters');
    let filters = this.loadFilters() ? this.loadFilters() : {};
    filters.selectedCategories = categories;
    this.save(this.keySavedFilters, filters);
  }

  loadDataFilters() {
    console.log('loadDataFilters');
    let filters = this.loadFilters();
    let selectedDate = filters?.selectedDate ? filters.selectedDate : null;
    console.log(selectedDate);
    return selectedDate;
  }

  loadCategoriesFilters() {
    console.log('loadCategoriesFilters');
    let filters = this.loadFilters();
    let selectedCategories = filters?.selectedCategories
      ? filters.selectedCategories.join('", "')
      : '""';
    console.log(selectedCategories);
    return selectedCategories;
  }
}
