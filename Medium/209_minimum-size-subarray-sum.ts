/* 
https://leetcode.com/problems/minimum-size-subarray-sum/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0209.%E9%95%BF%E5%BA%A6%E6%9C%80%E5%B0%8F%E7%9A%84%E5%AD%90%E6%95%B0%E7%BB%84.md

给定一个含有 n 个正整数的数组和一个正整数 target 。
找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。

示例 1：
输入：target = 7, nums = [2,3,1,2,4,3]
输出：2
解释：子数组 [4,3] 是该条件下的长度最小的子数组。

示例 2：
输入：target = 4, nums = [1,4,4]
输出：1

示例 3：
输入：target = 11, nums = [1,1,1,1,1,1,1,1]
输出：0
 
提示：
1 <= target <= 109
1 <= nums.length <= 105
1 <= nums[i] <= 105

进阶：
如果你已经实现 O(n) 时间复杂度的解法, 请尝试设计一个 O(n log(n)) 时间复杂度的解法。
*/

// 滑动窗口
// 时间复杂度: O(n) 空间复杂度: O(1)
function minSubArrayLen(target: number, nums: number[]): number {
  let leftP = 0
  let rightP = 0
  let sum = nums[rightP]
  let result = nums.length + 1

  while(leftP < nums.length && rightP < nums.length) {
      if (sum >= target) {
          // 特殊情况，存在符合条件的子数组最小为 1 
          if (leftP === rightP) return 1
          result = Math.min(result, rightP - leftP + 1)
          sum = sum - nums[leftP]
          leftP += 1
      } else {
          rightP += 1
          sum = sum + nums[rightP]
      }
  }

  return result > nums.length ? 0 : result
};
