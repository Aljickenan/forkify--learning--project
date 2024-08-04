import view from './view.js';
import icons from 'url:../../img/icons.svg';
class addRecipeView extends view {
  _parentElement = document.querySelector('.upload');
  _overlay = document.querySelector('.overlay');
  _window = document.querySelector('.add-recipe-window');
  _btnClose = document.querySelector('.btn--close-modal');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');

  constructor() {
    super();
    this._addEventOpen();
    this._addEventClose();
  }

  toggleView() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  _addEventOpen() {
    this._btnOpen.addEventListener('click', this.toggleView.bind(this));
  }

  _addEventClose() {
    this._btnClose.addEventListener('click', this.toggleView.bind(this));
    this._overlay.addEventListener('click', this.toggleView.bind(this));
  }

  addEventUpload(hendler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      hendler(data);
    });
  }
}

export default new addRecipeView();
