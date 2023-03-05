// const haveReadStatus = new haveReadStatus({ selector: '.status-reed', isHidden: true });
// для стилів span.hidden {
//  display: none;}

export default class haveReadStatus {
  constructor({ selector, isHidden }) {
    this.span = this.getText(selector);
      if (isHidden) {
        this.isHidden();
    } 
    else this.isShown();
  }

  getText(selector) {
    return document.querySelector(selector);
  }

  isHidden() {
    this.span.classList.add('hidden');
  }

  isShown() {
    this.span.classList.remove('hidden');
    this.span.textContent = 'Have read'
  }

  isReadAlready() {
    this.span.textContent = 'Already read';
  }
}

// галочка біля "Already read"
// <svg class="icon icon-checkmark"><use xlink:href="#icon-checkmark"></use>
// <symbol id="icon-checkmark" viewBox="0 0 32 32">
// <path d="M27 4l-15 15-7-7-5 5 12 12 20-20z"></path>
// </symbol>
// </svg >
