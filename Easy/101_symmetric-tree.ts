/* 
https://leetcode.com/problems/symmetric-tree/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0101.%E5%AF%B9%E7%A7%B0%E4%BA%8C%E5%8F%89%E6%A0%91.md

给你一个二叉树的根节点 root ， 检查它是否轴对称。

示例 1：
输入：root = [1,2,2,3,4,4,3]
输出：true

示例 2：
输入：root = [1,2,2,null,3,null,3]
输出：false
 
提示：
树中节点数目在范围 [1, 1000] 内
-100 <= Node.val <= 100
 

进阶：
你可以运用递归和迭代两种方法解决这个问题吗？
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

// 后序遍历，但一边是左右中，一边是右左中
function isSymmetric(root: TreeNode | null): boolean {
  const traversal = (leftTree: TreeNode | null, rightTree: TreeNode | null) => {
      // 排除空节点
      if (!leftTree && !rightTree) return true
      if (!leftTree || !rightTree) return false

      // 排除节点不相同
      if (leftTree.val !== rightTree.val) return false

      // 递归，下一层判断
      const outside = traversal(leftTree.left, rightTree.right)
      const inside = traversal(leftTree.right, rightTree.left)
      return outside && inside
  }

  return traversal(root.left, root.right)
};
