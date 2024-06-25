/* 
https://leetcode.com/problems/binary-tree-level-order-traversal/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0102.%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E5%B1%82%E5%BA%8F%E9%81%8D%E5%8E%86.md

给你二叉树的根节点 root ，返回其节点值的 层序遍历 。 （即逐层地，从左到右访问所有节点）。

示例 1：
输入：root = [3,9,20,null,null,15,7]
输出：[[3],[9,20],[15,7]]

示例 2：
输入：root = [1]
输出：[[1]]

示例 3：
输入：root = []
输出：[]
 
提示：
树中节点数目在范围 [0, 2000] 内
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

function levelOrder(root: TreeNode | null): number[][] {
  const result: number[][] = []
  const treeQueue: TreeNode[] = []

  // 初始化
  if (root) treeQueue.push(root)

  while(treeQueue.length) {
      const rank = treeQueue.length
      const tempResult: number[] = []

      for (let i = 0; i < rank; i++) {
          const currTree = treeQueue.shift()!
          tempResult.push(currTree.val)

          if (currTree.left) treeQueue.push(currTree.left)
          if (currTree.right) treeQueue.push(currTree.right)
      }

      result.push(tempResult)
  }

  return result
};
