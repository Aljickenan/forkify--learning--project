import view from './view.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';
class BookmarkView extends view {
  _data;
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMes = 'no bookmarks recipe, go finde a good one and add it :D';

  addHandlerRender(hendler) {
    window.addEventListener('load', hendler);
  }

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}
export default new BookmarkView();
