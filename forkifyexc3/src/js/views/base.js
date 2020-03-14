export const elements = {
	searchForm: document.querySelector('.search'),
	searchField: document.querySelector('.search__field'),
	searchResults: document.querySelector('.results__list'),
	searchResPage: document.querySelector('.results__pages'),
	recipe: document.querySelector('.recipe'),
	results: document.querySelector('.results'),
	shopping: document.querySelector('.shopping__list')
};

const elementStrings = {
	loader: 'loader'
};

export const loaderIcon = () => {
	return `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
};

export const renderLoader = (parent) => {
	parent.insertAdjacentHTML('afterBegin', loaderIcon());
};

export const clearLoader = () => {
	const loader = document.querySelector(`.${elementStrings.loader}`);
	if (loader) {
		loader.parentElement.removeChild(loader);
	}
};
