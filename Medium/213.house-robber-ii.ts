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

function rob(nums: number[]): number {
  if (nums.length === 1) return nums[0]
  if (nums.length === 2) return Math.max(nums[0], nums[1])

  const robPart = (numsPart: number[]): number => {
    const dp: number[] = new Array(numsPart.length).fill(0)

    dp[0] = numsPart[0]
    dp[1] = Math.max(numsPart[0], numsPart[1])
  
    for (let i = 2; i < numsPart.length; i++) {
      dp[i] = Math.max(dp[i - 2] + numsPart[i], dp[i - 1])
    }
  
    return dp[numsPart.length - 1]
  }

  // 不偷窃第一个房屋
  const result1 = robPart(nums.slice(1))

  // 不偷窃最后一个房屋
  const result2 = robPart(nums.slice(0, nums.length - 1))

  return Math.max(result1, result2)
};