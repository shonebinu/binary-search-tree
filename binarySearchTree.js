class Node {
	constructor(data, left = null, right = null) {
		this.data = data;
		this.left = left;
		this.right = right;
	}
}

class Tree {
	constructor(array) {
		this.root = this.buildTree(this.cleanArray(array));
	}

	cleanArray(array) {
		return Array.from(new Set(array)).sort((a, b) => a - b);
	}

	buildTree(array, start, end) {
		if (start > end) return;

		const mid = Math.floor((start + end) / 2);
	}
}
