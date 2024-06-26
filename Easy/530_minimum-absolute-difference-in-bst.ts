/* 
https://leetcode.cn/problems/minimum-absolute-difference-in-bst/description/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0530.%E4%BA%8C%E5%8F%89%E6%90%9C%E7%B4%A2%E6%A0%91%E7%9A%84%E6%9C%80%E5%B0%8F%E7%BB%9D%E5%AF%B9%E5%B7%AE.md

给你一个二叉搜索树的根节点 root ，返回 树中任意两不同节点值之间的最小差值 。
差值是一个正数，其数值等于两值之差的绝对值。

示例 1：
输入：root = [4,2,6,1,3]
输出：1

示例 2：
输入：root = [1,0,48,null,null,12,49]
输出：1
 
提示：
树中节点的数目范围是 [2, 104]
0 <= Node.val <= 105
 
注意：本题与 783 https://leetcode-cn.com/problems/minimum-distance-between-bst-nodes/ 相同
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

// 中序遍历的过程中，比较当前值与上一次值的差值
// 时间复杂度: O(n) 空间复杂度: (1)
function getMinimumDifference(root: TreeNode | null): number {
  let prevNode: TreeNode | null = null
  let result: number = Infinity

  const traversal = (currNode: TreeNode | null) => {
      if (!currNode) return 

      traversal(currNode.left)

      if (prevNode) {
          result = Math.min(result, currNode.val - prevNode.val)
      }
      prevNode = currNode

      traversal(currNode.right)
  }

  traversal(root)
  return result
};
