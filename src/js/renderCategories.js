import axios from "axios";

const API_KEY = 'H4EzmbJjzcMKAQjlOxUvVd6TipG3GhzM';
const CATEGORIES_LIST_URL =   'https://api.nytimes.com/svc/news/v3/content/section-list.json';


getlistCategories()
{
    return fetch(`${CATEGORIES_LIST_URL}?api-key=${API_KEY}`)
        .then(responce => {
            if (!responce.ok)
            {
                throw new Error(responce.statusText);
            } return responce.json();
        });
}

const murkupMainCategory = document.querySelector('.btn-categories');
const otherCategory = document.querySelector('.btn-others');
getlistCategories.fetchCategories();
async function renderCategoryMurkup() {
    const categorArr= await getlistCategories.fetchCategories();
}
