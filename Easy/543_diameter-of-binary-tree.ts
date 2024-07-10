/* 
https://leetcode.cn/problems/diameter-of-binary-tree/description/

给你一棵二叉树的根节点，返回该树的 直径 。
二叉树的 直径 是指树中任意两个节点之间最长路径的 长度 。这条路径可能经过也可能不经过根节点 root 。
两节点之间路径的 长度 由它们之间边数表示。

示例 1：
输入：root = [1,2,3,4,5]
输出：3
解释：3 ，取路径 [4,2,1,3] 或 [5,2,1,3] 的长度。

示例 2：
输入：root = [1,2]
输出：1
 
提示：
树中节点数目在范围 [1, 104] 内
-100 <= Node.val <= 100
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

function diameterOfBinaryTree(root: TreeNode | null): number {
  let result = 0

  const depth = (root: TreeNode | null) => {
      if (!root) return 0

      const leftDepth = depth(root.left)
      const rightDepth = depth(root.right)

      result = Math.max(leftDepth + rightDepth, result)

      return Math.max(leftDepth, rightDepth) + 1
  }

  depth(root)
  return result
};
