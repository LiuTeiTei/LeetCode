/* 
https://leetcode.com/problems/house-robber/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0198.%E6%89%93%E5%AE%B6%E5%8A%AB%E8%88%8D.md

你是一个专业的小偷，计划偷窃沿街的房屋。
每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，
如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
给定一个代表每个房屋存放金额的非负整数数组，
计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。

示例 1：
输入：[1,2,3,1]
输出：4
解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
     偷窃到的最高金额 = 1 + 3 = 4 。

示例 2：
输入：[2,7,9,3,1]
输出：12
解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
     偷窃到的最高金额 = 2 + 9 + 1 = 12 。
 
提示：
1 <= nums.length <= 100
0 <= nums[i] <= 400
通过
*/

// 动态规划
// dp[0][i] 表示可能偷了第 i-1 的情况下最大值，即不偷 i
// dp[1][i] 表示没有偷第 i-1 的情况下最大值，即偷 i
// dp[0][i] = max(dp[1][i - 1], dp[0][i - 1])
// dp[1][i] = dp[0][i - 1] + nums[i]
// 时间复杂度: O(n) 空间复杂度: O(2n)
function rob(nums: number[]): number {
  const dp0 = new Array(nums.length)
  const dp1 = new Array(nums.length)
  dp0[0] = 0
  dp1[0] = nums[0]

  for (let i = 1; i < nums.length; i++) {
      dp0[i] = Math.max(dp1[i - 1], dp0[i - 1])
      dp1[i] = dp0[i - 1] + nums[i]
  }

  return Math.max(dp0.at(-1), dp1.at(-1))
};

// 动态规划
// dp[i] 考虑下标i（包括i）以内的房屋，最多可以偷窃的金额为dp[i]
// dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
// 时间复杂度: O(n) 空间复杂度: O(n)
function rob(nums: number[]): number {
  const dp = new Array(nums.length)
  dp[0] = nums[0]
  dp[1] = Math.max(nums[0], nums[1])

  for (let i = 2; i < nums.length; i++) {
      dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
  }

  return dp[nums.length - 1]
};