import axios from 'axios';

export default class Recipe {
	constructor(id) {
		this.id = id;
	}

	async getRecipe() {
		try {
			const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
			this.title = res.data.recipe.title;
			this.author = res.data.recipe.publisher;
			this.img = res.data.recipe.image_url;
			this.url = res.data.recipe.source_url;
			this.ingredients = res.data.recipe.ingredients;
			//console.log(res);
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
		const newIngredients = this.ingredients.map((cur, i, arr) => {
			// 1). uniform units
			const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
			const unitShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

			let ingredient = cur.toLowerCase();

			unitsLong.forEach((cur, i) => {
				ingredient = ingredient.replace(cur, unitShort[i]);
			});

			// 2). remove paranthesis
			ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

			// 3). parse ingredients into count, unit and ingredient
			const arrIng = ingredient.split(' ');

			const unitIndex = arrIng.findIndex((cur) => {
				return unitShort.includes(cur);
			});

			let objIng = {};
			if (unitIndex > -1) {
				// theres a number and a unit
				const arrCount = arrIng.slice(0, unitIndex);
				let count;
				if (arrCount.length === 1) {
					count = eval(arrIng[0].replace('-', '+'));
				} else {
					count = eval(arrIng.slice(0, unitIndex).join('+'));
				}
				objIng = {
					count: count,
					unit: arrIng[unitIndex],
					ingredient: arrIng.slice(unitIndex + 1).join(' ')
				};
			} else if (parseInt(arrIng[0], 10)) {
				// there is a number, But there is no unit (on 1st element is number)
				objIng = {
					count: parseInt(arrIng[0], 10),
					unit: '',
					ingredient: arrIng.slice(1).join(' ')
				};
			} else if (unitIndex === -1) {
				// there is no number and there is no unit (on 1st element is not number)
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
}
