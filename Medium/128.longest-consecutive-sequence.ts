/* 
https://leetcode.cn/problems/longest-consecutive-sequence/description/

给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
请你设计并实现时间复杂度为 O(n) 的算法解决此问题。

示例 1：
输入：nums = [100,4,200,1,3,2]
输出：4
解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。

示例 2：
输入：nums = [0,3,7,2,5,8,4,6,0,1]
输出：9
 
提示：
0 <= nums.length <= 105
-109 <= nums[i] <= 109
*/

// 时间复杂度: O(n) 空间复杂度: O(n)
function longestConsecutive(nums: number[]): number {
  const numsSet = new Set<number>()

  for (let i = 0; i < nums.length; i++) {
      numsSet.add(nums[i])
  }

  let result = 0
  for (const num of numsSet) {
      if (!numsSet.has(num - 1)) {
          let temp = 1
          for (let j = num + 1; numsSet.has(j); j++) {
              temp += 1
          }
          result = Math.max(result, temp)
      }
  }

  return result
};
