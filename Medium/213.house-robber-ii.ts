/* 
https://leetcode.com/problems/house-robber-ii/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0213.%E6%89%93%E5%AE%B6%E5%8A%AB%E8%88%8DII.md

你是一个专业的小偷，计划偷窃沿街的房屋，
每间房内都藏有一定的现金。
这个地方所有的房屋都 围成一圈 ，这意味着第一个房屋和最后一个房屋是紧挨着的。
同时，相邻的房屋装有相互连通的防盗系统，
如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警 。
给定一个代表每个房屋存放金额的非负整数数组，
计算你 在不触动警报装置的情况下 ，今晚能够偷窃到的最高金额。

示例 1：
输入：nums = [2,3,2]
输出：3
解释：你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）, 因为他们是相邻的。

示例 2：
输入：nums = [1,2,3,1]
输出：4
解释：你可以先偷窃 1 号房屋（金额 = 1），然后偷窃 3 号房屋（金额 = 3）。
     偷窃到的最高金额 = 1 + 3 = 4 。

示例 3：
输入：nums = [1,2,3]
输出：3
 
提示：

1 <= nums.length <= 100
0 <= nums[i] <= 1000
*/

// 动态规划
// dp0[i] 表示没有偷 1 家时，最大偷窃金额
// dp1[i] 表示可能偷了第 1 家时，最大偷窃金额
// 时间复杂度: O(n) 空间复杂度: O(2n)
function rob(nums: number[]): number {
  if (nums.length <= 1) return nums[0] ?? 0
  if (nums.length === 2) return Math.max(nums[0], nums[1])

  const dp0 = new Array(nums.length)
  const dp1 = new Array(nums.length)
  dp0[0] = 0
  dp0[1] = nums[1]
  dp1[0] = nums[0]
  dp1[1] = Math.max(nums[0], nums[1])

  for (let i = 2; i < nums.length - 1; i++) {
      dp0[i] = Math.max(dp0[i - 1], dp0[i - 2] + nums[i])
      dp1[i] = Math.max(dp1[i - 1], dp1[i - 2] + nums[i])
  }

  dp0[nums.length - 1] = Math.max(dp0[nums.length - 2], dp0[nums.length - 3] + nums[nums.length - 1])
  dp1[nums.length - 1] = dp1[nums.length - 2]

  return Math.max(dp0.at(-1), dp1.at(-1))
};

// 动态规划
// 时间复杂度: O(2n) 空间复杂度: O(n)
function rob(nums: number[]): number {
  if (nums.length <= 1) return nums[0] ?? 0

  const robRange = (nums: number[]) => {
      if (nums.length <= 1) return nums[0] ?? 0
      
      const dp = new Array(nums.length)
      dp[0] = nums[0]
      dp[1] = Math.max(nums[0], nums[1])

      for (let i = 2; i < nums.length; i++) {
          dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
      }

      return dp.at(-1)
  }

  // 可能偷第一家，一定不能偷最后一家
  const res1 = robRange(nums.slice(0, nums.length - 1))
  // 可能偷最后一家，一定不会偷第一家
  const res2 = robRange(nums.slice(1, nums.length))

  return Math.max(res1, res2)
};