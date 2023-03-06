async function createCategories(arr, anchor) {
  renderCategoriesDesktop(arr, anchor);
  renderCategoriesTablet(arr, anchor);
  renderCategoriesMobile(arr, anchor);
}

function renderCategoriesDesktop(arr, anchor) {
  console.log('for Desktop');
  console.log(arr);
  const buttonQuantity = 6;
  let buttonString = '';
  let listString = '';
  let finalString = '';
  for (let i = 0; i < buttonQuantity && i < arr.length; i += 1) {
    // console.log('button->', arr[i]);
    buttonString += drawCategoryButton(arr[i]);
  }
  for (let i = buttonQuantity; i <= arr.length; i += 1) {
    // console.log('item->', arr[i]);
    listString += drawCategoryList(arr[i]);
  }
  finalString = `<form class="categories-form categories-desktop">${buttonString}<select name="items" class="btn-categories-others"><option class="filters-section-categories" value="" disabled selected hidden>Others</option>${listString}</select></form>`;
  // console.log(finalString);
  anchor.insertAdjacentHTML('afterbegin', finalString);
}

function renderCategoriesTablet(arr, anchor) {
  console.log('for Tablet');
  console.log(arr);
  const buttonQuantity = 4;
  let buttonString = '';
  let listString = '';
  let finalString = '';
  for (let i = 0; i < buttonQuantity && i < arr.length; i += 1) {
    // console.log('button->', arr[i]);
    buttonString += drawCategoryButton(arr[i]);
  }
  for (let i = buttonQuantity; i <= arr.length; i += 1) {
    // console.log('item->', arr[i]);
    listString += drawCategoryList(arr[i]);
  }
  finalString = `<form class="categories-form categories-tablet">${buttonString}<select name="items" class="btn-categories-others"><option class="filters-section-categories" value="" disabled selected hidden>Others</option>${listString}</select></form>`;
  // console.log('tablet string:', finalString);
  anchor.insertAdjacentHTML('afterbegin', finalString);
}
function renderCategoriesMobile(arr, anchor) {
  console.log('for Mobile');
  console.log(arr);
  let listString = '';
  let finalString = '';
  for (let i = 0; i <= arr.length; i += 1) {
    // console.log('item->', arr[i]);
    listString += drawCategoryList(arr[i]);
  }
  finalString = `<form class="categories-form categories-mobile"><select name="items" class="btn-categories-others"><option class="filters-section-categories" value="" disabled selected hidden>Categories</option>${listString}</select></form>`;
  // console.log('tablet string:', finalString);
  anchor.insertAdjacentHTML('afterbegin', finalString);
}

function drawCategoryButton(text) {
  //draw buttons
  return `<button class="btn-categories" type="button">${text}</button>`;
}

function drawCategoryList(text) {
  //draw list
  return `<option class="filters-section-categories" value="${text}">${text}</option>`;
}
export { createCategories };
