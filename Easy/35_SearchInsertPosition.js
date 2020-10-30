/* 
https://leetcode-cn.com/problems/search-insert-position/

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

{
    // 时间复杂度：O(n)
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
// 最后的目标：「在一个有序数组中找第一个大于等于 target 的下标」
// 时间复杂度：O(logn)，其中 n 为数组的长度。二分查找所需的时间复杂度为 O(logn)。
// 空间复杂度：O(1)。我们只需要常数空间存放若干变量。

var searchInsert = function(nums, target) {
    const n = nums.length;
    let left = 0, right = n - 1, ans = n;
    while (left <= right) {
        let mid = ((right - left) >> 1) + left;
        if (target <= nums[mid]) {
            ans = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return ans;
}

console.log(searchInsert([1,3,5,6], 7))