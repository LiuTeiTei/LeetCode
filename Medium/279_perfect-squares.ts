/* 
https://leetcode.com/problems/perfect-squares/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0279.%E5%AE%8C%E5%85%A8%E5%B9%B3%E6%96%B9%E6%95%B0.md

给你一个整数 n ，返回 和为 n 的完全平方数的最少数量 。
完全平方数 是一个整数，其值等于另一个整数的平方；
换句话说，其值等于一个整数自乘的积。
例如，1、4、9 和 16 都是完全平方数，而 3 和 11 不是。

示例 1：
输入：n = 12
输出：3 
解释：12 = 4 + 4 + 4

示例 2：
输入：n = 13
输出：2
解释：13 = 4 + 9
 
提示：
1 <= n <= 104
*/

function numSquares(n: number): number {
  const values: number[] = []
  for (let i = 1; i * i <= n; i++) {
    values.push(i * i)
  }

  // dp[j]：和为 j 的完全平方数的最少数量是 dp[j]
  const dp: number[] = new Array(n + 1).fill(Number.MAX_SAFE_INTEGER)

  // 初始化
  dp[0] = 0

  // 不是求排列和组合，可以任意遍历顺序
  for (let i = 0; i < values.length; i++) {
    // 硬币数量无限 -》完全背包 -》正序遍历
    for (let j = values[i]; j < n + 1; j++) {
      dp[j] = Math.min(dp[j], dp[j - values[i]] + 1)
    }
  }

  return dp[n]
};