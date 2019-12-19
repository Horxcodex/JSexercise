import { elements } from './base';

export const getInput = () => {
	return document.querySelector('.search__field').value;
};

export const clearInput = () => {
	elements.seacrhField.value = '';
};

export const clearResults = () => {
	elements.searchResults.innerHTML = '';
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

export const renderResults = (arrayOfRecipes) => {
	arrayOfRecipes.forEach(renderRecipes);
};
