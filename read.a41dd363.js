new class{getsearchNews(){return fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${this.searchQuery}&page=${this.page}&api-key=H4EzmbJjzcMKAQjlOxUvVd6TipG3GhzM`).then((e=>{if(!e.ok)throw new Error(e.statusText);return this.nextPage(),e.json()}))}nextPage(){this.page+=1}resetData(){this.page=0,this.loadCards=0}addLoadCards(e){this.loadCards=this.loadCards+e}getpopularNews(){return fetch("https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=H4EzmbJjzcMKAQjlOxUvVd6TipG3GhzM").then((e=>{if(!e.ok)throw new Error(e.statusText);return e.json()}))}getlistCategories(){return fetch("https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=H4EzmbJjzcMKAQjlOxUvVd6TipG3GhzM").then((e=>{if(!e.ok)throw new Error(e.statusText);return e.json()}))}getDateAndCategoryNews(e,t){let s="",i="";return t&&(i=`&fq=news_desk:(${t})`),s=e&&null!==e?`?facet_field=day_of_week&facet=true&begin_date=${e}&end_date=${e}&api-key=H4EzmbJjzcMKAQjlOxUvVd6TipG3GhzM`:"?api-key=H4EzmbJjzcMKAQjlOxUvVd6TipG3GhzM",fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json${s}${i}`).then((e=>{if(!e.ok)throw new Error(e.statusText);return e.json()}))}constructor(){this.searchQuery="",this.SEARCH_BY_DATE_URL=this.page=0,this.loadCards=0}};document.querySelectorAll(".navigation-list__link");const e={formEl:document.querySelector(".js-form-search"),containerCategoriesEl:document.querySelector(".js-categories"),containerCardEl:document.querySelector(".js-container-card"),weatherCard:document.querySelector(".weather__card"),containerPaginationEl:document.querySelector(".js-pagination"),checkBoxEl:document.querySelector(".theme-switch__toggle"),bodyEl:document.querySelector("body"),dateTimePicker:document.querySelector("#datetime-picker"),calendarWrapper:document.querySelector(".filters-section-calendar-wrapper")};const t="light-theme",s="dark-theme";function i(i){i.target.checked?(e.bodyEl.classList.remove("ligth-theme"),e.bodyEl.classList.add("dark-theme"),localStorage.setItem("themeKey",JSON.stringify(s))):(e.bodyEl.classList.remove("dark-theme"),e.bodyEl.classList.add("ligth-theme"),localStorage.setItem("themeKey",JSON.stringify(t)))}const a=new class{save(e,t){try{const s=JSON.stringify(t);localStorage.setItem(e,s)}catch(e){console.error(e)}}load(e){try{const t=localStorage.getItem(e);return null===t?void 0:JSON.parse(t)}catch(e){console.error(e)}}loadFilters(){return this.load(this.keySavedFilters)?this.load(this.keySavedFilters):void 0}saveDataFilters(e){let t=this.loadFilters()?this.loadFilters():{};t.selectedDate=e,this.save(this.keySavedFilters,t)}saveCategoriesFilters(e){let t=this.loadFilters()?this.loadFilters():{};t.selectedCategories=e,this.save(this.keySavedFilters,t)}loadDataFilters(){let e=this.loadFilters();return e?.selectedDate?e.selectedDate:null}loadCategoriesFilters(){let e=this.loadFilters();return e?.selectedCategories?e.selectedCategories.join('", "'):'""'}constructor(){this.keySavedFilters="Filters",this.FAVORITES_NEWS="favorite-news"}};document.querySelectorAll(".navigation-list__link").forEach((e=>{e.classList.contains("navigation-list__link--current")&&e.classList.remove("navigation-list__link--current"),window.location.href.includes(e.getAttribute("href"))&&e.classList.add("navigation-list__link--current")})),e.checkBoxEl.addEventListener("change",i),function(){const s=localStorage.getItem("themeKey");s?"dark-theme"===JSON.parse(s)&&(e.bodyEl.classList.add("dark-theme"),e.checkBoxEl.checked=!0):(e.bodyEl.classList.add("ligth-theme"),localStorage.setItem("themeKey",JSON.stringify(t)))}();a.save("readNews",[{id:1,title:"News 1 title",description:"News 1 description",imgUrl:"https://cdn.cnn.com/cnnnext/dam/assets/230302094821-05-mv-gemini-cruise-ship-large-tease.jpg",createdDate:"2023-03-01T16:17:30.814Z",lastReadDate:"2023-03-02T16:17:30.814Z"},{id:2,title:"News 2 title",description:"News 2 description",imgUrl:"https://cdn.cnn.com/cnnnext/dam/assets/230302094821-05-mv-gemini-cruise-ship-large-tease.jpg",createdDate:"2023-03-01T16:17:30.814Z",lastReadDate:"2023-03-01T16:17:30.814Z"},{id:3,title:"News 3 title",description:"News 3 description",imgUrl:"https://cdn.cnn.com/cnnnext/dam/assets/230302094821-05-mv-gemini-cruise-ship-large-tease.jpg",createdDate:"2023-03-01T16:17:30.814Z",lastReadDate:"2023-03-02T16:17:30.814Z"},{id:4,title:"News 4 title",description:"News 4 description",imgUrl:"https://cdn.cnn.com/cnnnext/dam/assets/230302094821-05-mv-gemini-cruise-ship-large-tease.jpg",createdDate:"2023-03-01T16:17:30.814Z",lastReadDate:"2023-03-02T16:17:30.814Z"},{id:5,title:"News 5 title",description:"News 5 description",imgUrl:"https://cdn.cnn.com/cnnnext/dam/assets/230302094821-05-mv-gemini-cruise-ship-large-tease.jpg",createdDate:"2023-03-01T16:17:30.814Z",lastReadDate:"2023-03-01T16:17:30.814Z"},{id:6,title:"News 6 title",description:"News 6 description",imgUrl:"https://cdn.cnn.com/cnnnext/dam/assets/230302094821-05-mv-gemini-cruise-ship-large-tease.jpg",createdDate:"2023-03-01T16:17:30.814Z",lastReadDate:"2023-03-03T16:17:30.814Z"},{id:7,title:"News 7 title",description:"News 7 description",imgUrl:"https://cdn.cnn.com/cnnnext/dam/assets/230302094821-05-mv-gemini-cruise-ship-large-tease.jpg",createdDate:"2023-03-01T16:17:30.814Z",lastReadDate:"2023-03-03T16:17:30.814Z"}]);!function(e){const t=document.querySelector("#read-container");Object.keys(e).forEach((s=>{const i=`<button class="accordion"><div class="accordion-date">${s}</div></button>\n      <div class="panel">\n        ${function(e){let t="";return e.forEach((e=>{t+=`<p>${e.title}</p>`})),t}(e[s])}\n      </div>`;t.insertAdjacentHTML("beforeend",i)})),function(){const e=document.getElementsByClassName("accordion");var t;for(t=0;t<e.length;t++)e[t].addEventListener("click",(function(){this.classList.toggle("active");var e=this.nextElementSibling;"block"===e.style.display?e.style.display="none":e.style.display="block"}))}()}(function(e){const t={};return e.forEach((e=>{const s=e.lastReadDate.split("T")[0];s in t?t[s].push(e):t[s]=new Array(e)})),t}(a.load("readNews")));
//# sourceMappingURL=read.a41dd363.js.map
