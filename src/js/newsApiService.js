const CATEGORIES_NEWS_URL = 'https://api.nytimes.com/svc/news/v3/content/inyt';
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
    this.selectedСategories = '';
    this.page = 1;
    this.loadCards = 0;
    this.dataNewsDefault = {
      id_news: Math.floor(Math.random() * 10000),
      photo_url: '../images/News.jpg',
      page_url: '../images/News.jpg',
      title: 'title',
      abstract: 'abstract',
      published_date: '1970-01-01',
      statusFavorite: 'Add to favorite',
    };
  }

  getsearchNews() {
    return fetch(
      `${SEARCH_NEWS_URL}?q=${this.searchQuery}&page=${this.page}&api-key=${API_KEY}`
    ).then(responce => {
      if (!responce.ok) {
        throw new Error(responce.statusText);
      }
      this.nextPage();
      return responce.json();
    });
  }

  nextPage() {
    this.page += 1;
  }

  resetData() {
    this.page = 0;
    this.loadCards = 0;
  }

  addLoadCards(quantityLoadCards) {
    this.loadCards = this.loadCards + quantityLoadCards;
  }

  getpopularNews() {
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

  getcategoryNews() {
    return fetch(
      `${CATEGORIES_NEWS_URL}/${this.selectedСategories}.json?api-key=${API_KEY}`
    ).then(responce => {
      if (!responce.ok) {
        throw new Error(responce.statusText);
      }
      return responce.json();
    });
  }
}
