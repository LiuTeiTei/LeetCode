/* 
https://leetcode.com/problems/minimum-depth-of-binary-tree/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0111.%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E6%9C%80%E5%B0%8F%E6%B7%B1%E5%BA%A6.md

给定一个二叉树，找出其最小深度。
最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
说明：叶子节点是指没有子节点的节点。

示例 1：
输入：root = [3,9,20,null,null,15,7]
输出：2

示例 2：
输入：root = [2,null,3,null,4,null,5,null,6]
输出：5
 
提示：
树中节点数的范围在 [0, 105] 内
-1000 <= Node.val <= 1000
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

// 递归算法
function minDepth(root: TreeNode | null): number {
  if (!root) return 0

  // 左子树为空，右子树不为空，说明最小深度是 1 + 右子树的深度
  if (!root.left && root.right) {
      return 1 + minDepth(root.right)
  }

  // 左子树不为空，右子树为空，最小深度是 1 + 左子树的深度
  if (root.left && !root.right) {
      return 1 + minDepth(root.left)
  }

  // 最后如果左右子树都不为空，返回左右子树深度最小值 + 1
  return 1 + Math.min(minDepth(root.right), minDepth(root.left))
};
