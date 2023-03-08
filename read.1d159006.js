!function(){function e(e){return e&&e.__esModule?e.default:e}var t={};Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")};var a={};function n(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}Object.defineProperty(a,"__esModule",{value:!0}),a.default=function(e,t,a){t&&n(e.prototype,t);a&&n(e,a);return e};var i="https://api.nytimes.com/svc/search/v2/articlesearch.json",s="H4EzmbJjzcMKAQjlOxUvVd6TipG3GhzM",r=(new(function(){"use strict";function n(){e(t)(this,n),this.searchQuery="",this.SEARCH_BY_DATE_URL=this.page=0,this.loadCards=0}return e(a)(n,[{key:"getsearchNews",value:function(){var e=this;return fetch("".concat(i,"?q=").concat(this.searchQuery,"&page=").concat(this.page,"&api-key=").concat(s)).then((function(t){if(!t.ok)throw new Error(t.statusText);return e.nextPage(),t.json()}))}},{key:"nextPage",value:function(){this.page+=1}},{key:"resetData",value:function(){this.page=0,this.loadCards=0}},{key:"addLoadCards",value:function(e){this.loadCards=this.loadCards+e}},{key:"getpopularNews",value:function(){return fetch("".concat("https://api.nytimes.com/svc/mostpopular/v2/viewed","/").concat(7,".json?api-key=").concat(s)).then((function(e){if(!e.ok)throw new Error(e.statusText);return e.json()}))}},{key:"getlistCategories",value:function(){return fetch("".concat("https://api.nytimes.com/svc/news/v3/content/section-list.json","?api-key=").concat(s)).then((function(e){if(!e.ok)throw new Error(e.statusText);return e.json()}))}},{key:"getDateAndCategoryNews",value:function(e,t){var a,n="";return t&&(n="&fq=news_desk:(".concat(t,")")),a=e&&null!==e?"?facet_field=day_of_week&facet=true&begin_date=".concat(e,"&end_date=").concat(e,"&api-key=").concat(s):"?api-key=".concat(s),fetch("".concat(i).concat(a).concat(n)).then((function(e){if(!e.ok)throw new Error(e.statusText);return e.json()}))}}]),n}()),function(){"use strict";function n(){e(t)(this,n),this.keySavedFilters="Filters",this.FAVORITES_NEWS="favorite-news"}return e(a)(n,[{key:"save",value:function(e,t){try{var a=JSON.stringify(t);localStorage.setItem(e,a)}catch(e){console.error(e)}}},{key:"load",value:function(e){try{var t=localStorage.getItem(e);return null===t?void 0:JSON.parse(t)}catch(e){console.error(e)}}},{key:"loadFilters",value:function(){return this.load(this.keySavedFilters)?this.load(this.keySavedFilters):void 0}},{key:"saveDataFilters",value:function(e){var t=this.loadFilters()?this.loadFilters():{};t.selectedDate=e,this.save(this.keySavedFilters,t)}},{key:"saveCategoriesFilters",value:function(e){var t=this.loadFilters()?this.loadFilters():{};t.selectedCategories=e,this.save(this.keySavedFilters,t)}},{key:"loadDataFilters",value:function(){var e=this.loadFilters();return(null==e?void 0:e.selectedDate)?e.selectedDate:null}},{key:"loadCategoriesFilters",value:function(){var e=this.loadFilters();return(null==e?void 0:e.selectedCategories)?e.selectedCategories.join('", "'):'""'}}]),n}());document.querySelectorAll(".navigation-list__link");var c={formEl:document.querySelector(".js-form-search"),containerCategoriesEl:document.querySelector(".js-categories"),containerCardEl:document.querySelector(".js-container-card"),weatherCard:document.querySelector(".weather__card"),containerPaginationEl:document.querySelector(".js-pagination"),checkBoxEl:document.querySelector(".theme-switch__toggle"),bodyEl:document.querySelector("body"),dateTimePicker:document.querySelector("#datetime-picker"),calendarWrapper:document.querySelector(".filters-section-calendar-wrapper")};var o="light-theme",l="dark-theme",d="themeKey";function u(e){e.target.checked?(c.bodyEl.classList.remove("ligth-theme"),c.bodyEl.classList.add("dark-theme"),localStorage.setItem(d,JSON.stringify(l))):(c.bodyEl.classList.remove("dark-theme"),c.bodyEl.classList.add("ligth-theme"),localStorage.setItem(d,JSON.stringify(o)))}var h,v=new r;document.querySelectorAll(".navigation-list__link").forEach((function(e){e.classList.contains("navigation-list__link--current")&&e.classList.remove("navigation-list__link--current"),window.location.href.includes(e.getAttribute("href"))&&e.classList.add("navigation-list__link--current")})),c.checkBoxEl.addEventListener("change",u),(h=localStorage.getItem(d))?"dark-theme"===JSON.parse(h)&&(c.bodyEl.classList.add("dark-theme"),c.checkBoxEl.checked=!0):(c.bodyEl.classList.add("ligth-theme"),localStorage.setItem(d,JSON.stringify(o)));var m="readNews";v.save(m,[{id:1,title:"News 1 title",description:"News 1 description",imgUrl:"https://cdn.cnn.com/cnnnext/dam/assets/230302094821-05-mv-gemini-cruise-ship-large-tease.jpg",createdDate:"2023-03-01T16:17:30.814Z",lastReadDate:"2023-03-02T16:17:30.814Z"},{id:2,title:"News 2 title",description:"News 2 description",imgUrl:"https://cdn.cnn.com/cnnnext/dam/assets/230302094821-05-mv-gemini-cruise-ship-large-tease.jpg",createdDate:"2023-03-01T16:17:30.814Z",lastReadDate:"2023-03-01T16:17:30.814Z"},{id:3,title:"News 3 title",description:"News 3 description",imgUrl:"https://cdn.cnn.com/cnnnext/dam/assets/230302094821-05-mv-gemini-cruise-ship-large-tease.jpg",createdDate:"2023-03-01T16:17:30.814Z",lastReadDate:"2023-03-02T16:17:30.814Z"},{id:4,title:"News 4 title",description:"News 4 description",imgUrl:"https://cdn.cnn.com/cnnnext/dam/assets/230302094821-05-mv-gemini-cruise-ship-large-tease.jpg",createdDate:"2023-03-01T16:17:30.814Z",lastReadDate:"2023-03-02T16:17:30.814Z"},{id:5,title:"News 5 title",description:"News 5 description",imgUrl:"https://cdn.cnn.com/cnnnext/dam/assets/230302094821-05-mv-gemini-cruise-ship-large-tease.jpg",createdDate:"2023-03-01T16:17:30.814Z",lastReadDate:"2023-03-01T16:17:30.814Z"},{id:6,title:"News 6 title",description:"News 6 description",imgUrl:"https://cdn.cnn.com/cnnnext/dam/assets/230302094821-05-mv-gemini-cruise-ship-large-tease.jpg",createdDate:"2023-03-01T16:17:30.814Z",lastReadDate:"2023-03-03T16:17:30.814Z"},{id:7,title:"News 7 title",description:"News 7 description",imgUrl:"https://cdn.cnn.com/cnnnext/dam/assets/230302094821-05-mv-gemini-cruise-ship-large-tease.jpg",createdDate:"2023-03-01T16:17:30.814Z",lastReadDate:"2023-03-03T16:17:30.814Z"}]);var g,p=v.load(m);!function(e){var t=document.querySelector("#read-container");Object.keys(e).forEach((function(a){var n,i,s='<button class="accordion"><div class="accordion-date">'.concat(a,'</div></button>\n      <div class="panel">\n        ').concat((n=e[a],i="",n.forEach((function(e){i+="<p>".concat(e.title,"</p>")})),i),"\n      </div>");t.insertAdjacentHTML("beforeend",s)})),function(){var e,t=document.getElementsByClassName("accordion");for(e=0;e<t.length;e++)t[e].addEventListener("click",(function(){this.classList.toggle("active");var e=this.nextElementSibling;"block"===e.style.display?e.style.display="none":e.style.display="block"}))}()}((g={},p.forEach((function(e){var t=e.lastReadDate.split("T")[0];t in g?g[t].push(e):g[t]=new Array(e)})),g))}();
//# sourceMappingURL=read.1d159006.js.map
