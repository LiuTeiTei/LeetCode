/* 
https://leetcode.com/problems/coin-change/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0322.%E9%9B%B6%E9%92%B1%E5%85%91%E6%8D%A2.md

给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。
计算并返回可以凑成总金额所需的 最少的硬币个数 。
如果没有任何一种硬币组合能组成总金额，返回 -1 。
你可以认为每种硬币的数量是无限的。

示例 1：
输入：coins = [1, 2, 5], amount = 11
输出：3 
解释：11 = 5 + 5 + 1

示例 2：
输入：coins = [2], amount = 3
输出：-1

示例 3：
输入：coins = [1], amount = 0
输出：0
 

提示：
1 <= coins.length <= 12
1 <= coins[i] <= 231 - 1
0 <= amount <= 104
*/

function coinChange(coins: number[], amount: number): number {
  // dp[j]：凑足总额为j所需钱币的最少个数为dp[j]
  const dp: number[] = new Array(amount + 1).fill(Number.MAX_SAFE_INTEGER)
  
  // 初始化
  dp[0] = 0
  
  // 不是求排列和组合，可以任意遍历顺序
  for (let i = 0; i < coins.length; i++) {
    // 硬币数量无限 -》完全背包 -》正序遍历
    for (let j = coins[i]; j < amount + 1; j++) {
      // j - coins[i] > 0 的条件转换为 j = coins[i]
      dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1)
    }
  }

  return dp[amount] === Number.MAX_SAFE_INTEGER ? -1 : dp[amount]
}