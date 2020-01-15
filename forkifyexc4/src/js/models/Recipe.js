import axios from 'axios';

export default class Recipe {
	constructor(id) {
		this.id = id;
	}

	async getRecipe() {
		try {
			const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
			//console.log(res);
			this.ingredients = res.data.recipe.ingredients;
			this.publisher = res.data.recipe.publisher;
			this.url = res.data.recipe.source_url;
			this.image = res.data.recipe.image_url;
			this.title = res.data.recipe.title;
		} catch (error) {
			//alert(error);
			if (error) {
				alert('RECIPE ERROR HAS OCCURED!');
			}
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
			let ingredient = cur.toLowerCase();

			// uniform the units
			unitsLong.forEach((cur, i) => {
				ingredient = ingredient.replace(cur, unitsShort[i]);
			});

			// remove paranthesis
			ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

			// parse ing
			const arrIng = ingredient.split(' ');
			//console.log(arrIng);
			//["1", "package", "of", "active", "dry", "yeast", ""]

			const unitIndex = arrIng.findIndex((cur) => {
				return units.includes(cur);
			});

			let objIng = {};
			const isThereNum = parseInt(arrIng[0], 10);
			if (unitIndex > -1) {
				// there is a number and unit
				const countArr = arrIng.slice(0, unitIndex);

				let count;
				if (countArr.length === 1) {
					count = eval(arrIng[0].replace('-', '+'));
				} else {
					count = eval(countArr.join('+'));
				}

				objIng = {
					count: count,
					unit: arrIng[unitIndex],
					ingredient: arrIng.slice(unitIndex + 1).join(' ')
				};
			} else if (isThereNum) {
				// there is only a number and no unit
				objIng = {
					count: isThereNum,
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

			return objIng;
		});

		this.ingredients = newIngredient;
	}
}
