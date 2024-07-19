class Node {
	constructor(data, left = null, right = null) {
		this.data = data;
		this.left = left;
		this.right = right;
	}
}

class Tree {
	root = null;

	constructor(array) {
		const cleanedArray = this.cleanArray(array);
		this.root = this.buildTree(cleanedArray, 0, cleanedArray.length - 1);
	}

	cleanArray(array) {
		return Array.from(new Set(array)).sort((a, b) => a - b);
	}

	buildTree(array, start, end) {
		if (start > end) return null;

		const mid = Math.floor((start + end) / 2);
		const root = new Node(array[mid]);

		root.left = this.buildTree(array, start, mid - 1);
		root.right = this.buildTree(array, mid + 1, end);

		return root;
	}

	prettyPrint(node = this.root, prefix = "", isLeft = true) {
		if (node === null) {
			return;
		}
		if (node.right !== null) {
			this.prettyPrint(
				node.right,
				`${prefix}${isLeft ? "│   " : "    "}`,
				false,
			);
		}
		console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
		if (node.left !== null) {
			this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
		}
	}

	insert(value) {
		if (this.root === null) this.root = new Node(value);
		else this.root = this._insert(value, this.root);
	}

	_insert(value, root) {
		if (root === null) return new Node(value);

		if (value < root.data) root.left = this._insert(value, root.left);
		else if (value > root.data) root.right = this._insert(value, root.right);

		return root;
	}

	delete(value) {
		this.root = this._delete(value, this.root);
	}

	_delete(value, root) {
		if (root === null) return root;

		if (value < root.data) {
			root.left = this._delete(value, root.left);
		} else if (value > root.data) {
			root.right = this._delete(value, root.right);
		} else {
			if (root.left === null) return root.right;
			if (root.right === null) return root.left;

			root.data = this.minValue(root.right);

			root.right = this._delete(root.data, root.right);
		}

		return root;
	}

	minValue(node) {
		let current = node;
		while (current.left !== null) {
			current = current.left;
		}
		return current.data;
	}

	find(value) {
		return this._find(value, this.root);
	}

	_find(value, root) {
		if (root === null) return null;

		if (value === root.data) return root;

		return value < root.data
			? this._find(value, root.left)
			: this._find(value, root.right);
	}

	levelOrder(callback) {
		const array = this._levelOrder(this.root);

		if (typeof callback === "function") {
			for (const e of array) {
				callback(e);
			}
		} else {
			return array;
		}
	}

	_levelOrder(root) {
		if (root === null) {
			return [];
		}

		const queue = [root];
		const array = [];

		while (queue.length > 0) {
			const node = queue.shift();
			array.push(node.data);

			if (node.left !== null) {
				queue.push(node.left);
			}

			if (node.right !== null) {
				queue.push(node.right);
			}
		}

		return array;
	}

	inOrder(callback) {
		const result = [];
		this._inOrder(this.root, result);

		if (typeof callback === "function") {
			for (const e of result) {
				callback(e);
			}
		} else {
			return result;
		}
	}

	_inOrder(root, result) {
		if (root === null) return;

		this._inOrder(root.left, result);
		result.push(root.data);
		this._inOrder(root.right, result);
	}

	preOrder(callback) {
		const result = [];
		this._preOrder(this.root, result);

		if (typeof callback === "function") {
			for (const e of result) {
				callback(e);
			}
		} else {
			return result;
		}
	}

	_preOrder(root, result) {
		if (root === null) return;

		result.push(root.data);
		this._inOrder(root.left, result);
		this._inOrder(root.right, result);
	}

	postOrder(callback) {
		const result = [];
		this._postOrder(this.root, result);

		if (typeof callback === "function") {
			for (const e of result) {
				callback(e);
			}
		} else {
			return result;
		}
	}

	_postOrder(root, result) {
		if (root === null) return;

		this._inOrder(root.left, result);
		this._inOrder(root.right, result);
		result.push(root.data);
	}

	height(node) {
		if (node === null) return -1;

		const leftHeight = this.height(node.left);
		const rightHeight = this.height(node.right);

		return Math.max(leftHeight, rightHeight) + 1;
	}

	depth(node) {
		return this._depth(node, this.root, 0);
	}

	_depth(node, current, depth) {
		if (current === null) return -1;

		if (current === node) return depth;

		const leftDepth = this._depth(node, current.left, depth + 1);
		if (leftDepth !== -1) return leftDepth;

		return this._depth(node, current.right, depth + 1);
	}

	isBalanced() {
		return this._isBalanced(this.root) !== -1;
	}

	_isBalanced(node) {
		if (node === null) return 0;

		const leftHeight = this._isBalanced(node.left);
		if (leftHeight === -1) return -1;

		const rightHeight = this._isBalanced(node.right);
		if (rightHeight === -1) return -1;

		if (Math.abs(leftHeight - rightHeight) > 1) {
			return -1;
		}

		return Math.max(leftHeight, rightHeight) + 1;
	}

	rebalance() {
		const sortedArray = this.inOrder();
		this.root = this.buildTree(sortedArray, 0, sortedArray.length - 1);
	}
}

export default Tree;
