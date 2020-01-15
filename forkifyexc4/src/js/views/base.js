export const elements = {
	seacrhField: document.querySelector('.search__field'),
	searchResults: document.querySelector('.results__list'),
	searchForm: document.querySelector('.search'),
	searchResultForSpinner: document.querySelector('.results'),
	searchResPage: document.querySelector('.results__pages'),
	recipe: document.querySelector('.recipe')
};

const elementStrings = {
	loader: 'loader'
};

/* loader icon

<div class="${elementStrings.loader} ">
	<svg>
		<use href="img/icons.svg#icon-cw"></use>
	</svg>
</div>

*/

export const loaderIcon = () => {
	return `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
};

export const iconError = () => {
	return `
        <li>
            <a class="results__link results__link--active" href="#23456">
                <div class="results__data">
                    <h4 class="results__error">RECIPE IS NOT FOUND!</h4>
                    <p class="results__author">Please only Search with the Keyword "pizza" or "broccoli"</p>
                </div>
            </a>
        </li>
    `;
};

/* export const renderLoader = (parent) => {
	const loader = `
		<div class="${elementStrings.loader}">
			<svg>
				<use href="img/icons.svg#icon-cw"></use>
			</svg>
		</div>
	`;

	parent.insertAdjacentHTML('afterbegin', loader);
}; */

export const renderLoader = (parent) => {
	parent.insertAdjacentHTML('afterBegin', loaderIcon());
};

export const clearLoader = () => {
	const loader = document.querySelector(`.${elementStrings.loader}`);
	if (loader) {
		loader.parentElement.removeChild(loader);
	}
};
