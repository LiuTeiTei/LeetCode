/* 
https://leetcode-cn.com/problems/find-all-numbers-disappeared-in-an-array/

给定一个范围在  1 ≤ a[i] ≤ n ( n = 数组大小 ) 的 整型数组，数组中的元素一些出现了两次，另一些只出现一次。
找到所有在 [1, n] 范围之间没有出现在数组中的数字。
您能在不使用额外空间且时间复杂度为O(n)的情况下完成这个任务吗? 你可以假定返回的数组不算在额外空间内。

示例 1:
输入:
[4,3,2,7,8,2,3,1]
输出:
[5,6]

示例 1:
输入:
[1,1]
输出:
[2]
*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */

// 这个表面上看时间复杂度是 O(n)，但 indexOf() 这个方法内含 O(n)，所以实际上是 O(n^2)
// 当体量特别大时，会 Time Limit Exceeded
{
  let findDisappearedNumbers = function(nums) {
    if (nums.length < 1) return

    let result = Array.from({length: nums.length}).map((item, index) => index + 1)
  
    nums.forEach(num => {
      const index = result.indexOf(num)
      if (index > -1) {
        result[index] = undefined
      }
    })
  
    return result.filter(item => item)
  };
}

// 没必要使用 indexOf() 寻找 result[num]，result 是按照 index 排序的，num = result[num - 1]
{
  let findDisappearedNumbers = function(nums) {
    if (nums.length < 1) return
      
    let result = Array.from({length: nums.length}).map((item, index) => index + 1)
  
    nums.forEach(num => {
      result[num - 1] = undefined
    })
  
    return result.filter(item => item)
  }
}

// 官方方案：
// 遍历 nums，每遇到一个数 x，就让 nums[x−1] 增加 n。
// 由于 nums 中所有数均在 [1,n] 中，增加以后，这些数必然大于 n。最后我们遍历 nums，若 nums[i] 未大于 n，就说明没有遇到过数 i+1。这样我们就找到了缺失的数字。
var findDisappearedNumbers = function(nums) {
  const len = nums.length

  nums.forEach(num => {
    const x = (num - 1) % len
    nums[x] += len
  })

  const res = []
  nums.forEach((num, index) => {
    if (num <= len) {
      res.push(index + 1)
    }
  })
  
  return res
}


console.log(findDisappearedNumbers([1,3,2,7,8,2,3,1]))