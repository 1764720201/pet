class QueryData {
	constructor() {
		this.data = [];
		this.querys = [];
	}
	getData(collection, where, field) {
		let row = this.data.find(v => v.collection === collection && v.where === where && v.field === field);
		return row;
	}
	removeData(collection, where, field) {
		let index = this.data.findIndex(v => v.collection === collection && v.where === where && v.field === field);
		this.data.splice(index, 1);
	}
	setData(collection, where, field, data) {
		const row = this.getData(collection, where, field);
		if (row) {
			row.data = data;
		} else {
			this.data.push({
				collection,
				where,
				field,
				data
			})
		}
	}
	addQuery(collection, where, field, func) {
		let index = this.querys.findIndex(v => v.collection === collection && v.where === where && v.field ===
			field);
		let row = this.querys[index];
		if (!row) {
			row = {
				collection,
				where,
				field,
				func
			};
			index = this.querys.length;
			this.querys.push(row);
		}
		return index;
	}
	startQuery(index) {
		return new Promise((succ, fail) => {
			this.isQuery = false;
			this.querySucc = [];
			setTimeout(() => {
				this.querySucc.push((res) => succ(res[index]));
				if (this.isQuery) {
					return;
				}
				this.isQuery = true;
				const tasks = this.querys.map(v => v.func(v));
				Promise.all(tasks).then(res => {
					console.log("res: ", res);
					this.querySucc.forEach(call => {
						call(res);
					})
					this.querys = [];
					this.querySucc = [];
				}).catch(fail)
			}, 30);
		})
	}
}



export default new QueryData()
