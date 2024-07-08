/* 
https://leetcode.cn/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0106.%E4%BB%8E%E4%B8%AD%E5%BA%8F%E4%B8%8E%E5%90%8E%E5%BA%8F%E9%81%8D%E5%8E%86%E5%BA%8F%E5%88%97%E6%9E%84%E9%80%A0%E4%BA%8C%E5%8F%89%E6%A0%91.md

给定两个整数数组 inorder 和 postorder ，其中 inorder 是二叉树的中序遍历， postorder 是同一棵树的后序遍历，请你构造并返回这颗 二叉树 。

示例 1:
输入：inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
输出：[3,9,20,null,null,15,7]

示例 2:
输入：inorder = [-1], postorder = [-1]
输出：[-1]
 
提示:
1 <= inorder.length <= 3000
postorder.length == inorder.length
-3000 <= inorder[i], postorder[i] <= 3000
inorder 和 postorder 都由 不同 的值组成
postorder 中每一个值都在 inorder 中
inorder 保证是树的中序遍历
postorder 保证是树的后序遍历
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

// 以后序数组的最后一个元素为切割点，
// 先切中序数组，根据中序数组，反过来再切后序数组。
// 一层一层切下去，每次后序数组最后一个元素就是节点元素
function buildTree(inorder: number[], postorder: number[]): (number | null)[] {
  const traversal = (inorder: number[], postorder: number[], result: (number | null)[]) => {
      if (inorder.length < 1) {
          result.push(null)
          return
      }

      const rootValue = postorder[postorder.length - 1]
      const root = new TreeNode(rootValue)

      if (inorder.length === 1) {
          result.push(rootValue)
          return
      }

      const rootIndex = inorder.indexOf(rootValue)
      buildTree(inorder.slice(0, rootIndex), postorder.slice(0, rootIndex))
      buildTree(inorder.slice(rootIndex + 1, inorder.length), postorder.slice(rootIndex, postorder.length - 1))
  }

  const result: (number | null)[] = []
  traversal(inorder, postorder, result)
  return result
};
