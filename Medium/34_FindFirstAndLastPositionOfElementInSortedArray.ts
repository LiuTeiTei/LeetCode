/* 
https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/

给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。
如果数组中不存在目标值 target，返回 [-1, -1]。

进阶：
你可以设计并实现时间复杂度为 O(log n) 的算法解决此问题吗？
 
示例 1：
输入：nums = [5,7,7,8,8,10], target = 8
输出：[3,4]

示例 2：
输入：nums = [5,7,7,8,8,10], target = 6
输出：[-1,-1]

示例 3：
输入：nums = [], target = 0
输出：[-1,-1]
*/

// 两次二分法，分别找出开始位置和结束位置
// 时间复杂度为 O(2 * log n)
// Runtime: 68 ms, faster than 98.53%; Memory Usage: 44.3 MB, less than 23.01%.
{
  let searchRange = function (nums: number[], target: number): number[] {
    let outLeft = 0
    let outRight = nums.length - 1
    const result = [-1, -1]
  
    // get result[0]
    const getLeftBorder = (outLeft: number, outRight: number) => {
      let left = outLeft
      let right = outRight

      while(left <= right) {
        const middle = Math.floor((left + right) / 2)
    
        if (target > nums[middle]) {
          left = middle + 1
        } else if (target < nums[middle]) {
          right = middle - 1
        } else {
          if (nums[middle - 1] !== undefined && nums[middle - 1] === target) {
            left = middle - 1
            right = middle - 1
          } else {
            result[0] = middle
            break
          }
        }
      }
    }
  
    // get result[1]
    const getRightBorder = (outLeft: number, outRight: number) => {
      let left = outLeft
      let right = outRight

      while(left <= right) {
        const middle = Math.floor((left + right) / 2)
    
        if (target > nums[middle]) {
          left = middle + 1
        } else if (target < nums[middle]) {
          right = middle - 1
        } else {
          if (nums[middle + 1] !== undefined && nums[middle + 1] === target) {
            left = middle + 1
            right = middle + 1
          } else {
            result[1] = middle
            break
          }
        }
      }
    }
  
    getLeftBorder(outLeft, outRight)
    getRightBorder(outLeft, outRight)
    return result
  }; 
}

// 上面方法的查找边界值的简化
let searchRange = function (nums: number[], target: number): number[] {
  let outLeft = 0
  let outRight = nums.length - 1
  const result = [-1, -1]

  // get result[0]
  const getLeftBorder = (outLeft: number, outRight: number) => {
    let left = outLeft
    let right = outRight

    while(left <= right) {
      const middle = Math.floor((left + right) / 2)
  
      if (target > nums[middle]) {
        left = middle + 1
      } else {
        right = middle - 1
        result[0] = middle
      }
    }
  }

  // get result[1]
  const getRightBorder = (outLeft: number, outRight: number) => {
    let left = outLeft
    let right = outRight

    while(left <= right) {
      const middle = Math.floor((left + right) / 2)
  
      if (target < nums[middle]) {
        right = middle - 1
      } else {
        left = middle + 1
        result[1] = middle
      }
    }
  }

  getLeftBorder(outLeft, outRight)
  getRightBorder(outLeft, outRight)
  return result
}; 

console.log(searchRange([5,7,7,8,8,10], 0))
