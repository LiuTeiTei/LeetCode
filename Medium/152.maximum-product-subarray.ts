/* 
https://leetcode.cn/problems/maximum-product-subarray/description/

给你一个整数数组 nums ，请你找出数组中乘积最大的非空连续 子数组
（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。
测试用例的答案是一个 32-位 整数。

示例 1:
输入: nums = [2,3,-2,4]
输出: 6
解释: 子数组 [2,3] 有最大乘积 6。

示例 2:
输入: nums = [-2,0,-1]
输出: 0
解释: 结果不能为 2, 因为 [-2,-1] 不是子数组。
 
提示:
1 <= nums.length <= 2 * 104
-10 <= nums[i] <= 10
nums 的任何子数组的乘积都 保证 是一个 32-位 整数
*/

// 动态规划
// dpMax[i] 表示当前最大乘积
// dpMin[i] 表示当前最小乘积
// num[i] 为负数时，先交换 dpMax[i] 和 dpMin[i] 再进行下一步计算
// 时间复杂度: O(n) 空间复杂度: O(2n)
function maxProduct(nums: number[]): number {
  const dpMax: number[] = new Array(nums.length)
  dpMax[0] = nums[0]
  const dpMin: number[] = new Array(nums.length)
  dpMin[0] = nums[0]
  let max: number = nums[0]

  for (let i = 1; i < nums.length; i++) {
      if (nums[i] < 0) {
          dpMax[i] = Math.max(dpMin[i - 1] * nums[i], nums[i])
          dpMin[i] = Math.min(dpMax[i - 1] * nums[i], nums[i])
      } else {
          dpMax[i] = Math.max(dpMax[i - 1] * nums[i], nums[i])
          dpMin[i] = Math.min(dpMin[i - 1] * nums[i], nums[i])
      }
      max = Math.max(max, dpMax[i])
  }

  return max
};

// 动态规划-剪枝
// maxi 表示当前最大乘积
// mini 表示当前最小乘积
// num[i] 为负数时，先交换 maxi 和 mini 再进行下一步计算
// 时间复杂度: O(n) 空间复杂度: O(2)
function maxProduct(nums: number[]): number {
  let maxi = nums[0]
  let mini = nums[0]
  let max: number = nums[0]

  for (let i = 1; i < nums.length; i++) {
      if (nums[i] < 0) {
          const temp = maxi
          maxi = mini
          mini = temp
      }
      maxi = Math.max(maxi * nums[i], nums[i])
      mini = Math.min(mini * nums[i], nums[i])

      max = Math.max(max, maxi)
  }

  return max
};
