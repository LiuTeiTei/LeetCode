/* 
https://leetcode.com/problems/contains-duplicate-ii/

给定一个整数数组和一个整数 k，
判断数组中是否存在两个不同的索引 i 和 j，
使得 nums [i] = nums [j]，
并且 i 和 j 的差的 绝对值 小于 k。

示例 1:
输入: nums = [1,2,3,1], k = 3
输出: true

示例 2:
输入: nums = [1,0,1,1], k = 1
输出: true

示例 3:
输入: nums = [1,2,3,1,2,3], k = 2
输出: false
*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */

// 时间复杂度 O(n^2)
{
  let containsNearbyDuplicate = function(nums, k) {
    let res = false
  
    if (nums.length < 2) return res
  
    for(let i = 0, j = 0; i < nums.length; j++) {
      const item = nums[i]
      nums.shift()
      const originIndex = j
      const tempIndex = nums.indexOf(item)
      const secondIndex = tempIndex > -1 ? tempIndex + j : -1
  
      if ((secondIndex > -1)  && (secondIndex - originIndex < k)) {
        res = true
      }
    }
  
    return res
  };
}

// 维护一个哈希表，里面始终最多包含 k 个元素，当出现重复值时则说明在 k 距离内存在重复元素
// 每次遍历一个元素则将其加入哈希表中，如果哈希表的大小大于 k，则移除最前面的数字
// 时间复杂度 O(n)
var containsNearbyDuplicate = function(nums, k) {
  const set = new Set();
  for(let i = 0; i < nums.length; i++) {
    if (set.has(nums[i])) {
      return true;
    }

    set.add(nums[i]);
    if (set.size > k) {
      set.delete(nums[i - k]);
    }
  }

  return false;
}



console.log(containsNearbyDuplicate([1,2,3,1,2,3], 2))