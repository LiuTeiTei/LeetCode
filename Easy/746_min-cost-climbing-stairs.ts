/* 
https://leetcode.com/problems/min-cost-climbing-stairs/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0746.%E4%BD%BF%E7%94%A8%E6%9C%80%E5%B0%8F%E8%8A%B1%E8%B4%B9%E7%88%AC%E6%A5%BC%E6%A2%AF.md

给你一个整数数组 cost ，其中 cost[i] 是从楼梯第 i 个台阶向上爬需要支付的费用。
一旦你支付此费用，即可选择向上爬一个或者两个台阶。
你可以选择从下标为 0 或下标为 1 的台阶开始爬楼梯。
请你计算并返回达到楼梯顶部的最低花费。

示例 1：
输入：cost = [10,15,20]
输出：15
解释：你将从下标为 1 的台阶开始。
- 支付 15 ，向上爬两个台阶，到达楼梯顶部。
总花费为 15 。

示例 2：
输入：cost = [1,100,1,1,1,100,1,1,100,1]
输出：6
解释：你将从下标为 0 的台阶开始。
- 支付 1 ，向上爬两个台阶，到达下标为 2 的台阶。
- 支付 1 ，向上爬两个台阶，到达下标为 4 的台阶。
- 支付 1 ，向上爬两个台阶，到达下标为 6 的台阶。
- 支付 1 ，向上爬一个台阶，到达下标为 7 的台阶。
- 支付 1 ，向上爬两个台阶，到达下标为 9 的台阶。
- 支付 1 ，向上爬一个台阶，到达楼梯顶部。
总花费为 6 。
 
提示：
2 <= cost.length <= 1000
0 <= cost[i] <= 999
*/

function minCostClimbingStairs(cost: number[]): number {
  const dp: number[] = []
  dp[0] = 0
  dp[1] = 0

  for (let i = 2; i <= cost.length; i++) {
    // 有两个途径得到 dp[i]，一个是 dp[i-1] 一个是 dp[i-2]
    // dp[i - 1] 跳到 dp[i] 需要花费 dp[i - 1] + cost[i - 1]
    // dp[i - 2] 跳到 dp[i] 需要花费 dp[i - 2] + cost[i - 2]
    dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])
  }

  return dp[cost.length]
};

console.log(minCostClimbingStairs([0,0,0,1]))
console.log(minCostClimbingStairs([0,0,1,1]))