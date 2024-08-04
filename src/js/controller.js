import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
import { TIMEOUT_SEC } from './config.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import paginationView from './views/paginationView.js';

///////////////////////////////////////

// if (module.hot) module.hot.accept();

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultPage());
    bookmarkView.update(model.state.bookmarks);

    // loading recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;

    // rendering recepi
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchRecipe(query);
    searchView.clearInput();
    resultsView.render(model.getSearchResultPage());

    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};

const controlePagination = function (goToPage) {
  resultsView.render(model.getSearchResultPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServ) {
  // update servings
  model.updateServings(newServ);
  // update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipeUpload = async function (newRecipe) {
  try {
    await model.addRecipUpload(newRecipe);
    recipeView.render(model.state.recipe);

    addRecipeView.toggleView();

    bookmarkView.render(model.state.bookmarks);
    console.log(model.state.recipe);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);
  } catch (err) {
    addRecipeView.renderError(err);
  }
};

const init = function () {
  addRecipeView.addEventUpload(controlAddRecipeUpload);
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHendlerRender(controlRecipe);
  recipeView.addHendlerUpdateSerivings(controlServings);
  recipeView.addHendlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHendlerClick(controlePagination);
};
init();
