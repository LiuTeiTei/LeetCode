/**
 * https://leetcode.com/problems/binary-tree-preorder-traversal/
 * https://leetcode.com/problems/binary-tree-inorder-traversal/
 * https://leetcode.com/problems/binary-tree-postorder-traversal/
 * https://github.com/youngyangyang04/leetcode-master/blob/master/problems/%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E9%80%92%E5%BD%92%E9%81%8D%E5%8E%86.md
 * 
 * 给定一个二叉树的根节点 root ，返回它的前序遍历。
 * 
 * 示例 1：
 * 输入：root = [1,null,2,3]
 * 输出：[1,2,3]
 * 
 * ------------------------------------------------
 * 
 * 给定一个二叉树的根节点 root ，返回它的中序遍历。
 * 
 * 示例 1：
 * 输入：root = [1,null,2,3]
 * 输出：[1,3,2]
 * 
 * ------------------------------------------------
 * 
 * 给定一个二叉树的根节点 root ，返回它的后序遍历。
 * 
 * 示例 1：
 * 输入：root = [1,null,2,3]
 * 输出：[3,2,1]
 * 
 * ------------------------------------------------
 * 
 * 示例 2：
 * 输入：root = []
 * 输出：[]
 * 
 * 示例 3：
 * 输入：root = [1]
 * 输出：[1]
 * 
 * 提示：
 * 树中节点数目在范围 [0, 100] 内
 * -100 <= Node.val <= 100
 * 
 * 进阶：递归算法很简单，你可以通过迭代算法完成吗？
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

/** 144. 二叉树的前序遍历----递归方法 */
function preorderTraversal(root: TreeNode | null): number[] {
  const traversal = (currTree: TreeNode | null, result: number[]): void => {
    if (currTree === null) return
    result.push(currTree.val)
    traversal(currTree.left, result)
    traversal(currTree.right, result)
  }

  const result: number[] = []
  traversal(root, result)
  return result
};

/** 94. 二叉树的中序遍历----递归方法 */
function inorderTraversal(root: TreeNode | null): number[] {
  const traversal = (currTree: TreeNode | null, result: number[]): void => {
    if (currTree === null) return
    traversal(currTree.left, result)
    result.push(currTree.val)
    traversal(currTree.right, result)
  }

  const result: number[] = []
  traversal(root, result)
  return result
};

/** 145. 二叉树的后序遍历----递归方法 */
function postorderTraversal(root: TreeNode | null): number[] {
  const traversal = (currTree: TreeNode | null, result: number[]): void => {
    if (currTree === null) return
    traversal(currTree.left, result)
    traversal(currTree.right, result)
    result.push(currTree.val)
  }

  const result: number[] = []
  traversal(root, result)
  return result
};

const tree = new TreeNode(1, new TreeNode(2), new TreeNode(3))
console.log(preorderTraversal(tree))  // [1, 2, 3]
console.log(inorderTraversal(tree)) // [2, 1, 3]
console.log(postorderTraversal(tree)) // [2, 3, 1]

const tree2 = new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5)), new TreeNode(3, new TreeNode(6), new TreeNode(7)))
console.log(preorderTraversal(tree2))  // [1, 2, 4, 5, 3, 6, 7]
console.log(inorderTraversal(tree2)) // [4, 2, 5, 1, 6, 3, 7]
console.log(postorderTraversal(tree2)) // [4, 5, 2, 6, 7, 3, 1]
