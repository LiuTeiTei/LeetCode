/* 
https://leetcode.com/problems/invert-binary-tree/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0226.%E7%BF%BB%E8%BD%AC%E4%BA%8C%E5%8F%89%E6%A0%91.md

给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点。

示例 1：
输入：root = [4,2,7,1,3,6,9]
输出：[4,7,2,9,6,3,1]

示例 2：
输入：root = [2,1,3]
输出：[2,3,1]

示例 3：
输入：root = []
输出：[]
 

提示：
树中节点数目范围在 [0, 100] 内
-100 <= Node.val <= 100
*/

/** Definition for a binary tree node. */
class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val ?? 0
    this.left = left ?? null
    this.right = right ?? null
  }
}

// 递归 - 前序遍历
{
  function invertTree(root: TreeNode | null): TreeNode | null {
    if (root === null) return root
  
    const invert = (tree: TreeNode | null) => {
      if (tree !== null) {
        const tempTree = tree.left
        tree.left = tree.right
        tree.right = tempTree
        // 前序遍历
        invert(tree.left)
        invert(tree.right)
      }
    }
  
    invert(root)
    return root
  };
}

// 迭代 - 层序遍历
function invertTree(root: TreeNode | null): TreeNode | null {
  if (root === null) return root

  const invert = (tree: TreeNode | null) => {
    if (tree !== null) {
      const tempTree = tree.right
      tree.right = tree.left
      tree.left = tempTree
    }
  }

  // 层序遍历
  const queue: TreeNode[] = []
  queue.push(root)
  while(queue.length > 0) {
    let len = queue.length
    while(len--){
      const currNode = queue.shift()!
      invert(currNode)
      currNode.left && queue.push(currNode.left)
      currNode.right && queue.push(currNode.right)
    }
  }

  return root
};

const tree = new TreeNode(4, new TreeNode(2, new TreeNode(1), new TreeNode(3)), new TreeNode(7, new TreeNode(6), new TreeNode(9)))
console.log(invertTree(tree)) // [4,7,2,9,6,3,1]
