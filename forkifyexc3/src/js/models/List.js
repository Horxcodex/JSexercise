import uniqid from 'uniqid';

export default class List {
	constructor() {
		this.items = [];
	}

	addItem(count, unit, ingredient) {
		//create object items
		const items = {
			id: uniqid(),
			count: count,
			unit: unit,
			ingredient: ingredient
		};

		this.items.push(items);

		return items;
	}

	deleteItem(id) {
		// use findIndex method and splice method to this.items
		const index = this.items.findIndex((cur) => cur.id === id);

		this.items.splice(index, 1);
	}

	updateCount(id, newCount) {
		// use find method to this.items
		this.items.find((cur) => cur.id === id).count = newCount;
	}
}
