var e={save:function(e,t){try{const s=JSON.stringify(t);localStorage.setItem(e,s)}catch(e){console.error(e)}},load:function(e){try{const t=localStorage.getItem(e);return null===t?void 0:JSON.parse(t)}catch(e){console.error(e)}}};document.querySelectorAll(".navigation-list__link");const t={formEl:document.querySelector(".js-form-search"),containerCategoriesEl:document.querySelector(".js-categories"),containerCardEl:document.querySelector(".js-container-card"),containerPaginationEl:document.querySelector(".js-pagination"),checkBoxEl:document.querySelector(".theme-switch__toggle"),bodyEl:document.querySelector("body")};const s="light-theme",i="dark-theme";function n(e){e.target.checked?(t.bodyEl.classList.remove("ligth-theme"),t.bodyEl.classList.add("dark-theme"),localStorage.setItem("themeKey",JSON.stringify(i))):(t.bodyEl.classList.remove("dark-theme"),t.bodyEl.classList.add("ligth-theme"),localStorage.setItem("themeKey",JSON.stringify(s)))}console.log(1),document.querySelectorAll(".navigation-list__link").forEach((e=>{e.classList.contains("navigation-list__link--current")&&e.classList.remove("navigation-list__link--current"),window.location.href.includes(e.getAttribute("href"))&&e.classList.add("navigation-list__link--current")})),t.checkBoxEl.addEventListener("change",n),function(){const e=localStorage.getItem("themeKey");e?"dark-theme"===JSON.parse(e)&&(t.bodyEl.classList.add("dark-theme"),t.checkBoxEl.checked=!0):(t.bodyEl.classList.add("ligth-theme"),localStorage.setItem("themeKey",JSON.stringify(s)))}();e.save("readNews",[{id:1,title:"News 1 title",description:"News 1 description",imgUrl:"https://cdn.cnn.com/cnnnext/dam/assets/230302094821-05-mv-gemini-cruise-ship-large-tease.jpg",createdDate:"2023-03-01T16:17:30.814Z",lastReadDate:"2023-03-02T16:17:30.814Z"},{id:2,title:"News 2 title",description:"News 2 description",imgUrl:"https://cdn.cnn.com/cnnnext/dam/assets/230302094821-05-mv-gemini-cruise-ship-large-tease.jpg",createdDate:"2023-03-01T16:17:30.814Z",lastReadDate:"2023-03-01T16:17:30.814Z"},{id:3,title:"News 3 title",description:"News 3 description",imgUrl:"https://cdn.cnn.com/cnnnext/dam/assets/230302094821-05-mv-gemini-cruise-ship-large-tease.jpg",createdDate:"2023-03-01T16:17:30.814Z",lastReadDate:"2023-03-02T16:17:30.814Z"},{id:4,title:"News 4 title",description:"News 4 description",imgUrl:"https://cdn.cnn.com/cnnnext/dam/assets/230302094821-05-mv-gemini-cruise-ship-large-tease.jpg",createdDate:"2023-03-01T16:17:30.814Z",lastReadDate:"2023-03-02T16:17:30.814Z"},{id:5,title:"News 5 title",description:"News 5 description",imgUrl:"https://cdn.cnn.com/cnnnext/dam/assets/230302094821-05-mv-gemini-cruise-ship-large-tease.jpg",createdDate:"2023-03-01T16:17:30.814Z",lastReadDate:"2023-03-01T16:17:30.814Z"},{id:6,title:"News 6 title",description:"News 6 description",imgUrl:"https://cdn.cnn.com/cnnnext/dam/assets/230302094821-05-mv-gemini-cruise-ship-large-tease.jpg",createdDate:"2023-03-01T16:17:30.814Z",lastReadDate:"2023-03-03T16:17:30.814Z"},{id:7,title:"News 7 title",description:"News 7 description",imgUrl:"https://cdn.cnn.com/cnnnext/dam/assets/230302094821-05-mv-gemini-cruise-ship-large-tease.jpg",createdDate:"2023-03-01T16:17:30.814Z",lastReadDate:"2023-03-03T16:17:30.814Z"}]);!function(e){const t=document.querySelector("#read-container");Object.keys(e).forEach((s=>{const i=`<button class="accordion"><div class="accordion-date">${s}</div></button>\n      <div class="panel">\n        ${function(e){let t="";return e.forEach((e=>{t+=`<p>${e.title}</p>`})),t}(e[s])}\n      </div>`;t.insertAdjacentHTML("beforeend",i)})),function(){const e=document.getElementsByClassName("accordion");var t;for(t=0;t<e.length;t++)e[t].addEventListener("click",(function(){this.classList.toggle("active");var e=this.nextElementSibling;"block"===e.style.display?e.style.display="none":e.style.display="block"}))}()}(function(e){const t={};return e.forEach((e=>{const s=e.lastReadDate.split("T")[0];s in t?t[s].push(e):t[s]=new Array(e)})),t}(e.load("readNews")));
//# sourceMappingURL=read.38e864a9.js.map
