/* 
https://leetcode.com/problems/unique-binary-search-trees/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0096.%E4%B8%8D%E5%90%8C%E7%9A%84%E4%BA%8C%E5%8F%89%E6%90%9C%E7%B4%A2%E6%A0%91.md

给你一个整数 n ，求恰由 n 个节点组成且节点值从 1 到 n 互不相同的 二叉搜索树 有多少种？
返回满足题意的二叉搜索树的种数。

示例 1：
输入：n = 3
输出：5

示例 2：
输入：n = 1
输出：1
 
提示：
1 <= n <= 19
*/

// 动态规划
// dp[i] 表示 i 个节点可以组成的二叉搜索树
// dp[i] += dp[以 j 为头结点左子树节点数量] * dp[以 j 为头结点右子树节点数量]
// dp[i] += dp[j - 1] * dp[i - j]
// 因为 dp[1] = dp[0] * dp[0] = 1，因此 dp[0] = 1
// 时间复杂度: O(n ^ 2) 空间复杂度: O(n)
function numTrees(n: number): number {
  const dp = new Array(n + 1).fill(0)
  dp[0] = 1

  for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= i; j++) {
          dp[i] = dp[i] + dp[j - 1] * dp[i - j]
      }
  }

  return dp[n]
};