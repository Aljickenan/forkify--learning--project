class SearchView {
  #parentElement = document.querySelector('.search');

  getQuery() {
    return this.#parentElement.querySelector('.search__field').value;
  }

  clearInput() {
    return (this.#parentElement.querySelector('.search__field').value = '');
  }

  addHandlerSearch(hendler) {
    this.#parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      hendler();
    });
  }
}
export default new SearchView();
