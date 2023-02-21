/* 
https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0121.%E4%B9%B0%E5%8D%96%E8%82%A1%E7%A5%A8%E7%9A%84%E6%9C%80%E4%BD%B3%E6%97%B6%E6%9C%BA.md

给定一个数组 prices ，
它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。
你只能选择 某一天 买入这只股票，
并选择在 未来的某一个不同的日子 卖出该股票。
设计一个算法来计算你所能获取的最大利润。
返回你可以从这笔交易中获取的最大利润。
如果你不能获取任何利润，返回 0 。

示例 1：
输入：[7,1,5,3,6,4]
输出：5
解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。

示例 2：
输入：prices = [7,6,4,3,1]
输出：0
解释：在这种情况下, 没有交易完成, 所以最大利润为 0。
 
提示：
1 <= prices.length <= 105
0 <= prices[i] <= 104
*/

// 贪心算法：取最左最小值，取最右最大值，得到的差值就是最大利润
// 时间复杂度：O(n)，空间复杂度：O(1)
{
  function maxProfit(prices: number[]): number {
    let min = Number.MAX_SAFE_INTEGER
    let result = 0
  
    for (let i = 0; i < prices.length; i++) {
      min = Math.min(min, prices[i])
      result = Math.max(result, prices[i] - min)
    }
  
    return result
  };
}

// 动态规划
// 时间复杂度：O(n)，空间复杂度：O(n)
function maxProfit(prices: number[]): number {
  // dp[i][0] 表示第i天持有股票所得最多现金，dp[i][1] 表示第i天不持有股票所得最多现金
  const dp: number[][] = []

  // 初始化
  dp[0] = [-prices[0], 0]

  // 从前往后遍历
  for (let i = 1; i < prices.length; i++) {
    dp[i] = []
    dp[i][0] = Math.max(dp[i - 1][0], -prices[i])
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] + prices[i])
  }

  return dp[prices.length - 1][1]
};