import axios from 'axios';

// creating Object using ES5 function constructor
export default function Search(query) {
	this.query = query;
}

Search.prototype.getResults = async function() {
	try {
		const res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
		this.result = res.data.recipes;
		//console.log(res);
		//console.log(this.result);
	} catch (error) {
		alert(error);
	}
};

/* // using ES6 class
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
			alert(error);
		}
	}
}
 */
