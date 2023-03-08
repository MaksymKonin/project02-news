import { refs } from './refs';
const countCardsOnPage = 8;
const pageNum = 1; //// при першій загрузці

export function renderPagination(queryStorage) {
  console.log('Отримую queryStorage',queryStorage)
  refs.containerPaginationEl.innerHTML = '';

  const totalPages = Math.ceil(queryStorage.length / countCardsOnPage);
  console.log('Всьго сторінок', totalPages)
  let arrayLi = [];
  for (let i = 1; i <= totalPages; i++) {
    // в Li записую номер ітераціі === відповідає номеру сторінки
    let elemLi = `<li class="pagination__item">${i}</li>`;
    arrayLi.push(elemLi);
  }
  refs.containerPaginationEl.insertAdjacentHTML('beforeend', arrayLi.join(''));
  const firstListItem = document.querySelector('.js-pagination li:first-child');
  firstListItem.classList.add('pagination__item--current-page');
  let paginationPage = onSlicePage(pageNum, queryStorage);
  // отримали масив новин потрібного розміру, який треба розмістити на сторінці з картками
  return paginationPage;
}


//  коли слухач поймай подію клику на пагинаторі визивається  ця фун-ція
//  (тобто коритувач натиснув "кнопку" переходу на iншу сторінку)
export function onSlicePage(pageNum, queryStorage) {
  let start = (pageNum - 1) * countCardsOnPage;
  let end = start + countCardsOnPage;
  let paginationPage = queryStorage.slice(start, end);
  // console.log("відрізали масив з 8 новин", paginationPage);
  return paginationPage;
}

// змінює клас/колір обраной кнопки-сторінки
export function activePageOnPagination(pageNum) {
  const listItems = document.querySelectorAll('.js-pagination li');
  for (let i = 0; i < listItems.length; i++) {
    if (listItems[i].classList.contains('pagination__item--current-page')) {
      listItems[i].classList.remove('pagination__item--current-page');
    }
    if (listItems[i].innerHTML === pageNum) {
      listItems[i].classList.add('pagination__item--current-page');
    }
  }
}

// ----------------------------додати кнопки prew та next -----------------------
// const prevButton = document.createElement('button');
//       prevButton.textContent = 'Prew';
//       prevButton.classList.add('prev-page');
//       prevButton.onclick = function() {
//       pageNum = pageNum - 1  // якщо  pageNum = 1 то додати  класс disable ---  prevButton.classList.add('disable');
// };
// const nextButton = document.createElement('button');
//       nextButton.textContent = 'Next';
//       nextButton.classList.add('next-page');
//       nextButton.onclick = function() {
//       pageNum = pageNum + 1  //якщо  pageNum = totalPages   то додати  класс disable ---  prevButton.classList.add('disable');
// };
//  const paginationList = document.querySelector('.js-pagination');
//   paginationList.insertAdjacentElement('beforebegin',prevButton );
//   paginationList.insertAdjacentElement('afterend', nextButton);
// function hideBtn(elem) {
//   elem.classList.add('disable');
// }
// function showBtn() {
//   elem.classList.remove('disable');
// }

// // ---------------------------------------------------------------------------------------------
