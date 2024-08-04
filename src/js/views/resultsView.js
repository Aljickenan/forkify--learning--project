import view from './view.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';
class resultsView extends view {
  _data;
  _parentElement = document.querySelector('.results');
  _errorMes = 'We could not find that results, please try again later.';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}
export default new resultsView();
