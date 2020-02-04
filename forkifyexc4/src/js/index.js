import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';

const state = {};
//console.log(state);

const controlSearch = async () => {
	// 1). Get query from the view (yg kita ketik dari search bar).
	const query = searchView.getInput();

	// TESTING
	//const query = 'pizza';

	if (query) {
		// 2). Create new Object ( Search object that we create in 1E is placed here on this step) and add it to state object. Tips: state.search = the object and add 'query' to the argument.
		state.search = new Search(query);

		// 3). Prepare UI for result (add loading spiner, clear prev search results, we will do this on next lecture). Skip this step for now.
		searchView.clearInput();
		searchView.clearResults();
		renderLoader(elements.searchResultForSpinner);

		try {
			//4). Do the search, search for recipe.
			await state.search.getResults();

			//5). Show results to the UI, render results.
			clearLoader();
			searchView.renderResults(state.search.result);
			console.log(state.search.result);
		} catch (error) {
			alert('ERROR SEARCHING!!!');
		}
	}
};

elements.searchForm.addEventListener('submit', (e) => {
	e.preventDefault();
	controlSearch();
});

// TESTING
/* window.addEventListener('load', (e) => {
	e.preventDefault();
	controlSearch();
}); */

elements.searchResPage.addEventListener('click', (e) => {
	const btn = e.target.closest('.btn-inline ');
	let page = parseInt(btn.dataset.goto, 10);
	searchView.clearResults();
	searchView.renderResults(state.search.result, page);
});

//-------------------------RECIPE CONTROLLER------------------------------------

const controlRecipe = async () => {
	// step 1
	const id = window.location.hash.replace('#', '');
	console.log(id);
	if (id) {
		// step 2
		recipeView.clearRecipe();
		renderLoader(elements.recipe);

		if (state.search) {
			recipeView.highlightSelected(id);
		}

		// step 3
		state.recipe = new Recipe(id);

		// TESTING
		//window.r = state.recipe;

		try {
			// step 4 parse ingredient
			await state.recipe.getRecipe();
			state.recipe.parseIngredients();

			// step 5
			state.recipe.calcTime();
			state.recipe.calcServings();

			// step 6
			clearLoader();
			recipeView.renderRecipe(state.recipe);
			//console.log(state.recipe);
		} catch (error) {
			alert('ERROR LOADING RECIPE');
		}
	}
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach((cur) => window.addEventListener(cur, controlRecipe));

elements.recipe.addEventListener('click', (e) => {
	if (e.target.matches('.btn-decrease, .btn-decrease *')) {
		//decrease button clicked
		if (state.recipe.servings > 1) {
			state.recipe.updateServings('dec');
			recipeView.UIupdateServings(state.recipe);
		}
	} else if (e.target.matches('.btn-increase, .btn-increase *')) {
		//increase button clicked
		state.recipe.updateServings('inc');
		recipeView.UIupdateServings(state.recipe);
	}

	console.log(state.recipe);
});
