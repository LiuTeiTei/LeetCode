/* 
https://leetcode.com/problems/3sum/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0015.%E4%B8%89%E6%95%B0%E4%B9%8B%E5%92%8C.md

给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a、b、c，
使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。
注意：答案中不可以包含重复的三元组。

示例 1：
输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]

示例 2：
输入：nums = []
输出：[]

示例 3：
输入：nums = [0]
输出：[]
 
提示：
0 <= nums.length <= 3000
-105 <= nums[i] <= 105
*/

// 哈希表
// 两层 for 循环确定 a、b 的数值，再使用哈希法来确定 0-(a+b) 是否在数组里出现过
// 要注意去除重复的结果，可以在循环时跳过重复的元素
// 时间复杂度：O(n^2)，空间复杂度：O(n)
function threeSum(nums: number[]): number[][] {
  const result: number[][] = []

  // 先排序
  nums.sort((a, b) => a - b)
  const numsMap = new Map<number, number>()
  nums.forEach((num) => {
      const times = numsMap.get(num)
      numsMap.set(num, times ? times + 1 : 1)
  })

  for (let i = 0; i < nums.length; i++) {
      if (i > 0 && nums[i] === nums[i - 1]) {
          // 避免 nums[i] 重复
          continue
      } else if (nums[i] <= 0) {
          for (let j = i + 1; j < nums.length; j++) {
              if (j > i + 1 && nums[j] === nums[j - 1]) {
                  // 避免 nums[j] 重复
                  continue
              } else {
                  const target = 0 - (nums[i] + nums[j])
                  const targetTimes = numsMap.get(target)
                  if (targetTimes && target >= nums[j]) {
                      if (
                          (nums[i] === nums[j] && target === nums[i] && target === nums[j] && targetTimes >= 3) ||
                          (nums[i] === nums[j] && target !== nums[i]) ||
                          (nums[i] !== nums[j] && target === nums[j] && targetTimes >= 2) ||
                          (nums[i] !== nums[j] && target !== nums[i] && target !== nums[j])
                      ) {
                          result.push([nums[i], nums[j], target])
                      }
                  }
              }
          }
      }
  } 

  return result
};

// 双指针
// 时间复杂度：O(n^2)，空间复杂度：O(1)
function threeSum(nums: number[]): number[][] {
  const result: number[][] = []

  // 先排序
  nums.sort((a, b) => a - b)

  for (let i = 0; i < nums.length; i++) {
      if (i > 0 && nums[i] === nums[i - 1]) {
          // 避免 nums[i] 重复
          continue
      } else if (nums[i] <= 0) {
          let left = i + 1
          let right = nums.length - 1
          while (left < right && nums[right] >= 0) {
              if (left > i + 1 && nums[left] === nums[left - 1]) {
                  // 避免 nums[left] 重复
                  left++
              } else {
                  const total = nums[i] + nums[left] + nums[right]
                  if (total > 0) {
                      right--
                  } else if (total < 0) {
                      left++
                  } else {
                      result.push([nums[i], nums[left], nums[right]])
                      right--
                      left++
                  }
              }
          }
      }
  } 

  return result
};