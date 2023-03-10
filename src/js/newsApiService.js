const SEARCH_NEWS_URL =
  'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const POPULAR_NEWS_URL = 'https://api.nytimes.com/svc/mostpopular/v2/viewed';
const CATEGORIES_LIST_URL =
  'https://api.nytimes.com/svc/news/v3/content/section-list.json';
const POPULAR_NEWS_DAYS = 7;
const API_KEY = 'H4EzmbJjzcMKAQjlOxUvVd6TipG3GhzM';

export default class newsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 0;
    this.pageNum = 1;
    this.requestNum = 1;
  }

  resetData() {
    this.page = 0;
    this.pageNum = 1;
    this.requestNum = 1;
  }

  getSearchNews() {
    return fetch(
      `${SEARCH_NEWS_URL}?q=${this.searchQuery}&page=${this.page}&api-key=${API_KEY}`
    ).then(responce => {
      if (!responce.ok) {
        throw new Error(responce.statusText);
      }
      return responce.json();
    });
  }

  getPopularNews() {
    return fetch(
      `${POPULAR_NEWS_URL}/${POPULAR_NEWS_DAYS}.json?api-key=${API_KEY}`
    ).then(responce => {
      if (!responce.ok) {
        throw new Error(responce.statusText);
      }
      return responce.json();
    });
  }

  getlistCategories() {
    return fetch(`${CATEGORIES_LIST_URL}?api-key=${API_KEY}`).then(responce => {
      if (!responce.ok) {
        throw new Error(responce.statusText);
      }
      return responce.json();
    });
  }

  getDateAndCategoryNews(selectedDate, selectedCategories) {
    let SEARCH_BY_DATE = '';
    let SEARCH_BY_CATEGORIES = '';
    if (selectedCategories) {
      SEARCH_BY_CATEGORIES = `&fq=news_desk:(${selectedCategories})`;
    }
    SEARCH_BY_DATE =
      !selectedDate || selectedDate === null
        ? `?api-key=${API_KEY}&page=${this.page}`
        : `?facet_field=day_of_week&facet=true&begin_date=${selectedDate}&end_date=${selectedDate}&api-key=${API_KEY}`;

    return fetch(
      `${SEARCH_NEWS_URL}${SEARCH_BY_DATE}${SEARCH_BY_CATEGORIES}`
    ).then(responce => {
      if (!responce.ok) {
        throw new Error(responce.statusText);
      }
      return responce.json();
    });
  }
}
