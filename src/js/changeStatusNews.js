import LocalStorageService from '../js/localStorage';
const HAVE_READ = 'have-read-id';
const FAVORITES_NEWS = 'favorite-news';
let haveReadArray = [];
let favoritesNewsArray = [];

const localStorageService = new LocalStorageService();

export default function changeStatusNews(normalizedData) {
  setDefaultParams(normalizedData);
  saveHaveReadNews(normalizedData);
  saveFavoriteNews(normalizedData);
  return removeFavoriteNews(normalizedData);
}

function saveHaveReadNews(normalizedData) {
  let haveReadData = localStorageService.load(HAVE_READ);

  let newsId = []

  const currentDate = new Date().getTime();

  const readMoreButtons = document.querySelectorAll('.read-more');
  let readMoreArray = Array.from(readMoreButtons);

  readMoreArray.map(readMoreLink => {
    readMoreLink.addEventListener('click', event => {
      haveReadData = localStorageService.load(HAVE_READ);

      if (haveReadData) {
        haveReadData.map(newsObject => {
          newsId.push(newsObject.id)
        })
      }
        
      const haveReadStatus =
        event.target.parentNode.parentNode.parentNode.firstElementChild;
      haveReadStatus.style.display = 'block';

      const parentLi = event.target.parentNode.parentNode.parentNode.parentNode;
      const parentLiId = parentLi.dataset.idNews;
      const isIncludeId = newsId.includes(parentLiId);
  
      if (!isIncludeId) {
        normalizedData.map(element => {
          if (String(element.id_news) === parentLiId) {
            const haveReadObj = {
              id: parentLiId,
              abstract: element.abstract,
              page_url: element.page_url,
              photo_url: element.photo_url,
              published_date: element.published_date,
              section: element.section,
              title: element.title,
              date: currentDate,
            };
            haveReadArray.push(haveReadObj);
            localStorageService.save(HAVE_READ, haveReadArray);
          }
        });
      }
    });
  });
}

function saveFavoriteNews(normalizedData) {
  const addFavoriteButtons = document.querySelectorAll('.add-status-js');

  let favoriteButtonsArray = Array.from(addFavoriteButtons);

  favoriteButtonsArray.map(addButtonHTML => {
    addButtonHTML.addEventListener('click', event => {
      const addButton = event.target;
      const removeButton = addButton.nextElementSibling;
      const parentLi = addButton.parentNode.parentNode;
      const parentLiId = parentLi.dataset.idNews;

      addButton.style.display = 'none';
      removeButton.style.display = 'block';

      normalizedData.map(element => {
        if (String(element.id_news) === parentLiId) {
          favoritesNewsArray.push(element);
          localStorageService.save(FAVORITES_NEWS, favoritesNewsArray);
        }
      });
    });
  });
}

function removeFavoriteNews(normalizedData) {
  const removeFavoriteButtons = document.querySelectorAll('.remove-status-js');
  let removeFavoriteButtonsArray = Array.from(removeFavoriteButtons);

  let favoriteNewsID = [];

  favoritesNewsArray = localStorageService.load(FAVORITES_NEWS) || [];
  if (favoritesNewsArray.length !== 0) {
    favoritesNewsArray.map(item => {
      favoriteNewsID.push(item.id_news);
    });
  }

  removeFavoriteButtonsArray.map(removeButtonHTML => {
    removeButtonHTML.addEventListener('click', event => {
      const removeButton = event.target;
      const addButton = removeButton.previousElementSibling;
      const parentLi = removeButton.parentNode.parentNode;
      const parentLiId = parentLi.dataset.idNews;

      addButton.style.display = 'block';
      removeButton.style.display = 'none';

      normalizedData.map(element => {
        if (String(element.id_news) === parentLiId) {
          const index = favoriteNewsID.indexOf(element.id_news);
          favoritesNewsArray.splice(index, 1);
          localStorageService.save(FAVORITES_NEWS, favoritesNewsArray);
        }
      });
    });
  });
}

function setDefaultParams(normalizedData) {
  const favoriteNews = localStorageService.load(FAVORITES_NEWS);
  const haveRead = localStorageService.load(HAVE_READ);

  let haveReadId = [];

  if (haveRead) {
    haveRead.map(haveReadItem => {
      haveReadId.push(haveReadItem.id);
    });
  }

  let favoriteNewsID = [];

  if (favoriteNews) {
    favoriteNews.map(item => {
      favoriteNewsID.push(item.id_news);
    });
    normalizedData.map(element => {
      const isFavorite = favoriteNewsID.includes(element.id_news);

      if (isFavorite) {
        const favoriteLi = document.querySelector(
          `[data-id-news="${element.id_news}"]`
        );
        const divTape = favoriteLi.firstElementChild;
        const buttonAdd = divTape.querySelector('.add-status-js');
        const buttonRemove = divTape.querySelector('.remove-status-js');

        buttonAdd.style.display = 'none';
        buttonRemove.style.display = 'block';
      }

      const isHaveRead = haveReadId.includes(String(element.id_news));

      if (isHaveRead) {
        const haveReadLi = document.querySelector(
          `[data-id-news="${element.id_news}"]`
        );
        const divTape = haveReadLi.firstElementChild;
        const haveReadStatus = divTape.querySelector('.status-reed');

        haveReadStatus.style.display = 'block';
      }
    });
  }
}
