async function createCategories(arr, anchor) {
  renderCategoriesDesktop(arr, anchor);
  renderCategoriesTablet(arr, anchor);
  renderCategoriesMobile(arr, anchor);
  const dropdownCategories = {
    dropdownDesktop: document.querySelector('#dropdownDesktopID'),
    dropdownTablet: document.querySelector('#dropdownTabletID'),
    dropdownMobile: document.querySelector('#dropdownMobileID'),
    dropdownDesktopContainerID: document.querySelector(
      '#dropdownDesktopContainerID'
    ),
    dropdownMobileContainerID: document.querySelector(
      '#dropdownMobileContainerID'
    ),
    dropdownTabletContainerID: document.querySelector(
      '#dropdownTabletContainerID'
    ),
  };
  dropdownCategories.dropdownDesktop.addEventListener('click', () => {
    showBlock(dropdownCategories.dropdownDesktopContainerID);
  });
  dropdownCategories.dropdownDesktopContainerID.addEventListener(
    'mouseleave',
    () => {
      hideBlock(dropdownCategories.dropdownDesktopContainerID);
    }
  );
  dropdownCategories.dropdownMobile.addEventListener('click', () => {
    showBlock(dropdownCategories.dropdownMobileContainerID);
  });

  dropdownCategories.dropdownMobileContainerID.addEventListener(
    'mouseleave',
    () => {
      hideBlock(dropdownCategories.dropdownMobileContainerID);
    }
  );

  dropdownCategories.dropdownTablet.addEventListener('click', () => {
    showBlock(dropdownCategories.dropdownTabletContainerID);
  });

  dropdownCategories.dropdownTabletContainerID.addEventListener(
    'mouseleave',
    () => {
      hideBlock(dropdownCategories.dropdownTabletContainerID);
    }
  );
}

function hideBlock(htmlObj) {
  htmlObj.classList.add('is-hidden');
}
function showBlock(htmlObj) {
  htmlObj.classList.remove('is-hidden');
}

function renderCategoriesDesktop(arr, anchor) {
  const buttonQuantity = 6;
  let buttonString = '';
  let listString = '';
  let finalString = '';
  for (let i = 0; i < buttonQuantity && i < arr.length; i += 1) {
    buttonString += drawCategoryButton(arr[i]);
  }
  for (let i = buttonQuantity; i <= arr.length; i += 1) {
    listString += drawCategoryList(arr[i]);
  }
  finalString = `<div class="categories-form categories-desktop">${buttonString}<div id="dropdownDesktopID" class="btn-categories js-list-others">Others</div><div id="dropdownDesktopContainerID" class="cat-list-container is-hidden"><div class="categories-scrollable">${listString}</div></div></div>`;
  anchor.insertAdjacentHTML('afterbegin', finalString);
}

function renderCategoriesTablet(arr, anchor) {
  const buttonQuantity = 4;
  let buttonString = '';
  let listString = '';
  let finalString = '';
  for (let i = 0; i < buttonQuantity && i < arr.length; i += 1) {
    buttonString += drawCategoryButton(arr[i]);
  }
  for (let i = buttonQuantity; i <= arr.length; i += 1) {
    listString += drawCategoryList(arr[i]);
  }
  finalString = `<div class="categories-form categories-tablet">${buttonString}<div id="dropdownTabletID" class="btn-categories js-list-others">Others</div><div id="dropdownTabletContainerID" class="cat-list-container is-hidden"><div class="categories-scrollable">${listString}</div></div></div>`;
  anchor.insertAdjacentHTML('afterbegin', finalString);
}

function renderCategoriesMobile(arr, anchor) {
  let listString = '';
  let finalString = '';
  for (let i = 0; i <= arr.length; i += 1) {
    listString += drawCategoryList(arr[i]);
  }
  finalString = `<div class="categories-form categories-mobile"><div id="dropdownMobileID" class="btn-categories js-list-others">Categories</div><div id="dropdownMobileContainerID" class="cat-list-container is-hidden"><div class="categories-scrollable">${listString}</div></div></div>`;
  anchor.insertAdjacentHTML('afterbegin', finalString);
}

function drawCategoryButton(text) {
  return `<button class="btn-categories js-category-anchor" type="button" value="${text}">${text}</button>`;
}

function drawCategoryList(text) {
  return `<button class="cat-list-item js-category-anchor" value="${text}">${text}</button>`;
}
export { createCategories };
