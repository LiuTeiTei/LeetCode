/* 
https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iv/description/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0188.%E4%B9%B0%E5%8D%96%E8%82%A1%E7%A5%A8%E7%9A%84%E6%9C%80%E4%BD%B3%E6%97%B6%E6%9C%BAIV.md

给你一个整数数组 prices 和一个整数 k ，其中 prices[i] 是某支给定的股票在第 i 天的价格。
设计一个算法来计算你所能获取的最大利润。你最多可以完成 k 笔交易。也就是说，你最多可以买 k 次，卖 k 次。
注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

示例 1：
输入：k = 2, prices = [2,4,1]
输出：2
解释：在第 1 天 (股票价格 = 2) 的时候买入，在第 2 天 (股票价格 = 4) 的时候卖出，这笔交易所能获得利润 = 4-2 = 2 。

示例 2：
输入：k = 2, prices = [3,2,6,5,0,3]
输出：7
解释：在第 2 天 (股票价格 = 2) 的时候买入，在第 3 天 (股票价格 = 6) 的时候卖出, 这笔交易所能获得利润 = 6-2 = 4 。
     随后，在第 5 天 (股票价格 = 0) 的时候买入，在第 6 天 (股票价格 = 3) 的时候卖出, 这笔交易所能获得利润 = 3-0 = 3 。
 

提示：
1 <= k <= 100
1 <= prices.length <= 1000
0 <= prices[i] <= 1000
*/

// 动态规划
// 时间复杂度: O(0.5kn) 空间复杂度: O(2kn)
function maxProfit(k: number, prices: number[]): number {
  const dp: number[][] = []
  dp[0] = new Array(2 * k).fill(0)
  for (let j = 0; j < 2 * k; j = j + 2) {
      dp[0][j] = -prices[0]
  }

  for (let i = 1; i < prices.length; i++) {
      dp[i] = []
      for (let j = 0; j < 2 * k; j++) {
          if (j === 0) {
              dp[i][j] = Math.max(dp[i - 1][j], -prices[i])
          } else if (j % 2 === 1) {
              dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - 1] + prices[i])
          } else {
              dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - 1] - prices[i])
          }
      }
  }

return dp[prices.length - 1][2 * k - 1]
};
