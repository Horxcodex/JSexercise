import { elements } from './base';

export const getInput = () => {
	return elements.searchInput.value;
};

export const clearInput = () => {
	elements.searchInput.value = '';
};

export const clearResults = () => {
	elements.searchResList.innerHTML = '';
	elements.searchResPages.innerHTML = '';
};

const limitRecipeTitle = (title, limit = 17) => {
	if (title.length > limit) {
		let newTitle = title.split('').splice(0, limit);
		return `${newTitle.join('')} ...`;
	} else {
		return title;
	}
};

const createButtons = (page, type) => {
	return `
		<button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
			<span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
			<svg class="search__icon">
				<use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
			</svg>
		</button>
	`;
};

const renderButtons = (page, numOfResults, resPerPage) => {
	let pages = Math.ceil(numOfResults / resPerPage);
	let button;
	if (page === 1 && pages > 1) {
		// We only want the button that go to the next Page.
		button = createButtons(page, 'next');
	} else if (page < pages) {
		// then we went we want both buttons (prev & next).
		button = `${createButtons(page, 'prev')} ${createButtons(page, 'next')}`;
	} else if (page === pages && pages > 1) {
		// We only want the button to go to the previous page.
		button = createButtons(page, 'prev');
	}

	// render to .results__pages element.
	elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

const renderRecipes = (cur, i, arr) => {
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

	// render to .results__list element.
	elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
	let start = (page - 1) * resPerPage;
	let end = page * resPerPage;

	recipes.slice(start, end).forEach(renderRecipes);
	renderButtons(page, recipes.length, resPerPage);
};

//-----------------------------------------------------------
// USING FOR LOOP for renderResults
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
