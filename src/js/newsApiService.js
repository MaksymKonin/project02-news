const CATEGORIES = 'https://api.nytimes.com/svc/news/v3/content';
const NEWS_SEARCH = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const POPULAR_NEWS = 'https://api.nytimes.com/svc/mostpopular/v2';
const API_KEY = 'H4EzmbJjzcMKAQjlOxUvVd6TipG3GhzM';

export default function categoryNews(source, section) {
  return fetch(`${CATEGORIES}/${source}/${section}.json?api-key=${API_KEY}`)
        .then(responce => {
            if (!responce.ok) {
                throw new Error(responce.statusText)
            }
            return responce.json();
        });
};

export default function searchNews(query) {
    return fetch(`${NEWS_SEARCH}?q=${query}&api-key=${API_KEY}`)
        .then(responce => {
            if (!responce.ok) {
                throw new Error(responce.statusText)
            }
            return responce.json();
        });
};

export default function popularNews(popular, days) {
    return fetch(`${POPULAR_NEWS}/${popular}/${days}.json?api-key=${API_KEY}`)
        .then(responce => {
            if (!responce.ok) {
                throw new Error(responce.statusText)
            }
            return responce.json();
        });
};