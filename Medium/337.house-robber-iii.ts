/* 
https://leetcode.cn/problems/house-robber-iii/description/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0337.%E6%89%93%E5%AE%B6%E5%8A%AB%E8%88%8DIII.md

小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，我们称之为 root 。
除了 root 之外，每栋房子有且只有一个“父“房子与之相连。
一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。 
如果 两个直接相连的房子在同一天晚上被打劫 ，房屋将自动报警。
给定二叉树的 root 。返回 在不触动警报的情况下 ，小偷能够盗取的最高金额 。

示例 1:
输入: root = [3,2,3,null,3,null,1]
输出: 7 
解释: 小偷一晚能够盗取的最高金额 3 + 3 + 1 = 7

示例 2:
输入: root = [3,4,5,1,3,null,1]
输出: 9
解释: 小偷一晚能够盗取的最高金额 4 + 5 = 9
 
提示：
树的节点数在 [1, 104] 范围内
0 <= Node.val <= 104
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

// 动态规划 + 后序遍历
// dp[0] 记录不偷该节点所得到的的最大金钱
// dp[1] 记录偷该节点所得到的的最大金钱
// 在递归的过程中，系统栈会保存每一层递归的参数
// 时间复杂度: O(n) 空间复杂度: O(log n)
function rob(root: TreeNode | null): number {
  const robNote = (curr: TreeNode | null) => {
      // 终止条件
      if (!curr) return [0, 0]

      // 后序遍历
      const left = robNote(curr.left)
      const right = robNote(curr.right)

      // 不偷 curr，可以偷左右节点
      const dp0 = Math.max(left[0], left[1]) + Math.max(right[0], right[1])
      // 偷 curr，不能偷左右节点
      const dp1 = curr.val + left[0] + right[0]

      return [dp0, dp1]
  }

  const res = robNote(root)
  return Math.max(res[0], res[1])
};
