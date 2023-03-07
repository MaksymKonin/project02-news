export default class localStorageService {
  constructor() {
    this.keySavedFilters = 'Filters';
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
}
