/* 
https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-cooldown/description/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0309.%E6%9C%80%E4%BD%B3%E4%B9%B0%E5%8D%96%E8%82%A1%E7%A5%A8%E6%97%B6%E6%9C%BA%E5%90%AB%E5%86%B7%E5%86%BB%E6%9C%9F.md

给定一个整数数组prices，其中第  prices[i] 表示第 i 天的股票价格 。​
设计一个算法计算出最大利润。在满足以下约束条件下，你可以尽可能地完成更多的交易（多次买卖一支股票）:
卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)。
注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

示例 1:
输入: prices = [1,2,3,0,2]
输出: 3 
解释: 对应的交易状态为: [买入, 卖出, 冷冻期, 买入, 卖出]

示例 2:
输入: prices = [1]
输出: 0
 
提示：
1 <= prices.length <= 5000
0 <= prices[i] <= 1000
*/

// 动态规划
// 时间复杂度: O(n) 空间复杂度: O(4n)
function maxProfit(prices: number[]): number {
  // dp[i][0] 表示第 i 天持有股票（之前买入 or 今天买入）
  // dp[i][1] 表示第 i 天不持有股票（之前卖出）
  // dp[i][2] 表示第 i 天不持有股票（今天卖出）
  // dp[i][3] 表示第 i 天为冷冻期
  const dp: number[][] = [] 
  dp[0] = [-prices[0], 0, 0, 0]

  for (let i = 1; i < prices.length; i++) {
      dp[i] = []
      dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] - prices[i], dp[i - 1][3] - prices[i])
      dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][3])
      dp[i][2] = dp[i - 1][0] + prices[i]
      dp[i][3] = dp[i - 1][2]
  }

  return Math.max(dp[prices.length - 1][1], dp[prices.length - 1][2], dp[prices.length - 1][3])
};
