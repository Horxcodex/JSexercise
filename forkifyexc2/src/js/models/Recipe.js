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
	}

	calcServings() {
		this.servings = 4;
	}

	parseIngredients() {
		const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
		const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
		const units = [...unitsShort, 'kg', 'g'];

		const newIngredient = this.ingredients.map((cur) => {
			// uniform the unit
			let ingredient = cur.toLowerCase();
			unitsLong.forEach((cur, i) => {
				ingredient = ingredient.replace(cur, unitsShort[i]);
			});

			// remove pranthesis
			ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

			// parse
			const arrIng = ingredient.split(' ');
			const parseNum = parseInt(arrIng[0], 10);
			//console.log(arrIng);

			let unitIndex = arrIng.findIndex((cur) => {
				return units.includes(cur);
			});
			// ["1", "package", "of", "active", "dry", "yeast", ""]

			let objIng = {};
			if (unitIndex > -1) {
				// theres number and unit
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
			} else if (parseNum) {
				// theres number but no unit
				objIng = {
					count: parseNum,
					unit: '',
					ingredient: arrIng.slice(1).join(' ')
				};
			} else if (unitIndex === -1) {
				// no number & no unit
				objIng = {
					count: 1,
					unit: '',
					ingredient: ingredient
				};
			}

			//return ingredient;
			return objIng;
		});

		this.ingredients = newIngredient;
	}

	updateServings(type) {
		//const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

		let newServs;
		if (type === 'dec') {
			newServs = this.servings - 1;
		} else {
			newServs = this.servings + 1;
		}

		this.ingredients.forEach((cur) => {
			//cur.count = cur.count * (newServings / this.servings);
			cur.count = cur.count * (newServs / this.servings);
		});

		//this.servings = newServings;
		this.servings = newServs;
	}
}
