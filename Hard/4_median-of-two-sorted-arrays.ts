/*
https://leetcode.cn/problems/median-of-two-sorted-arrays

给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的中位数。
算法的时间复杂度应该为 O(log (m+n)) 。

示例 1：
输入：nums1 = [1,3], nums2 = [2]
输出：2.00000
解释：合并数组 = [1,2,3] ，中位数 2

示例 2：
输入：nums1 = [1,2], nums2 = [3,4]
输出：2.50000
解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5

提示：
nums1.length == m
nums2.length == n
0 <= m <= 1000
0 <= n <= 1000
1 <= m + n <= 2000
-106 <= nums1[i], nums2[i] <= 106
*/

// 归并
// 时间复杂度 O(m + n)，空间复杂度 O(m + n)
{
  function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    const nums: number[] = []
    for (let i = 0, j = 0; i < nums1.length || j < nums2.length;) {
        if (j >= nums2.length || nums1[i] < nums2[j]) {
            nums.push(nums1[i])
            i++
        } else if (i >= nums1.length || nums2[j] < nums1[i]) {
            nums.push(nums2[j])
            j++
        } else if (nums1[i] === nums2[j]) {
            nums.push(nums1[i])
            nums.push(nums2[j])
            i++
            j++
        }
    }
    const index = (nums.length - 1) / 2
    return (nums.length - 1) % 2 ? (nums[Math.ceil(index)] + nums[Math.floor(index)]) / 2 : nums[index]
};
}