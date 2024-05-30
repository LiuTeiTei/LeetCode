/* 
https://leetcode.cn/problems/maximum-length-of-repeated-subarray/description/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0718.%E6%9C%80%E9%95%BF%E9%87%8D%E5%A4%8D%E5%AD%90%E6%95%B0%E7%BB%84.md

给两个整数数组 nums1 和 nums2 ，返回 两个数组中 公共的 、长度最长的子数组的长度 。

示例 1：
输入：nums1 = [1,2,3,2,1], nums2 = [3,2,1,4,7]
输出：3
解释：长度最长的公共子数组是 [3,2,1] 。

示例 2：
输入：nums1 = [0,0,0,0,0], nums2 = [0,0,0,0,0]
输出：5

提示：
1 <= nums1.length, nums2.length <= 1000
0 <= nums1[i], nums2[i] <= 100
*/

// 动态规划
// dp[i][j]: 以下标 i 为结尾的 A，和以下标 j 为结尾的 B，最长重复子数组长度为 dp[i][j]
// 当 A[i] 和 B[j] 相等的时候，dp[i][j] = dp[i - 1][j - 1] + 1
// 时间复杂度: O(m * n) 空间复杂度: O(m * n)
function findLength(nums1: number[], nums2: number[]): number {
  const m = nums1.length
  const n = nums2.length
  const dp: number[][] = new Array(m).fill(0).map(_ => new Array(n).fill(0))
  let max = 0

  for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
          if (nums1[i] === nums2[j]) {
              if (i === 0 || j === 0) {
                  dp[i][j] = 1
              } else {
                  dp[i][j] = dp[i - 1][j - 1] + 1
              }
              max = Math.max(max, dp[i][j])
          }
      }
  }

  return max
};
