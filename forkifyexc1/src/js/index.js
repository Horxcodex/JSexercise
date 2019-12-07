import Search from './models/Search';
import { elements } from './views/base';
import * as searchView from './views/searchView';

const state = {};

const controlSearch = async (e) => {
	// 1). Get query from the view (yg kita ketik dari search bar).
	e.preventDefault();
	const query = searchView.getInput();

	if (query) {
		// 2). Create new Object
		state.Search = new Search(query);

		// 3). Prepare UI for result (add loading spiner, clear prev search results, we will do this on next lecture).

		// 4). Do the search, search for recipe.
		await state.Search.getResults();

		// 5). Show results to the UI, render results.
		console.log(state.Search.result);
	}
};

elements.searchForm.addEventListener('submit', controlSearch);
