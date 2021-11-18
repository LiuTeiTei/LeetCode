/* 
https://leetcode.com/problems/two-sum/

给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
你可以按任意顺序返回答案。

示例 1：
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

示例 2：
输入：nums = [3,2,4], target = 6
输出：[1,2]

示例 3：
输入：nums = [3,3], target = 6
输出：[0,1]

提示：
2 <= nums.length <= 104
-109 <= nums[i] <= 109
-109 <= target <= 109
只会存在一个有效答案

进阶：你可以想出一个时间复杂度小于 O(n^2) 的算法吗？
*/

// Runtime: 116 ms 48.90%  ----  Memory Usage: 41.3 MB 57.61% 
// 时间复杂度 O(n^2)
// 暴力解法，双指针，右指针从左指针的下一位开始
// {
//   function twoSum(nums: number[], target: number): number[] {
//     for(let i = 0; i < nums.length; i++ ) {
//       for(let j = i + 1; j < nums.length; j++) {
//           if (nums[i] + nums[j] === target) {
//               return [i, j]
//           }
//       }
//     }
//   };
// }

// Runtime: 80 ms 90.92%  ----  Memory Usage: 40.9 MB 82.17% 
// 时间复杂度 O(4n)
// 头尾指针，指针从数组两头开始
function twoSum(nums: number[], target: number): number[] {
  let i = 0
  let j = nums.length - 1
  const copy = nums.slice().sort((a, b) => a - b)

  while(i < j) {
    if (copy[i] + copy[j] > target) {
      j--
    } else if (copy[i] + copy[j] < target) {
      i++
    } else {
      // 为了避免 ([3, 3], 6) 类似的输入
      return [nums.indexOf(copy[i]), nums.lastIndexOf(copy[j])]
    }
  }
};

console.log(twoSum([3, 2, 4], 6))