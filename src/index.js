import createCalendar from "./js/renderCalendar";

createCalendar();

import renderCard from "./js/markupCard";

import apiNews from './js/newsApiService';
console.log(1);

async function search() {
    const response = await apiNews.searchNews('html');
    renderCard(response.response.docs)
  console.log(response.response.docs);
}
search();
