import { elements } from './base';

export const getInput = () => {
	return elements.searchField.value;
};

export const clearInput = () => {
	elements.searchField.value = '';
};

export const clearResults = () => {
	elements.searchResults.innerHTML = '';
};

const limitRecipeTitle = (title, limit = 17) => {
	if (title.length > limit) {
		let newTitle = title.split('').splice(0, limit);

		return `${newTitle.join('')}...`;
	} else {
		return title;
	}
	//return `${title} IS A GOOD FOOD`;
};

const renderRecipe = (cur, i, arr) => {
	const markup = `
		<li>
			<a class="results__link results__link" href="#${cur.recipe_id}">
				<figure class="results__fig">
					<img src="${cur.image_url}" alt="${cur.title}">
				</figure>
				<div class="results__data">
					<h4 class="results__name">${limitRecipeTitle(cur.title)}</h4>
					<p class="results__author">${cur.publisher}</p>
				</div>
			</a>
		</li>
	`;

	elements.searchResults.insertAdjacentHTML('beforeend', markup);
	//console.log(cur.recipe_id, cur.image_url, cur.title, cur.publisher);
};

export const renderResults = (recipeArray) => {
	recipeArray.forEach(renderRecipe);
};
