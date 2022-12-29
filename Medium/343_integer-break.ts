/* 
https://leetcode.com/problems/integer-break/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0343.%E6%95%B4%E6%95%B0%E6%8B%86%E5%88%86.md

给定一个正整数 n ，将其拆分为 k 个 正整数 的和（ k >= 2 ），并使这些整数的乘积最大化。
返回你可以获得的最大乘积 。

示例 1:
输入: n = 2
输出: 1
解释: 2 = 1 + 1, 1 × 1 = 1。
示例 2:

输入: n = 10
输出: 36
解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36。

提示:
2 <= n <= 58
*/

// 时间复杂度：O(n^2), 空间复杂度：O(n)
function integerBreak(n: number): number {
  // dp[i] 为正整数 i 拆分后的结果的最大乘积
  const dp = new Array(n + 1).fill(1)

  for (let i = 3; i <= n; i++) {
    // j < i 可以优化成 j <= i / 2
    for (let j = 1; j <= i / 2; j++) {
      dp[i] = Math.max(dp[i], Math.max(j * (i - j), j * dp[i - j]), dp[j] * dp[i - j])
    }
  }

  return dp[n]
};