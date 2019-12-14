import Search from './models/Search';

const state = {};

const controlSearch = async () => {
	// 1). Get query from the view (yg kita ketik dari search bar)
	console.log('STEP 1');
	const query = 'pizza';

	if (query) {
		// 2). Create new Object ( Search object that we create in 1E is placed here on this step) and add it to state object. Tips: state.search = the object and add 'query' to the argument.
		console.log('STEP 2');
		state.search = new Search(query);

		// 3). Prepare UI for result (add loading spiner, clear prev search results, we will do this on next lecture). Skip on this Alg
		console.log('STEP 3');

		// 4). Do the search, search for recipe.
		console.log('STEP 4');
		await state.search.getResults();

		//5). Show results to the UI, render results.
		console.log('STEP 5');
		console.log(state.search.result);
	}
};

document.querySelector('.search').addEventListener('submit', (e) => {
	e.preventDefault();
	controlSearch();
});
