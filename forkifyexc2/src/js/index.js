import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';

const state = {};

const controlSearch = async () => {
	// 1). Get query from the view (yg kita ketik dari search bar)
	console.log('STEP 1');
	const query = searchView.getInput();
	//console.log(query);
	console.log(`getInput()`);

	if (query) {
		// 2). Create new Object ( Search object that we create in 1E is placed here on this step) and add it to state object. Tips: state.search = the object and add 'query' to the argument.
		console.log('STEP 2');
		state.search = new Search(query);
		console.log(`new Search(query)`);

		// 3). Prepare UI for result (add loading spiner, clear prev search results, we will do this on next lecture). Skip on this Alg
		console.log('STEP 3');
		searchView.clearInput();
		console.log(`clearInput()`);
		searchView.clearResults();
		console.log(`clearResults()`);

		// 4). Do the search, search for recipe.
		console.log('STEP 4');
		await state.search.getResults();
		console.log(`state.search.getResults()`);

		//5). Show results to the UI, render results.
		console.log('STEP 5');
		searchView.renderResults(state.search.result);
		console.log(state.search.result);
		console.log(`renderResults()`);
	}
};

elements.searchForm.addEventListener('submit', (e) => {
	e.preventDefault();
	controlSearch();
});
