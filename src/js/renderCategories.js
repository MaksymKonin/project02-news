import axios from "axios";


const baseUrl = "https://api.nytimes.com/svc/search/v2";
const apiKey = "H4EzmbJjzcMKAQjlOxUvVd6TipG3GhzM"
const searchUrl = `/articlesearch.json?news=${news}&api-key=${apiKey}`

export default class categoriesApi {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
  }
  

  async fetchCategory() {
    const searchParams = new URLSearchParams({
      image_type: 'naws',
      safesearch: 'true',
      per_page: 50,
      page: this.page,
      q: this.searchQuery,
      key: API_KEY,
    });

    const { data } = await axios(`?${searchParams}`);
    this.incrementPage();
    return data;
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}

export const categoriesApi = new CategoriesApi();

