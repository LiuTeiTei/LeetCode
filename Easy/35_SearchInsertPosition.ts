/* 
https://leetcode-cn.com/problems/search-insert-position/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0035.%E6%90%9C%E7%B4%A2%E6%8F%92%E5%85%A5%E4%BD%8D%E7%BD%AE.md

给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
你可以假设数组中无重复元素。

示例 1:
输入: [1,3,5,6], 5
输出: 2

示例 2:
输入: [1,3,5,6], 2
输出: 1

示例 3:
输入: [1,3,5,6], 7
输出: 4

示例 4:
输入: [1,3,5,6], 0
输出: 0
*/

// 时间复杂度：O(n)
{
  let searchInsert = function(nums, target) {
    if (!Array.isArray(nums)) return null
    if (nums.length < 1) return 0
    for(let i = 0; i <= nums.length; ) {
      if (nums[i] < target) {
        i++
      } else {
        return i
      }
    }
  }
}

// 二分法
let searchInsert = function (nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1
  let result = 0

  while (left <= right) {
    const middle = Math.floor((left + right) / 2)

    if (target > nums[middle]) {
      left = middle + 1
      result = left
    } else if (target < nums[middle]) {
      right = middle - 1
    } else {
      return middle
    }
  }

  return result
};

console.log(searchInsert([1,3,5,6], 5))