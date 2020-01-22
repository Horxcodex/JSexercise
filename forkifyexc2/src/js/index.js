import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';

const state = {};

const controlSearch = async () => {
	// 1). Get query from the view (yg kita ketik dari search bar)
	//console.log('----STEP 1 = Get query from the search bar----');
	const query = searchView.getInput();
	// testing
	//const query = 'pizza';

	// console.log(query);
	// console.log(`getInput()`);
	// console.log(`STATE OBJECT :`) + console.log(state);

	if (query) {
		// 2). Create new Object ( Search object that we create in 1E is placed here on this step) and add it to state object. Tips: state.search = the object and add 'query' to the argument.
		//console.log('----STEP 2 = Create new Object----');
		state.search = new Search(query);
		//console.log(`new Search(query)`);

		// 3). Prepare UI for result (add loading spiner, clear prev search results, we will do this on next lecture). Skip on this Alg
		//console.log('----STEP 3 = Prepare UI for result (add loading spiner, clear prev search results)----');
		searchView.clearInput();
		//console.log(`clearInput()`);
		searchView.clearResults();
		//console.log(`clearResults()`);
		renderLoader(elements.searchRes);
		//console.log(`renderLoader()`);

		try {
			// 4). Do the search, search for recipe.
			//console.log('----STEP 4 = Do the search, search for recipe----');
			await state.search.getResults();
			//console.log(`state.search.getResults()`);
			clearLoader();
			//console.log(`clearLoader()`);

			//5). Show results to the UI, render results.
			//console.log('----STEP 5 = Show results to the UI, render results----');
			searchView.renderResults(state.search.result);
			//console.log(state.search.result);
			//console.log(`renderResults(), renderRecipes() & limitRecipeTitle()`);
			//console.log(`createButtons() & renderButtons()`);
		} catch (error) {
			alert('ERROR SEARCHING RECIPE');
		}
	}
};

elements.searchForm.addEventListener('submit', (e) => {
	e.preventDefault();
	controlSearch();
});

// testing
// window.addEventListener('load', (e) => {
// 	e.preventDefault();
// 	controlSearch();
// });

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

//------------------RECIPE CONTROLLER----------------//

const controlRecipe = async () => {
	// 1. Get id from the URL
	const id = window.location.hash.replace('#', '');
	console.log(id);

	if (id) {
		// 2. Prepare UI for changes
		recipeView.clearRecipe();
		renderLoader(elements.recipe);

		if (state.search) {
			recipeView.highlightSelected(id);
		}

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
			clearLoader();
			recipeView.renderRecipe(state.recipe);
			//- conslo.log 'state.recipe'.
			//console.log(state.recipe);
		} catch (error) {
			alert('ERROR LOADING RECIPE');
		}
	}
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach((cur) => {
	window.addEventListener(cur, controlRecipe);
});
