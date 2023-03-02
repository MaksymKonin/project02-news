import axios from "axios";

const SELECTED_DATE = "selected-date";
// Перейменувати ключ і змінну
const TEST_SELECTED_CATEGORY = "test-selected-category";

// Видалити після отримання реального ключа START
const testArray = [];
testArray.push("Business", "Sports")

// Значення запишеться іншою людиною
localStorage.setItem(TEST_SELECTED_CATEGORY, JSON.stringify(testArray))
// Видалити після отримання реального ключа END

export default function calendarApiService(date) { 
    let toTimestamp = date.getTime()
    localStorage.setItem(SELECTED_DATE, toTimestamp)

    // Прийом категорій з локал сторідж 
    const paramsFromLocalStorage = localStorage.getItem(TEST_SELECTED_CATEGORY);
    let selectedCategories = null;
    let params = "";
    
    // Перевірка наявності вибраних категорій
    if (paramsFromLocalStorage) { 
        selectedCategories = JSON.parse(paramsFromLocalStorage).join(", ");
        params = `&fq=news_desk:(${selectedCategories})`
    }
        
    const baseUrl = "https://api.nytimes.com/svc/search/v2";
    const apiKey = "H4EzmbJjzcMKAQjlOxUvVd6TipG3GhzM"
    const searchUrl = `/articlesearch.json?pub_date=${toTimestamp}&api-key=${apiKey}`

    return axios.get(`${baseUrl}${searchUrl}${params}`).then(response => {
        if (response.status !== 200 || response.data.response.docs.length === 0) {
            throw new Error(response.status)
        }
        return response.data.response.docs
    })
}
