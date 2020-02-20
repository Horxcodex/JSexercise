import uniqid from 'uniqid';

export default class List {
	constructor() {
		this.items = [];
	}

	addItem(count, unit, ingredient) {
		const item = {
			id: uniqid(),
			count: count,
			unit: unit,
			ingredient: ingredient
		};
		this.items.push(item);
		return item;
	}

	deleteItem(id) {
		const index = this.items.findIndex((cur) => cur.id === id);

		this.items.splice(index, 1);
	}

	updateCount(id, newCount) {
		this.items.find((cur) => cur.id === id).count = newCount;
	}

	/* updateIng(id, newIng) {
		this.items.find((cur) => cur.id === id).ingredients = newIng;
	} */
}
