/* 
https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0106.%E4%BB%8E%E4%B8%AD%E5%BA%8F%E4%B8%8E%E5%90%8E%E5%BA%8F%E9%81%8D%E5%8E%86%E5%BA%8F%E5%88%97%E6%9E%84%E9%80%A0%E4%BA%8C%E5%8F%89%E6%A0%91.md

给定两个整数数组 preorder 和 inorder ，
其中 preorder 是二叉树的先序遍历， inorder 是同一棵树的中序遍历，
请构造二叉树并返回其根节点。

示例 1:
输入: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
输出: [3,9,20,null,null,15,7]

示例 2:
输入: preorder = [-1], inorder = [-1]
输出: [-1]
 
提示:
1 <= preorder.length <= 3000
inorder.length == preorder.length
-3000 <= preorder[i], inorder[i] <= 3000
preorder 和 inorder 均 无重复 元素
inorder 均出现在 preorder
preorder 保证 为二叉树的前序遍历序列
inorder 保证 为二叉树的中序遍历序列
*/

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

// 以前序数组的第一个元素为切割点，
// 先切中序数组，根据中序数组，反过来再切后、前序数组。
// 一层一层切下去，每次前序数组第一个元素就是节点元素
function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  if (preorder.length < 1) return null

  const rootVal = preorder[0]
  const root = new TreeNode(rootVal)

  if (preorder.length === 1) return root

  const rootIndex = inorder.indexOf(rootVal)
  root.left = buildTree(preorder.slice(1, rootIndex + 1), inorder.slice(0, rootIndex))
  root.right = buildTree(preorder.slice(rootIndex + 1, preorder.length), inorder.slice(rootIndex + 1, inorder.length))
  return root
};
