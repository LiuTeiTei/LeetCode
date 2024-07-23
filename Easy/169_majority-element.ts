/* 

https://leetcode.cn/problems/majority-element/description/

给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。
你可以假设数组是非空的，并且给定的数组总是存在多数元素。

示例 1：
输入：nums = [3,2,3]
输出：3

示例 2：
输入：nums = [2,2,1,1,1,2,2]
输出：2
 
提示：
n == nums.length
1 <= n <= 5 * 104
-109 <= nums[i] <= 109

进阶：尝试设计时间复杂度为 O(n)、空间复杂度为 O(1) 的算法解决此问题。
*/

// 哈希表
// 时间复杂度: O(2n) 空间复杂度: O(n)
function majorityElement(nums: number[]): number {
  const map = new Map<number, number>()
  const target = nums.length / 2

  for (let i = 0; i < nums.length; i++) {
      map.set(nums[i], (map.get(nums[i]) || 0) + 1)
  }

  for (var key of map) {
      if (map.get(key[0]) > target) return key[0]
  }
};

// 排序
// 时间复杂度: O(nlogn) 空间复杂度: O(logn)
function majorityElement(nums: number[]): number {
  nums.sort((a, b) => a - b)
  return nums[Math.floor(nums.length / 2)]
};

// Boyer-Moore 投票算法
// 时间复杂度: O(n) 空间复杂度: O(1)
function majorityElement(nums: number[]): number {
  let count = 0
  let result: number

  for (let i = 0; i < nums.length; i++) {
      if (count === 0) {
          result = nums[i]
      }
      if (result === nums[i]) {
          count++
      } else {
          count--
      }
  }

  return result
};
