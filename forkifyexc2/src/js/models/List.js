import uniqid from 'uniqid';

export default class List {
	constructor() {
		this.items = [];
	}

	addItem(count, unit, ingredients) {
		const item = {
			id: uniqid(),
			count,
			unit,
			ingredients
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
