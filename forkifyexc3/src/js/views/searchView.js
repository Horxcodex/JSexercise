import { elements } from './base';

export const getInput = () => {
	return elements.searchField.value;
};

export const clearInput = () => {
	elements.searchField.value = '';
};

export const clearResults = () => {
	elements.searchResults.innerHTML = '';
	elements.searchResPage.innerHTML = '';
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

const createButtons = (page, type) => {
	return `
		<button class="btn-inline results__btn--${type}" data-goto = ${type === 'prev' ? page - 1 : page + 1} >
			<span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
			<svg class="search__icon">
				<use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
			</svg>
		</button>
	`;
};

const renderButtons = (recipeArrayLength, page, resPerPage) => {
	let pages = Math.ceil(recipeArrayLength / resPerPage);
	let button;

	if (page === 1 && pages > 1) {
		button = createButtons(page, 'next');
	} else if (page < pages) {
		button = `${createButtons(page, 'prev')} ${createButtons(page, 'next')}`;
	} else if (page === pages && pages > 1) {
		button = createButtons(page, 'prev');
	}

	elements.searchResPage.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipeArray, page = 1, resPerPage = 10) => {
	let start = (page - 1) * resPerPage;
	let end = page * resPerPage;
	recipeArray.slice(start, end).forEach(renderRecipe);
	renderButtons(recipeArray.length, page, resPerPage);
};
