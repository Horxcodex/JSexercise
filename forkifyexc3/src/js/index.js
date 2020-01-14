import Search from './models/Search';
import Recipe from './models/Recipe';
import { elements } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';

const state = {};

const controlSearch = async () => {
	// 1). Get query from the view (yg kita ketik dari search bar).
	const query = searchView.getInput();

	// testing
	//const query = 'pizza';

	if (query) {
		// 2). Create new Object ( Search object that we create in 1E is placed here on this step) and add it to state object. Tips: state.search = the object and add 'query' to the argument.
		state.search = new Search(query);
		// 3). Prepare UI for result (add loading spiner, clear prev search results, we will do this on next lecture). Skip this step for now.
		searchView.clearInput();
		searchView.clearResults();

		try {
			//4). Do the search, search for recipe.
			await state.search.getResults();

			//5). Show results to the UI, render results.
			console.log(state.search.result);
			searchView.renderResults(state.search.result);
		} catch (error) {
			alert('SEARCHING ERROR!!');
		}
	}
};

elements.searchForm.addEventListener('submit', (e) => {
	e.preventDefault();
	controlSearch();
});

// TESTING
// window.addEventListener('load', (e) => {
// 	e.preventDefault();
// 	controlSearch();
// });

document.querySelector('.results__pages').addEventListener('click', (e) => {
	const btn = e.target.closest('.btn-inline');
	let page = parseInt(btn.dataset.goto, 10);
	//console.log(btn);
	//console.log(data);
	searchView.clearInput();
	searchView.clearResults();
	searchView.renderResults(state.search.result, page);
});

//------------------RECIPE CONTROLLER----------------//

const controlRecipe = async () => {
	// 1. Get id from the URL
	const id = window.location.hash.replace('#', '');
	console.log(id);

	if (id) {
		// 2. Prepare UI for changes
		recipeView.clearRecipe();

		// 3. Create new recipe object
		//- Create recipe object (remember add it to 'state' object) and pass the 'id'.
		state.recipe = new Recipe(id);

		// testing
		//window.r = state.recipe;

		try {
			// 4. Get recipe data & parse the ingredients
			//- Call the 'getRecipe' function. Tips: it's on state object and it's await.
			await state.recipe.getRecipe();
			state.recipe.parseIngredients();

			// 5. Calculte servings and time by calling the method
			//- call the 'calcTime' and 'calcServing' function. Tips: it's on state object.
			state.recipe.calcTime();
			state.recipe.calcServings();

			// 6. Render recipe to UI.
			recipeView.renderRecipe(state.recipe);
			//- conslo.log 'state.recipe'.
			//console.log(state.recipe);
		} catch (error) {
			alert('ERROR LOADING RECIPE !!!');
		}
	}
};

/* window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe); */

['hashchange', 'load'].forEach((cur) => window.addEventListener(cur, controlRecipe));
