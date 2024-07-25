import Tree from "./binarySearchTree.js";

function prettyPrint(node, prefix = "", isLeft = true) {
	if (node === null) {
		return;
	}
	if (node.right !== null) {
		prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
	}
	console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
	if (node.left !== null) {
		prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
	}
}

function generateRandomArray(size) {
	const array = [];
	for (let i = 0; i < size; i++) {
		array.push(Math.floor(Math.random() * size));
	}
	return array;
}

// Create a binary search tree from an array of random numbers
const tree = new Tree(generateRandomArray(20));

// Confirm that the tree is balanced
console.log("Is tree balanced?", tree.isBalanced());

// Print out all elements in level, pre, post, and in order
console.log("Level order:");
tree.levelOrder((value) => console.log(value));
console.log("Pre order:");
tree.preOrder((value) => console.log(value));
console.log("Post order:");
tree.postOrder((value) => console.log(value));
console.log("In order:");
tree.inOrder((value) => console.log(value));

// Unbalance the tree by adding several numbers > 100
tree.insert(150);
tree.insert(200);
tree.insert(250);

prettyPrint(tree.root);
// Confirm that the tree is unbalanced
console.log("Is tree balanced?", tree.isBalanced());

// Balance the tree by calling rebalance
tree.rebalance();

prettyPrint(tree.root);
// Confirm that the tree is balanced
console.log("Is tree balanced?", tree.isBalanced());

// Print out all elements in level, pre, post, and in order
console.log("Level order:");
tree.levelOrder((value) => console.log(value));
console.log("Pre order:");
tree.preOrder((value) => console.log(value));
console.log("Post order:");
tree.postOrder((value) => console.log(value));
console.log("In order:");
tree.inOrder((value) => console.log(value));
