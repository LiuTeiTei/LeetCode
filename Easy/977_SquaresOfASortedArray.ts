/* 
https://leetcode.com/problems/squares-of-a-sorted-array/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0977.%E6%9C%89%E5%BA%8F%E6%95%B0%E7%BB%84%E7%9A%84%E5%B9%B3%E6%96%B9.md

给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。

示例 1：
输入：nums = [-4,-1,0,3,10]
输出：[0,1,9,16,100]
解释：平方后，数组变为 [16,1,0,9,100]
排序后，数组变为 [0,1,9,16,100]

示例 2：
输入：nums = [-7,-3,2,3,11]
输出：[4,9,9,49,121] 

提示：
1 <= nums.length <= 104
-104 <= nums[i] <= 104
nums 已按 非递减顺序 排序
 
进阶：
请你设计时间复杂度为 O(n) 的算法解决本问题
*/

// 暴力接法，先平方再排序
// 时间复杂度: O(n + n\log n)， 可以说是 O(n\log n)
// Runtime: 100 ms, faster than 98.09%, Memory Usage: 49.8 MB, less than 13.81%.
{
  function sortedSquares(nums: number[]): number[] {
    return nums.map(item => Math.pow(item, 2)).sort((a, b) => a - b)
  }
}

// 双指针法
// 时间复杂度为 O(n)
{
  function sortedSquares(nums: number[]): number[] {
    let leftP = 0;
    let rightP = nums.length - 1
    const result = (new Array(nums.length))
  
    for (let i = nums.length - 1; i >= 0; i--) {
      if (Math.abs(nums[rightP]) > Math.abs(nums[leftP])){
        result[i] = Math.pow(nums[rightP], 2)
        rightP--
      } else {
        result[i] = Math.pow(nums[leftP], 2)
        leftP++
      }
    }
  
    return result
  }
}

// 双指针法，代码简化
function sortedSquares(nums: number[]): number[] {
  const result = []
  let k = nums.length - 1

  for (let i = 0, j = nums.length - 1; i <= j;) {
    if (Math.abs(nums[j]) > Math.abs(nums[i])){
      result[k--] = Math.pow(nums[j], 2)
      j--
    } else {
      result[i--] = Math.pow(nums[i], 2)
      i++
    }
  }

  return result
}

console.log(sortedSquares([-7,-3,2,3,11]))
