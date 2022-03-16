/* 
https://leetcode.com/problems/4sum-ii/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0454.%E5%9B%9B%E6%95%B0%E7%9B%B8%E5%8A%A0II.md

给你四个整数数组 nums1、nums2、nums3 和 nums4 ，
数组长度都是 n ，请你计算有多少个元组 (i, j, k, l) 能满足：

0 <= i, j, k, l < n
nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0
 
示例 1：
输入：nums1 = [1,2], nums2 = [-2,-1], nums3 = [-1,2], nums4 = [0,2]
输出：2
解释：
两个元组如下：
1. (0, 0, 0, 1) -> nums1[0] + nums2[0] + nums3[0] + nums4[1] = 1 + (-2) + (-1) + 2 = 0
2. (1, 1, 0, 0) -> nums1[1] + nums2[1] + nums3[0] + nums4[0] = 2 + (-1) + (-1) + 0 = 0

示例 2：
输入：nums1 = [0], nums2 = [0], nums3 = [0], nums4 = [0]
输出：1
 
提示：
n == nums1.length
n == nums2.length
n == nums3.length
n == nums4.length
1 <= n <= 200
-228 <= nums1[i], nums2[i], nums3[i], nums4[i] <= 228
*/

// 不需要考虑重复出现的问题，拆分成求 1_TwoSum 的问题
// Runtime: 291 ms, faster than 73.37%, Memory Usage: 47.3 MB, less than 68.64% 
function fourSumCount(nums1: number[], nums2: number[], nums3: number[], nums4: number[]): number {
  const sumMap: Map<number, number> = new Map()
  let result = 0

  // 遍历 nums1 和 nums2，计算和，作为 sumMap 的 key，出现次数作为 sumMap 的 value
  nums1.forEach(number1 => {
    nums2.forEach(number2 => {
      const sum = number1 + number2
      const count = sumMap.get(sum)
      sumMap.set(sum, count ? count + 1 : 1)
    })
  })

  // 遍历 nums3 和 nums4，计算和，在 sumMap 中查找是否存在 0 - sum 的值
  nums3.forEach(number3 => {
    nums4.forEach(number4 => {
      const sum = number3 + number4
      const count = sumMap.get(0 - sum)
      if (count) {
        result += count
      }
    })
  })

  return result
};

console.log(fourSumCount([-1,-1], [-1,1], [-1,1], [1,-1]))
