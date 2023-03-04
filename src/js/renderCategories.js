import axios from "axios";


const API_KEY = 'H4EzmbJjzcMKAQjlOxUvVd6TipG3GhzM';
const CATEGORIES_LIST_URL = 'https://api.nytimes.com/svc/news/v3/content/section-list.json'

getcategoryNews()
{
    return fetch(`${CATEGORIES_NEWS_URL}/${this.selectedСategories}.json?api-key=${API_KEY}`).then(responce => {
        if (!responce.ok) { throw new Error(responce.statusText); } return responce.json()
    })
}


/* Слухач подій */
function myFunction() {
  document.getElementById("listCategory").classList.toggle("show");
}
// Закриття закриваючого списку, якщо клікнути за межами списку.
window.onclick = function(event) {
  if (!event.target.matches('.btn')) {
    const dropdowns = document.getElementsByClassName("categories");
    i;
    for (i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
