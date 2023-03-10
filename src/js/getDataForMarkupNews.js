import { refs } from './refs';
import normalaizData from './normalaizData';
import LocalStorageService from './localStorage';
const localStorageService = new LocalStorageService();
const countCardsOnPage = 8;
let offset = 0;
let pageNumber = 1;
let totalPages = 0;
let middleNumber = 0;
let prevmiddleNumber = 0;
let nextmiddleNumber = 0;

function getDataForMarkupNews(response, pageNum, ls) {
  pageNumber = pageNum;
  if (ls) {
    renderNumberPage();
    activePageOnPagination();
    return onSlicePage(response);
  }

  offset = response?.response ? response?.response.meta.offset : 0;
  if (offset === 0) {
    let hits = response?.num_results
      ? response?.num_results
      : response?.response.meta.hits;
    countParametersPagination(hits);
  }
  renderNumberPage();
  activePageOnPagination();
  let data = response?.results ? response?.results : response?.response.docs;
  let normalizedData = normalaizData(data);
  saveRemainderDataRequest([...normalizedData]);
  return onSlicePage([...normalizedData]);
}

function getDataForMarkupPopularNews(response, pageNum) {
  pageNumber = pageNum;
  renderNumberPage();
  activePageOnPagination();
  saveRemainderDataRequest(response);
  return onSlicePage(response);
}

function onSlicePage(data, ls) {
  let paginationPage = data.slice(0, countCardsOnPage);
  savePage(paginationPage, ls);
  return paginationPage;
}

function saveRemainderDataRequest(data) {
  let arrayRemainder = localStorageService.load(
    localStorageService.PAGINATION_NEWS
  );
  arrayRemainder = !arrayRemainder ? [] : arrayRemainder;
  let remainder = data.slice(countCardsOnPage);
  remainder.forEach(element => {
    arrayRemainder.push(element);
  });
  localStorageService.save(localStorageService.PAGINATION_NEWS, arrayRemainder);
}

function savePage(paginationPage) {
  let pageNumDataNews = localStorageService.load(
    localStorageService.PAGE_DATA_NEWS
  );
  pageNumDataNews = !pageNumDataNews ? {} : pageNumDataNews;
  pageNumDataNews[pageNumber] = paginationPage;
  localStorageService.save(localStorageService.PAGE_DATA_NEWS, pageNumDataNews);
}

// змінює клас/колір обраной кнопки-сторінки
function activePageOnPagination() {
  const listItems = document.querySelectorAll('.js-pagination li');
  for (let i = 0; i < listItems.length; i++) {
    if (listItems[i].classList.contains('pagination__item--current-page')) {
      listItems[i].classList.remove('pagination__item--current-page');
    }
    if (Number(listItems[i].innerHTML) === pageNumber) {
      listItems[i].classList.add('pagination__item--current-page');
    }
  }
}

function countParametersPagination(hits) {
  totalPages = Math.ceil(hits / countCardsOnPage);
  if (totalPages > 999) {
    totalPages = 999;
  }
  middleNumber = Math.ceil(totalPages / 2);
  prevmiddleNumber = middleNumber - 1;
  nextmiddleNumber = middleNumber + 1;
}

function renderNumberPage() {
  refs.containerPaginationEl.innerHTML = ``;
  let arrayPage = '';
  if (totalPages >= 8) {
    if (pageNumber > totalPages - 5) {
      arrayPage = `<li class="pagination__item">1</li><li class="pagination__item-multipoint">...</li><li class="pagination__item">${
        totalPages - 4
      }</li><li class="pagination__item">${
        totalPages - 3
      }</li><li class="pagination__item">${
        totalPages - 2
      }</li><li class="pagination__item">${
        totalPages - 1
      }</li><li class="pagination__item">${totalPages}</li>`;
    } else if (pageNumber !== 1 && pageNumber < 4) {
      arrayPage = `<li class="pagination__item">1</li><li class="pagination__item">2</li><li class="pagination__item">3</li><li class="pagination__item">4</li><li class="pagination__item">5</li><li class="pagination__item-multipoint">...</li><li class="pagination__item">${totalPages}</li>`;
    } else if (pageNumber === 1) {
      arrayPage = `<li class="pagination__item">1</li><li class="pagination__item-multipoint">...</li><li class="pagination__item">${prevmiddleNumber}</li><li class="pagination__item">${middleNumber}</li><li class="pagination__item">${nextmiddleNumber}</li><li class="pagination__item-multipoint">...</li><li class="pagination__item">${totalPages}</li>`;
    } else {
      arrayPage = `<li class="pagination__item">1</li><li class="pagination__item-multipoint">...</li><li class="pagination__item">${pageNumber}</li><li class="pagination__item">${
        pageNumber + 1
      }</li><li class="pagination__item">${
        pageNumber + 2
      }</li><li class="pagination__item-multipoint">...</li><li class="pagination__item">${totalPages}</li>`;
    }
  } else {
    let arrayPageLi = [];
    for (let i = 1; i <= totalPages; i++) {
      let elemLi = `<li class="pagination__item">${i}</li>`;
      arrayPageLi.push(elemLi);
      arrayPage = arrayPageLi.join('');
    }
  }
  refs.containerPaginationEl.insertAdjacentHTML('beforeend', arrayPage);
}

export { getDataForMarkupNews, getDataForMarkupPopularNews };
