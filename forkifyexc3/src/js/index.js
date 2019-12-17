import Search from './models/Search';
import { elements } from './views/base';
import * as searchView from './views/searchView';

const state = {};

const controlSearch = async () => {
	// 1). Get query from the view (yg kita ketik dari search bar).
	const query = searchView.getInput();

	if (query) {
		// 2). Create new Object ( Search object that we create in 1E is placed here on this step) and add it to state object. Tips: state.search = the object and add 'query' to the argument.
		state.search = new Search(query);
		// 3). Prepare UI for result (add loading spiner, clear prev search results, we will do this on next lecture). Skip this step for now.
		searchView.clearInput();
		searchView.clearResults();

		//4). Do the search, search for recipe.
		await state.search.getResults();

		//5). Show results to the UI, render results.
		console.log(state.search.result);
		searchView.renderResults(state.search.result);
	}
};

elements.searchForm.addEventListener('submit', (e) => {
	e.preventDefault();
	controlSearch();
});
