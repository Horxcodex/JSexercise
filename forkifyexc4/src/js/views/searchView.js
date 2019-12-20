import { elements } from './base';

export const getInput = () => {
	return document.querySelector('.search__field').value;
};

export const clearInput = () => {
	elements.seacrhField.value = '';
};

export const clearResults = () => {
	elements.searchResults.innerHTML = '';
	elements.searchResPage.innerHTML = '';
};

const limitTitle = (title, limit = 17) => {
	if (title.length > limit) {
		let newTitle = title.split('').splice(0, limit);
		return `${newTitle.join('')}...`;
	} else {
		return title;
	}
};

const renderRecipes = (cur, i, arr) => {
	const markup = `
        <li>
            <a class="results__link results__link" href="#${cur.recipe_id}">
                <figure class="results__fig">
                    <img src="${cur.image_url}" alt="${cur.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitTitle(cur.title)}</h4>
                    <p class="results__author">${cur.publisher}</p>
                </div>
            </a>
        </li>
    `;
	elements.searchResults.insertAdjacentHTML('beforeend', markup);
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

const renderButtons = (recipeArrayLength, page, numOfRes) => {
	let pages = Math.ceil(recipeArrayLength / numOfRes);
	let buttons;
	if (page === 1 && pages > 1) {
		buttons = createButtons(page, 'next');
	} else if (page < pages) {
		buttons = `${createButtons(page, 'prev')} ${createButtons(page, 'next')}`;
	} else if (page === pages && pages > 1) {
		buttons = createButtons(page, 'prev');
	}

	elements.searchResPage.insertAdjacentHTML('afterbegin', buttons);
};

export const renderResults = (arrayOfRecipes, page = 1, numOfRes = 10) => {
	const start = (page - 1) * numOfRes;
	const end = page * numOfRes;

	arrayOfRecipes.slice(start, end).forEach(renderRecipes);
	renderButtons(arrayOfRecipes.length, page, numOfRes);
};
