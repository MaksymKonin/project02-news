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
}
