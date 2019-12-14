import Search from './models/Search';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';

const state = {};

const controlSearch = async (e) => {
	// 1). Get query from the view (yg kita ketik dari search bar).
	e.preventDefault();
	const query = searchView.getInput();

	if (query) {
		// 2). Create new Object
		state.Search = new Search(query);

		// 3). Prepare UI for result (add loading spiner, clear prev search results and input, we will do this on next lecture).
		searchView.clearInput();
		searchView.clearResults();
		renderLoader(elements.searchRes);

		// 4). Do the search, search for recipe.
		await state.Search.getResults();

		// 5). Show results to the UI, render results.
		//console.log(state.Search.result);
		clearLoader();
		searchView.renderResults(state.Search.result);
	}
};

const controlPagination = (e) => {
	const ele = e.target.closest('.btn-inline');

	if (ele) {
		let goToPage = parseInt(ele.dataset.goto, 10);
		console.log(goToPage);
		searchView.clearResults();
		searchView.renderResults(state.Search.result, goToPage);
	}
};

elements.searchForm.addEventListener('submit', controlSearch);

elements.searchResPages.addEventListener('click', controlPagination);
