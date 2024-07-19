import Tree from "./binarySearchTree.js";

function getRandomArray(n) {
	const array = [];
	for (let index = 0; index < n; index++) {
		array.push(Math.floor(Math.random() * n));
	}
	return array;
}

const tree = new Tree(getRandomArray(90));

tree.prettyPrint();
console.log(tree.isBalanced());

console.log(tree.levelOrder());
console.log(tree.inOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());

for (const e of getRandomArray(20)) {
	tree.insert(e);
}

console.log(tree.isBalanced());
tree.prettyPrint();

tree.rebalance();

console.log(tree.isBalanced());
tree.prettyPrint();

console.log(tree.levelOrder());
console.log(tree.inOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
