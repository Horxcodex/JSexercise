import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';

const state = {};

//---------------------------SEARCH CONTROLLER-------------------------------------------//

/* const controlSearch = async (e) => {
	// 1). Get query from the view (yg kita ketik dari search bar).
	e.preventDefault();
	//const query = searchView.getInput();

	// for testing
	const query = 'pizza';

	if (query) {
		// 2). Create new Object
		state.Search = new Search(query);

		// 3). Prepare UI for result (add loading spiner, clear prev search results and input, we will do this on next lecture).
		searchView.clearInput();
		searchView.clearResults();
		renderLoader(elements.searchRes);

		try {
			// 4). Do the search, search for recipe.
			await state.Search.getResults();

			// 5). Show results to the UI, render results.
			//console.log(state.Search.result);
			clearLoader();
			searchView.renderResults(state.Search.result);
		} catch (error) {
			alert('error loading Search!!');
		}
	}
}; */

const controlSearch = async () => {
	// 1). Get query from the view (yg kita ketik dari search bar).

	const query = searchView.getInput();

	// TESTING
	// const query = 'pizza';

	if (query) {
		// 2). Create new Object
		state.Search = new Search(query);

		// 3). Prepare UI for result (add loading spiner, clear prev search results and input, we will do this on next lecture).
		searchView.clearInput();
		searchView.clearResults();
		renderLoader(elements.searchRes);

		try {
			// 4). Do the search, search for recipe.
			await state.Search.getResults();

			// 5). Show results to the UI, render results.
			//console.log(state.Search.result);
			clearLoader();
			searchView.renderResults(state.Search.result);
		} catch (error) {
			alert('error loading Search!!');
		}
	}
};

const controlPagination = (e) => {
	const ele = e.target.closest('.btn-inline');

	if (ele) {
		let goToPage = parseInt(ele.dataset.goto, 10);
		//console.log(goToPage);
		searchView.clearResults();
		searchView.renderResults(state.Search.result, goToPage);
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

elements.searchResPages.addEventListener('click', controlPagination);

//---------------------------RECIPE CONTROLLER-------------------------------------------//

const controlRecipe = async () => {
	// 1. Get id from the URL
	const id = window.location.hash.replace('#', '');
	console.log(id);

	if (id) {
		// 2. Prepare UI for changes
		recipeView.clearRecipe();
		renderLoader(elements.recipe);

		if (state.Search) {
			recipeView.highlightSelected(id);
		}

		// 3. Create new recipe object
		state.recipe = new Recipe(id);

		// TESTING
		//window.r = state.Recipe;

		try {
			// 4. Get recipe data & parse the ingredients
			await state.recipe.getRecipe();
			//console.log(state.Recipe.ingredients);
			state.recipe.parseIngredients();

			// 5. Calculte servings and time by calling the
			state.recipe.calcTime();
			state.recipe.calcServings();

			// 6. Render recipe to UI.
			clearLoader();
			recipeView.renderRecipe(state.recipe);

			//console.log(state.Recipe);
			//console.log(state.Recipe.ingredients);
		} catch (err) {
			alert('Error Proccesing Recipe!');
		}
	}
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach((e) => window.addEventListener(e, controlRecipe));

// 'handling recipe button clicks'
elements.recipe.addEventListener('click', (e) => {
	if (e.target.matches('.btn-decrease, .btn-decrease *')) {
		// decrease button is clicked
		if (state.recipe.servings > 1) {
			state.recipe.updateServings('dec');
			recipeView.updateServingsIngredients(state.recipe);
		}
	} else if (e.target.matches('.btn-increase, .btn-increase *')) {
		// increase button is clicked
		state.recipe.updateServings('inc');
		recipeView.updateServingsIngredients(state.recipe);
	}
	console.log(state.recipe);
});
