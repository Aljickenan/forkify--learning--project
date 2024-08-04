import view from './view.js';
import icons from 'url:../../img/icons.svg';
import { RES_PER_PAGE } from './../config.js';

class paginationView extends view {
  _parentElement = document.querySelector('.pagination');

  addHendlerClick(hendler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      hendler(goToPage);
    });
  }

  _generateMarkup() {
    const numPage = Math.ceil(this._data.results.length / RES_PER_PAGE);
    // page 1 and there are others pages
    if (this._data.page === 1 && numPage > 1)
      return `
        <button data-goto="${
          this._data.page + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${this._data.page + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button> 
    `;
    // last page
    if (numPage === this._data.page && numPage > 1) {
      return `
        <button data-goto="${
          this._data.page - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${this._data.page - 1}</span>
        </button> 
      `;
    }
    // other page
    if (this._data.page < numPage) {
      return `
        <button data-goto="${
          this._data.page - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="src/img/icons.svg#icon-arrow-left"></use>
          </svg>
          <span>Page ${this._data.page - 1}</span>
        </button>
        <button data-goto="${
          this._data.page + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${this._data.page + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
      // page 1 and there are not others pages
    }
    if (this._data.page === 1 && numPage === 1) return '';
  }
}

export default new paginationView();
