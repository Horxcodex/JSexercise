import { elements } from './base';

export const getInput = () => {
	return elements.searchInput.value;
};

export const clearInput = () => {
	elements.searchInput.value = '';
};

export const clearResults = () => {
	elements.searchResList.innerHTML = '';
};

const limitRecipeTitle = (title, limit = 17) => {
	if (title.length > limit) {
		let newTitle = title.split('').splice(0, limit);
		return `${newTitle.join('')} ...`;
		//return newTitle.join('') + '...';
	} else {
		return title;
	}
};

const renderRecipes = (cur, i, arr) => {
	let markup = `
        <li>
            <a class="results__link results__link" href="${cur.recipe_id}">
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

	elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = (recipes) => {
	recipes.forEach(renderRecipes);
};
