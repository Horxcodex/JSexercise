import axios from 'axios';

export default class Recipe {
	constructor(id) {
		this.id = id;
	}

	async getRecipe() {
		try {
			const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
			//console.log(res);

			this.title = res.data.recipe.title;
			this.author = res.data.recipe.publisher;
			this.img = res.data.recipe.image_url;
			this.url = res.data.recipe.source_url;
			this.ingredients = res.data.recipe.ingredients;
		} catch (error) {
			alert(error);
		}
	}

	calcTime() {
		const numIng = this.ingredients.length;
		const periods = Math.ceil(numIng / 3);
		this.time = periods * 15;
		//console.log(this.time);
	}

	calcServings() {
		this.servings = 4;
	}

	parseIngredients() {
		const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
		const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

		const newIngredients = this.ingredients.map((cur) => {
			let ingredient = cur.toLowerCase();

			// Samakan Units
			unitsLong.forEach((cur, i) => {
				ingredient = ingredient.replace(cur, unitsShort[i]);
			});

			// remove parathises
			ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

			// 3. parse ingredients into count, unit and ingredient
			const arrIng = ingredient.split(' ');
			//console.log(arrIng);

			let unitIndex = arrIng.findIndex((cur) => {
				return unitsShort.includes(cur);
			});

			let objIng = {};
			let thereIsANumber = parseInt(arrIng[0], 10);

			if (unitIndex > -1) {
				// theres a number and unit
				let arrCount = arrIng.slice(0, unitIndex);

				let count;
				if (arrCount.length === 1) {
					count = eval(arrIng[0].replace('-', '+'));
				} else {
					count = eval(arrCount.join('+'));
				}

				objIng = {
					count: count,
					unit: arrIng[unitIndex],
					ingredient: arrIng.slice(unitIndex + 1).join(' ')
				};
			} else if (thereIsANumber) {
				// theres a number but not the unit
				objIng = {
					count: thereIsANumber,
					unit: '',
					ingredient: arrIng.slice(1).join(' ')
				};
			} else if (unitIndex === -1) {
				objIng = {
					count: 1,
					unit: '',
					ingredient: ingredient
				};
			}

			//return ingredient;
			return objIng;
		});

		this.ingredients = newIngredients;
	}

	updateServings(type) {
		// update the Sevings
		let newServing;

		if (type === 'dec') {
			newServing = this.servings - 1;
		} else if ('inc') {
			newServing = this.servings + 1;
		}

		// update the Ingredient
		this.ingredients.forEach((cur) => {
			cur.count = cur.count * (newServing / this.servings);
		});

		this.servings = newServing;
	}
}
