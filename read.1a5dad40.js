!function(){function e(e){return e&&e.__esModule?e.default:e}var t={};Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")};var a={};function i(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}Object.defineProperty(a,"__esModule",{value:!0}),a.default=function(e,t,a){t&&i(e.prototype,t);a&&i(e,a);return e};var n=function(){"use strict";function i(){e(t)(this,i),this.keySavedFilters="Filters"}return e(a)(i,[{key:"save",value:function(e,t){try{var a=JSON.stringify(t);localStorage.setItem(e,a)}catch(e){console.error(e)}}},{key:"load",value:function(e){try{var t=localStorage.getItem(e);return null===t?void 0:JSON.parse(t)}catch(e){console.error(e)}}},{key:"loadFilters",value:function(){return this.load(this.keySavedFilters)?this.load(this.keySavedFilters):void 0}}]),i}();document.querySelectorAll(".navigation-list__link");var s={formEl:document.querySelector(".js-form-search"),containerCategoriesEl:document.querySelector(".js-categories"),containerCardEl:document.querySelector(".js-container-card"),weatherCard:document.querySelector(".weather__card"),containerPaginationEl:document.querySelector(".js-pagination"),checkBoxEl:document.querySelector(".theme-switch__toggle"),bodyEl:document.querySelector("body")};var c,r="light-theme",l="dark-theme",o="themeKey";function d(e){e.target.checked?(s.bodyEl.classList.remove("ligth-theme"),s.bodyEl.classList.add("dark-theme"),localStorage.setItem(o,JSON.stringify(l))):(s.bodyEl.classList.remove("dark-theme"),s.bodyEl.classList.add("ligth-theme"),localStorage.setItem(o,JSON.stringify(r)))}console.log(1),document.querySelectorAll(".navigation-list__link").forEach((function(e){e.classList.contains("navigation-list__link--current")&&e.classList.remove("navigation-list__link--current"),window.location.href.includes(e.getAttribute("href"))&&e.classList.add("navigation-list__link--current")})),s.checkBoxEl.addEventListener("change",d),(c=localStorage.getItem(o))?"dark-theme"===JSON.parse(c)&&(s.bodyEl.classList.add("dark-theme"),s.checkBoxEl.checked=!0):(s.bodyEl.classList.add("ligth-theme"),localStorage.setItem(o,JSON.stringify(r)));var u="readNews";n.save(u,[{id:1,title:"News 1 title",description:"News 1 description",imgUrl:"https://cdn.cnn.com/cnnnext/dam/assets/230302094821-05-mv-gemini-cruise-ship-large-tease.jpg",createdDate:"2023-03-01T16:17:30.814Z",lastReadDate:"2023-03-02T16:17:30.814Z"},{id:2,title:"News 2 title",description:"News 2 description",imgUrl:"https://cdn.cnn.com/cnnnext/dam/assets/230302094821-05-mv-gemini-cruise-ship-large-tease.jpg",createdDate:"2023-03-01T16:17:30.814Z",lastReadDate:"2023-03-01T16:17:30.814Z"},{id:3,title:"News 3 title",description:"News 3 description",imgUrl:"https://cdn.cnn.com/cnnnext/dam/assets/230302094821-05-mv-gemini-cruise-ship-large-tease.jpg",createdDate:"2023-03-01T16:17:30.814Z",lastReadDate:"2023-03-02T16:17:30.814Z"},{id:4,title:"News 4 title",description:"News 4 description",imgUrl:"https://cdn.cnn.com/cnnnext/dam/assets/230302094821-05-mv-gemini-cruise-ship-large-tease.jpg",createdDate:"2023-03-01T16:17:30.814Z",lastReadDate:"2023-03-02T16:17:30.814Z"},{id:5,title:"News 5 title",description:"News 5 description",imgUrl:"https://cdn.cnn.com/cnnnext/dam/assets/230302094821-05-mv-gemini-cruise-ship-large-tease.jpg",createdDate:"2023-03-01T16:17:30.814Z",lastReadDate:"2023-03-01T16:17:30.814Z"},{id:6,title:"News 6 title",description:"News 6 description",imgUrl:"https://cdn.cnn.com/cnnnext/dam/assets/230302094821-05-mv-gemini-cruise-ship-large-tease.jpg",createdDate:"2023-03-01T16:17:30.814Z",lastReadDate:"2023-03-03T16:17:30.814Z"},{id:7,title:"News 7 title",description:"News 7 description",imgUrl:"https://cdn.cnn.com/cnnnext/dam/assets/230302094821-05-mv-gemini-cruise-ship-large-tease.jpg",createdDate:"2023-03-01T16:17:30.814Z",lastReadDate:"2023-03-03T16:17:30.814Z"}]);var m,g=n.load(u);!function(e){var t=document.querySelector("#read-container");Object.keys(e).forEach((function(a){var i,n,s='<button class="accordion"><div class="accordion-date">'.concat(a,'</div></button>\n      <div class="panel">\n        ').concat((i=e[a],n="",i.forEach((function(e){n+="<p>".concat(e.title,"</p>")})),n),"\n      </div>");t.insertAdjacentHTML("beforeend",s)})),function(){var e,t=document.getElementsByClassName("accordion");for(e=0;e<t.length;e++)t[e].addEventListener("click",(function(){this.classList.toggle("active");var e=this.nextElementSibling;"block"===e.style.display?e.style.display="none":e.style.display="block"}))}()}((m={},g.forEach((function(e){var t=e.lastReadDate.split("T")[0];t in m?m[t].push(e):m[t]=new Array(e)})),m))}();
//# sourceMappingURL=read.1a5dad40.js.map
