import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

const state = {};

const controlSearch = async () => {
	// 1). Get query from the view (yg kita ketik dari search bar)
	console.log('----STEP 1 = Get query from the search bar----');
	const query = searchView.getInput();
	console.log(query);
	console.log(`getInput()`);
	console.log(`STATE OBJECT :`) + console.log(state);

	if (query) {
		// 2). Create new Object ( Search object that we create in 1E is placed here on this step) and add it to state object. Tips: state.search = the object and add 'query' to the argument.
		console.log('----STEP 2 = Create new Object----');
		state.search = new Search(query);
		console.log(`new Search(query)`);

		// 3). Prepare UI for result (add loading spiner, clear prev search results, we will do this on next lecture). Skip on this Alg
		console.log('----STEP 3 = Prepare UI for result (add loading spiner, clear prev search results)----');
		searchView.clearInput();
		console.log(`clearInput()`);
		searchView.clearResults();
		console.log(`clearResults()`);
		renderLoader(elements.searchRes);
		console.log(`renderLoader()`);

		// 4). Do the search, search for recipe.
		console.log('----STEP 4 = Do the search, search for recipe----');
		await state.search.getResults();
		console.log(`state.search.getResults()`);
		clearLoader();
		console.log(`clearLoader()`);

		//5). Show results to the UI, render results.
		console.log('----STEP 5 = Show results to the UI, render results----');
		searchView.renderResults(state.search.result);
		console.log(state.search.result);
		console.log(`renderResults(), renderRecipes() & limitRecipeTitle()`);
		console.log(`createButtons() & renderButtons()`);
	}
};

elements.searchForm.addEventListener('submit', (e) => {
	e.preventDefault();
	controlSearch();
});

elements.searchResPage.addEventListener('click', (e) => {
	const btn = e.target.closest('.btn-inline');
	//console.log(btn);

	if (btn) {
		let goToPage = parseInt(btn.dataset.goto, 10);
		//console.log(goToPage);
		searchView.clearResults();
		searchView.renderResults(state.search.result, goToPage);
		if (goToPage === 1) {
			console.log('----CHANGING PAGE 1----');
			console.log(`clearResults();`);
			console.log(`renderResults();`);
		} else if (goToPage === 2) {
			console.log('----CHANGING PAGE 2----');
			console.log(`clearResults();`);
			console.log(`renderResults();`);
		} else {
			console.log('----CHANGING PAGE 3----');
			console.log(`clearResults();`);
			console.log(`renderResults();`);
		}
	}
});
