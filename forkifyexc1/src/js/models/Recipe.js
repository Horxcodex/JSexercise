import axios from 'axios';
import { elements } from '../views/base';

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
			console.log(res);
		} catch (error) {
			alert('Something went wrong');
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
		const unitShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
		const units = [...unitShort, 'kg', 'g'];

		const newIngredients = this.ingredients.map((cur, i, arr) => {
			// 1). uniform units

			let ingredient = cur.toLowerCase();

			unitsLong.forEach((cur, i) => {
				ingredient = ingredient.replace(cur, unitShort[i]);
			});

			// 2). remove paranthesis
			ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

			// 3). parse ingredients into count, unit and ingredient
			const arrIng = ingredient.split(' ');

			const unitIndex = arrIng.findIndex((cur) => {
				return units.includes(cur);
			});

			let objIng;
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
		console.log(this.ingredients);
	}

	updateServings(type) {
		// update the Sevings
		const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1; //dec = decrease

		/* let newServs;
		if (type === 'dec') {
			newServs = this.servings - 1;
		} else {
			newServs = this.servings + 1;
		} */

		// update the Ingredient's count number
		this.ingredients.forEach((cur) => {
			cur.count = cur.count * (newServings / this.servings);
		});

		this.servings = newServings;
	}
}
