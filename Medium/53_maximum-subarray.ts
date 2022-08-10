/* 
https://leetcode.com/problems/maximum-subarray/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0053.%E6%9C%80%E5%A4%A7%E5%AD%90%E5%BA%8F%E5%92%8C.md

给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
子数组 是数组中的一个连续部分。

示例 1：
输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
输出：6
解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。

示例 2：
输入：nums = [1]
输出：1

示例 3：
输入：nums = [5,4,-1,7,8]
输出：23
 
提示：
1 <= nums.length <= 105
-104 <= nums[i] <= 104
 
进阶：如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的 分治法 求解。
*/

// 局部最优：当前“连续和”为负数的时候立刻放弃，从下一个元素重新计算“连续和”
// 全局最优：选取最大“连续和”
// 时间复杂度：O(n)
function maxSubArray(nums: number[]): number {
  let sum = 0
  let result = nums[0]

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i]
    if (sum > result) {
      result = sum
    }
    if (sum < 0) {
      sum = 0
    }
  }

  return result
};