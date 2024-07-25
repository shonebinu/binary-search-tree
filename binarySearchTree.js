class Node {
	constructor(data, left = null, right = null) {
		this.data = data;
		this.left = left;
		this.right = right;
	}
}

class Tree {
	root;

	constructor(array) {
		const cleanArray = Array.from(new Set(array)).sort((a, b) => a - b);
		this.root = this.buildTree(cleanArray, 0, cleanArray.length - 1);
	}

	buildTree(array, start, end) {
		if (start > end) return null;

		const mid = Math.floor((start + end) / 2);
		const newNode = new Node(array[mid]);
		newNode.left = this.buildTree(array, start, mid - 1);
		newNode.right = this.buildTree(array, mid + 1, end);

		return newNode;
	}

	insert(value) {
		if (this.root === null) this.root = new Node(value);
		else this._insert(this.root, value);
	}

	_insert(node, value) {
		if (node === null) return new Node(value);

		if (value < node.data) node.left = this._insert(node.left, value);
		else if (value > node.data) node.right = this._insert(node.right, value);

		return node;
	}

	deleteItem(value) {
		this.root = this._deleteItem(this.root, value);
	}

	_deleteItem(node, value) {
		if (node === null) return null;

		if (value < node.data) node.left = this._deleteItem(node.left, value);
		else if (value > node.data)
			node.right = this._deleteItem(node.right, value);
		else if (value === node.data) {
			// Leaf node
			if (node.left === null && node.right === null) return null;

			// Single child node
			if (node.left === null) return node.right;
			if (node.right === null) return node.left;

			// Two child node
			if (node.left && node.right) {
				const inorderSuccessor = this._minRightSubtreeNode(node.right);
				node.data = inorderSuccessor.data;
				node.right = this._deleteItem(node.right, inorderSuccessor.data);
			}
		}

		return node;
	}

	_minRightSubtreeNode(node) {
		let current = node;
		while (current.left !== null) current = current.left;
		return current;
	}

	find(value, node = this.root) {
		if (node === null) return null;

		if (value === node.data) return node;

		return value < node.data
			? this.find(value, node.left)
			: this.find(value, node.right);
	}

	levelOrder(callback) {
		const array = this._levelOrder(this.root);

		if (typeof callback !== "function")
			throw new Error("A callback function is required");

		for (const e of array) {
			callback(e);
		}
	}

	_levelOrder(node) {
		const array = [];
		const queue = [node];

		while (queue.length > 0) {
			const temp = queue.shift();

			array.push(temp.data);
			if (temp.left !== null) queue.push(temp.left);
			if (temp.right !== null) queue.push(temp.right);
		}

		return array;
	}

	inOrder(callback) {
		const array = [];
		this._inOrder(this.root, array);

		if (typeof callback !== "function")
			throw new Error("A callback function is required");

		for (const e of array) {
			callback(e);
		}
	}

	_inOrder(node, array) {
		if (node === null) return null;

		this._inOrder(node.left, array);
		array.push(node.data);
		this._inOrder(node.right, array);
	}

	preOrder(callback) {
		const array = [];
		this._preOrder(this.root, array);

		if (typeof callback !== "function")
			throw new Error("A callback function is required");

		for (const e of array) {
			callback(e);
		}
	}

	_preOrder(node, array) {
		if (node === null) return null;

		array.push(node.data);
		this._preOrder(node.left, array);
		this._preOrder(node.right, array);
	}

	postOrder(callback) {
		const array = [];
		this._postOrder(this.root, array);

		if (typeof callback !== "function")
			throw new Error("A callback function is required");

		for (const e of array) {
			callback(e);
		}
	}

	_postOrder(node, array) {
		if (node === null) return null;

		this._postOrder(node.left, array);
		this._postOrder(node.right, array);
		array.push(node.data);
	}

	height(node) {
		if (node === null) return 0;

		return 1 + Math.max(this.height(node.left), this.height(node.right));
	}

	depth(node, curr = this.root, depth = 0) {
		if (curr === null || node === null) return 0;

		if (curr === node) return depth;

		return node.data < curr.data
			? this.depth(node, curr.left, depth + 1)
			: this.depth(node, curr.right, depth + 1);
	}

	isBalanced(node = this.root) {
		return this._checkBalance(node).balanced;
	}

	_checkBalance(node) {
		if (node === null) return { balanced: true, height: 0 };

		const left = this._checkBalance(node.left);
		const right = this._checkBalance(node.right);

		const balanced =
			Math.abs(left.height - right.height) <= 1 &&
			left.balanced &&
			right.balanced;

		return { balanced, height: 1 + Math.max(left.height, right.height) };
	}

	rebalance() {
		const array = [];
		this._inOrder(this.root, array);
		this.root = this.buildTree(array, 0, array.length - 1);
	}
}

export default Tree;
