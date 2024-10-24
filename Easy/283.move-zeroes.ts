/* 
https://leetcode.cn/problems/move-zeroes/description/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0283.%E7%A7%BB%E5%8A%A8%E9%9B%B6.md

给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
请注意 ，必须在不复制数组的情况下原地对数组进行操作。

示例 1:
输入: nums = [0,1,0,3,12]
输出: [1,3,12,0,0]

示例 2:
输入: nums = [0]
输出: [0]
 
提示:
1 <= nums.length <= 104
-231 <= nums[i] <= 231 - 1
 
进阶：你能尽量减少完成的操作次数吗？
*/

/**
 Do not return anything, modify nums in-place instead.
 */
// 双指针
// 时间复杂度: O(n) 空间复杂度: O(1)
function moveZeroes(nums: number[]): void {
  let slow = 0
  let fast = 0

  // 移除 0 元素
  while(fast < nums.length) {
      if (nums[fast] !== 0) {
          nums[slow] = nums[fast]
          slow += 1
      }
      fast += 1
  }
  
  // 将 slow 之后的冗余元素赋值为 0
  for (let i = slow; i < nums.length; i++) {
      nums[i] = 0
  }
};
