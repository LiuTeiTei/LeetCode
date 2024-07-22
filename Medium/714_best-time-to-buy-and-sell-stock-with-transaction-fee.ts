/* 
https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/description/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0714.%E4%B9%B0%E5%8D%96%E8%82%A1%E7%A5%A8%E7%9A%84%E6%9C%80%E4%BD%B3%E6%97%B6%E6%9C%BA%E5%90%AB%E6%89%8B%E7%BB%AD%E8%B4%B9%EF%BC%88%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%EF%BC%89.md
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0714.%E4%B9%B0%E5%8D%96%E8%82%A1%E7%A5%A8%E7%9A%84%E6%9C%80%E4%BD%B3%E6%97%B6%E6%9C%BA%E5%90%AB%E6%89%8B%E7%BB%AD%E8%B4%B9.md

给定一个整数数组 prices，其中 prices[i]表示第 i 天的股票价格 ；整数 fee 代表了交易股票的手续费用。
你可以无限次地完成交易，但是你每笔交易都需要付手续费。如果你已经购买了一个股票，在卖出它之前你就不能再继续购买股票了。
返回获得利润的最大值。
注意：这里的一笔交易指买入持有并卖出股票的整个过程，每笔交易你只需要为支付一次手续费。

示例 1：
输入：prices = [1, 3, 2, 8, 4, 9], fee = 2
输出：8
解释：能够达到的最大利润:  
在此处买入 prices[0] = 1
在此处卖出 prices[3] = 8
在此处买入 prices[4] = 4
在此处卖出 prices[5] = 9
总利润: ((8 - 1) - 2) + ((9 - 4) - 2) = 8

示例 2：
输入：prices = [1,3,7,5,10,3], fee = 3
输出：6
 
提示：
1 <= prices.length <= 5 * 104
1 <= prices[i] < 5 * 104
0 <= fee < 5 * 104
*/

// 动态规划
// 时间复杂度: O(n)，空间复杂度: O(2n)
function maxProfit(prices: number[], fee: number): number {
  // dp[i][0] 表示第 i 天不持有股票所得最多现金
  // dp[i][1] 表示第 i 天持有股票所得最多现金
  const dp: number[][] = []
  dp[0] = [0, -prices[0]]

  for (let i = 1; i < prices.length; i++) {
      dp[i] = []
      dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i] - fee)
      dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i])
  } 

  return dp[prices.length - 1][0]
};

// 贪心算法
// 最低值买，最高值（算上手续费还盈利）卖出。
// 时间复杂度: O(n)，空间复杂度: O(1)
function maxProfit(prices: number[], fee: number): number {
  let minPrice = prices[0]
  let result: number = 0

  for (let i = 1; i < prices.length; i++) {
      minPrice = Math.min(minPrice, prices[i])

      if (prices[i] > minPrice + fee) {
          result = result + prices[i] - minPrice - fee
          minPrice = prices[i] - fee
      }
  } 

  return result
};
