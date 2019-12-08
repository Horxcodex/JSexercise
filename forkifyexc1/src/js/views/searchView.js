import { elements } from './base';

export const getInput = () => {
	return elements.searchInput.value;
};

const renderRecipes = (recipe, i, arr) => {
	const markup = `
			<li>
                <a class="results__link results__link" href="#${recipe.recipe_id}">
                    <figure class="results__fig">
                        <img src="${recipe.image_url}" alt="${recipe.title}">
                    </figure>
                    <div class="results__data">
                        <h4 class="results__name">${recipe.title}</h4>
                        <p class="results__author">${recipe.publisher}</p>
                    </div>
                </a>
            </li>
	`;

	elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = (recipes) => {
	recipes.forEach(renderRecipes);
};

export const clearInput = (params) => {
	elements.searchInput.value = '';
};

export const clearResults = (params) => {
	elements.searchResList.innerHTML = '';
};

//-----------------------------------------------------------
//USING FOR LOOPS
/* export const renderResults2 = (recipes) => {
	for (let i = 0; i < recipes.length; i++) {
		const current = recipes[i];

		const markup = `
			<li>
                <a class="results__link results__link" href="#${current.recipe_id}">
                    <figure class="results__fig">
                        <img src="${current.image_url}" alt="${current.title}">
                    </figure>
                    <div class="results__data">
                        <h4 class="results__name">${current.title}</h4>
                        <p class="results__author">${current.publisher}</p>
                    </div>
                </a>
            </li>
	`;

		elements.searchResList.insertAdjacentHTML('beforeend', markup);
	}
}; */
