/* 
https://leetcode.com/problems/coin-change-ii/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0518.%E9%9B%B6%E9%92%B1%E5%85%91%E6%8D%A2II.md

给你一个整数数组 coins 表示不同面额的硬币，另给一个整数 amount 表示总金额。
请你计算并返回可以凑成总金额的硬币组合数。
如果任何硬币组合都无法凑出总金额，返回 0 。
假设每一种面额的硬币有无限个。 
题目数据保证结果符合 32 位带符号整数。

示例 1：
输入：amount = 5, coins = [1, 2, 5]
输出：4
解释：有四种方式可以凑成总金额：
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1

示例 2：
输入：amount = 3, coins = [2]
输出：0
解释：只用面额 2 的硬币不能凑成总金额 3 。

示例 3：
输入：amount = 10, coins = [10] 
输出：1
 
提示：
1 <= coins.length <= 300
1 <= coins[i] <= 5000
coins 中的所有值 互不相同
0 <= amount <= 5000
*/

function change(amount: number, coins: number[]): number {
  // 这些边界条件不用考虑。当 amount = 0 时，初始值为 1；当 amount > 0 时，dp[amount] 初始值为 0。
  // if (amount === 0) return 1
  // if (coins.length === 1 && coins[0] > amount) return 0
  // if (coins.length === 1 && amount % coins[0] !== 0) return 0

  // 凑成总金额 j 的货币组合数为 dp[j]
  const dp: number[] = Array(amount + 1).fill(0)
 
  // 初始化
  dp[0] = 1

  // 外层 for 循环遍历物品（钱币），内层 for 遍历背包（金钱总额）==> 组合数
  // 外层 for 循环遍历背包（金钱总额），内层 for 遍历物品（钱币）==> 排列数
  for (let i = 0; i < coins.length; i++) {
    // 因为是完全背包，所以从前往后遍历
    for (let j = coins[i]; j < amount + 1; j++) {
      dp[j] = dp[j] + dp[j - coins[i]]
    }
  }

  return dp[amount]
};

const test = change(5, [1, 2, 5])