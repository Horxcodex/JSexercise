export const elements = {
	searchInput: document.querySelector(`.search__field`), // search bar
	searchForm: document.querySelector('.search'), // search form
	searchResList: document.querySelector('.results__list'), // the element where we can display results
	searchRes: document.querySelector('.results'), // the element where we can display loading spinner
	searchResPage: document.querySelector('.results__pages')
};

const elementStrings = {
	loader: 'loader'
};

export const renderLoader = (parent) => {
	const loader = `
	<div class= "${elementStrings.loader}">
		<svg>
			<use href="img/icons.svg#icon-cw"></use>
		</svg>
    </div>
	`;

	parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
	const loader = document.querySelector(`.${elementStrings.loader}`);

	if (loader) {
		loader.parentElement.removeChild(loader);
	}
};
