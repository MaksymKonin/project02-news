document.querySelectorAll(".navigation-list__link");const e={formEl:document.querySelector(".js-form-search"),containerCategoriesEl:document.querySelector(".js-categories"),containerCardEl:document.querySelector(".js-container-card"),weatherCard:document.querySelector(".weather__card"),containerPaginationEl:document.querySelector(".js-pagination"),checkBoxEl:document.querySelector(".theme-switch__toggle"),bodyEl:document.querySelector("body"),dateTimePicker:document.querySelector("#datetime-picker"),calendarWrapper:document.querySelector(".filters-section-calendar-wrapper"),lightTheme:document.querySelector(".light-theme"),darkTheme:document.querySelector(".dark-theme")};const t={light:"light-theme",dark:"dark-theme"},s="themeKey",a=document.querySelector(".theme__track");function r(r){r.target.checked?(console.log(e.darkTheme),e.bodyEl.classList.remove("ligth-theme"),e.bodyEl.classList.add("dark-theme"),e.lightTheme.classList.remove("goLight"),a.classList.add("toggleDark"),a.classList.remove("toggleLight"),localStorage.setItem(s,JSON.stringify(t.dark))):(e.bodyEl.classList.remove("dark-theme"),e.bodyEl.classList.add("ligth-theme"),e.lightTheme.classList.add("goLight"),a.classList.add("toggleLight"),a.classList.remove("toggleDark"),localStorage.setItem(s,JSON.stringify(t.light)))}const o="https://api.nytimes.com/svc/search/v2/articlesearch.json",n="H4EzmbJjzcMKAQjlOxUvVd6TipG3GhzM";new class{getsearchNews(){return fetch(`${o}?q=${this.searchQuery}&page=${this.page}&api-key=${n}`).then((e=>{if(!e.ok)throw new Error(e.statusText);return this.nextPage(),e.json()}))}nextPage(){this.page+=1}resetData(){this.page=0,this.loadCards=0}addLoadCards(e){this.loadCards=this.loadCards+e}getpopularNews(){return fetch(`https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=${n}`).then((e=>{if(!e.ok)throw new Error(e.statusText);return e.json()}))}getlistCategories(){return fetch(`https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${n}`).then((e=>{if(!e.ok)throw new Error(e.statusText);return e.json()}))}getDateAndCategoryNews(e,t){let s="",a="";return t&&(a=`&fq=news_desk:(${t})`),s=e&&null!==e?`?facet_field=day_of_week&facet=true&begin_date=${e}&end_date=${e}&api-key=${n}`:`?api-key=${n}`,fetch(`${o}${s}${a}`).then((e=>{if(!e.ok)throw new Error(e.statusText);return e.json()}))}constructor(){this.searchQuery="",this.SEARCH_BY_DATE_URL=this.page=0,this.loadCards=0}};class i{save(e,t){try{const s=JSON.stringify(t);localStorage.setItem(e,s)}catch(e){console.error(e)}}load(e){try{const t=localStorage.getItem(e);return null===t?void 0:JSON.parse(t)}catch(e){console.error(e)}}loadFilters(){return this.load(this.keySavedFilters)?this.load(this.keySavedFilters):void 0}saveDataFilters(e){let t=this.loadFilters()?this.loadFilters():{};t.selectedDate=e,this.save(this.keySavedFilters,t)}saveCategoriesFilters(e){let t=this.loadFilters()?this.loadFilters():{};t.selectedCategories=e,this.save(this.keySavedFilters,t)}loadDataFilters(){let e=this.loadFilters();return e?.selectedDate?e.selectedDate:null}loadCategoriesFilters(){let e=this.loadFilters();return e?.selectedCategories?e.selectedCategories.join('", "'):'""'}constructor(){this.keySavedFilters="Filters",this.FAVORITES_NEWS="favorite-news"}}const l="have-read-id",d="favorite-news";let c=[],u=[];const h=new i;e.containerCardEl.addEventListener("click",(function(e){"BUTTON"===e.target.nodeName&&location.reload()})),document.querySelectorAll(".navigation-list__link").forEach((e=>{e.classList.contains("navigation-list__link--current")&&e.classList.remove("navigation-list__link--current"),window.location.href.includes(e.getAttribute("href"))&&e.classList.add("navigation-list__link--current")})),e.checkBoxEl.addEventListener("change",r),function(){const a=localStorage.getItem(s);a?"dark-theme"===JSON.parse(a)&&(e.bodyEl.classList.add("dark-theme"),e.checkBoxEl.checked=!0):(e.bodyEl.classList.add("ligth-theme"),localStorage.setItem(s,JSON.stringify(t.light)))}();const m=new i,g=m.load(m.FAVORITES_NEWS);var p;g?(e.weatherCard?.classList.contains("is-display-none")&&e.weatherCard?.classList.remove("is-display-none"),document.querySelector(".not-found-container")&&document.querySelector(".not-found-container").remove(),document.querySelectorAll(".js-card").forEach((e=>{e.remove()})),function(t){console.log("рендер сторінки с paginationPage");let s=t.map((e=>function(e){const{id_news:t,photo_url:s,page_url:a,section:r,statusFavorite:o,title:n,abstract:i,published_date:l}=e;return`\n    <li data-id-news="${t}" class="js-card">\n      <div class="use-text-tape">\n        <span class="status-reed">Have read</span>\n        <span class="job-text">"${r}"</span>\n        <button class="status-favorite add-status add-status-js" type="button">${o}</button>\n        <button class="status-favorite remove-status remove-status-js" type="button">Remove from favorite</button>\n      <div>\n      <div class="card-img-wrapper">\n      <img class="card-img" src="${s}" alt="photo news" />\n      </div>\n      <a href="${a}"><h2 class="page-url">${n}</h2></a>\n      <p class="abstract-text">${i}</p>\n      <div>\n        <span class="published-date">${l}</span>\n        <a class="read-more" target="_blank" href="${a}">Read more</a>\n      </div>\n    </li>\n    `}(e))).join("");e.containerCardEl.insertAdjacentHTML("beforeend",s)}(g),function(e){const t=h.load(d),s=h.load(l);let a=[];s&&s.map((e=>{a.push(e.id)}));let r=[];t&&(t.map((e=>{r.push(e.id_news)})),e.map((e=>{if(r.includes(e.id_news)){const t=document.querySelector(`[data-id-news="${e.id_news}"]`).firstElementChild,s=t.querySelector(".add-status-js"),a=t.querySelector(".remove-status-js");s.style.display="none",a.style.display="block"}a.includes(String(e.id_news))&&(document.querySelector(`[data-id-news="${e.id_news}"]`).firstElementChild.querySelector(".status-reed").style.display="block")})))}(p=g),function(e){let t=h.load(l),s=[];const a=(new Date).getTime(),r=document.querySelectorAll(".read-more");Array.from(r).map((r=>{r.addEventListener("click",(r=>{t=h.load(l),t&&t.map((e=>{s.push(e.id)})),r.target.parentNode.parentNode.parentNode.firstElementChild.style.display="block";const o=r.target.parentNode.parentNode.parentNode.parentNode.dataset.idNews;s.includes(o)||e.map((e=>{if(String(e.id_news)===o){const t={id:o,abstract:e.abstract,page_url:e.page_url,photo_url:e.photo_url,published_date:e.published_date,section:e.section,title:e.title,date:a};c.push(t),h.save(l,c)}}))}))}))}(p),function(e){const t=document.querySelectorAll(".add-status-js");Array.from(t).map((t=>{t.addEventListener("click",(t=>{const s=t.target,a=s.nextElementSibling,r=s.parentNode.parentNode.dataset.idNews;s.style.display="none",a.style.display="block",e.map((e=>{String(e.id_news)===r&&(u.push(e),h.save(d,u))}))}))}))}(p),function(e){const t=document.querySelectorAll(".remove-status-js");let s=Array.from(t),a=[];u=h.load(d)||[],0!==u.length&&u.map((e=>{a.push(e.id_news)})),s.map((t=>{t.addEventListener("click",(t=>{const s=t.target,r=s.previousElementSibling,o=s.parentNode.parentNode.dataset.idNews;r.style.display="block",s.style.display="none",e.map((e=>{if(String(e.id_news)===o){const t=a.indexOf(e.id_news);u.splice(t,1),h.save(d,u)}}))}))}))}(p)):(e.weatherCard?.classList.add("is-display-none"),e.containerCardEl.insertAdjacentHTML("beforeend",'<div class="not-found-container"><h1 class="not-found-title">We haven’t found news from <br/> this category</h1>\n  <div class="not-found-img"></div></div>'));
//# sourceMappingURL=favorite.7b75c494.js.map
