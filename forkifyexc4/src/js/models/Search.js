import axios from 'axios';
import { loaderIcon, iconError } from '../views/base';

export default class Search {
	constructor(query) {
		this.query = query;
	}

	async getResults() {
		try {
			const res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
			this.result = res.data.recipes;
			//console.log(res);
			//console.log(this.result);
		} catch (error) {
			//alert(error);

			if (error) {
				console.log('ERROR HAS OCCURED!');
				document.querySelector('.results__list').insertAdjacentHTML('beforeend', iconError());
			}
		}
	}
}
