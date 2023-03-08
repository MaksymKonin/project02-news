!function(){const e="https://api.nytimes.com/svc/search/v2/articlesearch.json",t="H4EzmbJjzcMKAQjlOxUvVd6TipG3GhzM";new class{getsearchNews(){return fetch(`${e}?q=${this.searchQuery}&page=${this.page}&api-key=${t}`).then((e=>{if(!e.ok)throw new Error(e.statusText);return this.nextPage(),e.json()}))}nextPage(){this.page+=1}resetData(){this.page=0,this.loadCards=0}addLoadCards(e){this.loadCards=this.loadCards+e}getpopularNews(){return fetch(`https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=${t}`).then((e=>{if(!e.ok)throw new Error(e.statusText);return e.json()}))}getlistCategories(){return fetch(`https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${t}`).then((e=>{if(!e.ok)throw new Error(e.statusText);return e.json()}))}getDateAndCategoryNews(s,a){let r="",o="";return a&&(o=`&fq=news_desk:(${a})`),r=s&&null!==s?`?facet_field=day_of_week&facet=true&begin_date=${s}&end_date=${s}&api-key=${t}`:`?api-key=${t}`,fetch(`${e}${r}${o}`).then((e=>{if(!e.ok)throw new Error(e.statusText);return e.json()}))}constructor(){this.searchQuery="",this.SEARCH_BY_DATE_URL=this.page=0,this.loadCards=0}};document.querySelectorAll(".navigation-list__link");const s={formEl:document.querySelector(".js-form-search"),containerCategoriesEl:document.querySelector(".js-categories"),containerCardEl:document.querySelector(".js-container-card"),weatherCard:document.querySelector(".weather__card"),containerPaginationEl:document.querySelector(".js-pagination"),checkBoxEl:document.querySelector(".theme-switch__toggle"),bodyEl:document.querySelector("body"),dateTimePicker:document.querySelector("#datetime-picker"),calendarWrapper:document.querySelector(".filters-section-calendar-wrapper"),lightTheme:document.querySelector(".light-theme"),darkTheme:document.querySelector(".darh-theme")};const a={light:"light-theme",dark:"dark-theme"},r="themeKey",o=document.querySelector(".theme__track");function n(e){e.target.checked?(s.bodyEl.classList.remove("ligth-theme"),s.bodyEl.classList.add("dark-theme"),s.darkTheme.classList.add("goDark"),s.lightTheme.classList.remove("goLight"),o.classList.add("toggleDark"),o.classList.remove("toggleLight"),localStorage.setItem(r,JSON.stringify(a.dark))):(s.bodyEl.classList.remove("dark-theme"),s.bodyEl.classList.add("ligth-theme"),s.darkTheme.classList.remove("goDark"),s.lightTheme.classList.add("goLight"),o.classList.add("toggleLight"),o.classList.remove("toggleDark"),localStorage.setItem(r,JSON.stringify(a.light)))}function i(e){const{id_news:t,photo_url:s,page_url:a,section:r,statusFavorite:o,title:n,abstract:i,published_date:l}=e;return`\n    <li data-id-news="${t}" class="js-card">\n      <div class="use-text-tape">\n        <span class="status-reed">Have read</span>\n        <span class="job-text">"${r}"</span>\n        <button class="status-favorite add-status add-status-js" type="button">${o}</button>\n        <button class="status-favorite remove-status remove-status-js" type="button">Remove from favorite</button>\n      <div>\n      <div class="card-img-wrapper">\n      <img class="card-img" src="${s}" alt="photo news" />\n      </div>\n      <a href="${a}"><h2 class="page-url">${n}</h2></a>\n      <p class="abstract-text">${i}</p>\n      <div>\n        <span class="published-date">${l}</span>\n        <a class="read-more" target="_blank" href="${a}">Read more</a>\n      </div>\n    </li>\n    `}const l=new class{save(e,t){try{const s=JSON.stringify(t);localStorage.setItem(e,s)}catch(e){console.error(e)}}load(e){try{const t=localStorage.getItem(e);return null===t?void 0:JSON.parse(t)}catch(e){console.error(e)}}loadFilters(){return this.load(this.keySavedFilters)?this.load(this.keySavedFilters):void 0}saveDataFilters(e){let t=this.loadFilters()?this.loadFilters():{};t.selectedDate=e,this.save(this.keySavedFilters,t)}saveCategoriesFilters(e){let t=this.loadFilters()?this.loadFilters():{};t.selectedCategories=e,this.save(this.keySavedFilters,t)}loadDataFilters(){let e=this.loadFilters();return e?.selectedDate?e.selectedDate:null}loadCategoriesFilters(){let e=this.loadFilters();return e?.selectedCategories?e.selectedCategories.join('", "'):'""'}constructor(){this.keySavedFilters="Filters",this.FAVORITES_NEWS="favorite-news"}};document.querySelectorAll(".navigation-list__link").forEach((e=>{e.classList.contains("navigation-list__link--current")&&e.classList.remove("navigation-list__link--current"),window.location.href.includes(e.getAttribute("href"))&&e.classList.add("navigation-list__link--current")})),s.checkBoxEl.addEventListener("change",n),function(){const e=localStorage.getItem(r);e?"dark-theme"===JSON.parse(e)&&(s.bodyEl.classList.add("dark-theme"),s.checkBoxEl.checked=!0):(s.bodyEl.classList.add("ligth-theme"),localStorage.setItem(r,JSON.stringify(a.light)))}();const c=l.load("have-read-id");if(c&&c.length>1){!function(e){const t=document.querySelector("#read-container");Object.keys(e).forEach((s=>{const a=`<button class="accordion"><div class="accordion-date">${s}</div></button>\n      <div class="panel">\n       <ul class="news-container">\n       ${r=e[s],r.map((e=>i(e))).join("")}</ul>\n      </div>`;var r;t.insertAdjacentHTML("beforeend",a)})),function(){const e=document.getElementsByClassName("accordion");var t;for(t=0;t<e.length;t++)e[t].addEventListener("click",(function(){this.classList.toggle("active");var e=this.nextElementSibling;"block"===e.style.display?e.style.display="none":e.style.display="block"}))}()}(function(e){const t={};return e.forEach((e=>{const s=new Date(e.date).toISOString().split("T")[0].split("-").join("/");s in t?t[s].push(e):t[s]=new Array(e)})),t}(c))}else s.weatherCard?.classList.add("is-display-none"),console.log(s.weatherCard),console.log("is-display-none"),s.containerCardEl.insertAdjacentHTML("beforeend",'<div class="not-found-container"><h1 class="not-found-title">We haven’t found news from <br/> this category</h1>\n  <div class="not-found-img"></div></div>')}();
//# sourceMappingURL=read.ac968fea.js.map
