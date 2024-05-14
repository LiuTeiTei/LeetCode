/* 
https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0034.%E5%9C%A8%E6%8E%92%E5%BA%8F%E6%95%B0%E7%BB%84%E4%B8%AD%E6%9F%A5%E6%89%BE%E5%85%83%E7%B4%A0%E7%9A%84%E7%AC%AC%E4%B8%80%E4%B8%AA%E5%92%8C%E6%9C%80%E5%90%8E%E4%B8%80%E4%B8%AA%E4%BD%8D%E7%BD%AE.md

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

// 二分法
// 时间复杂度 O(n + log⁡n)，空间复杂度 O(1)
function searchRange(nums: number[], target: number): number[] {
  let index = -1
  let left = 0
  let right = nums.length - 1

  // 先找到一个 index
  while (left <= right) {
      if (left === right) {
          index = nums[left] === target ? left : -1
          break
      }
      if (nums[left] === target) {
          index = left
          break
      }
      if (nums[right] === target) {
          index = right
          break
      }
      const mid = Math.floor((left + right) / 2)
      if (nums[mid] === target) {
          index = mid
          break
      }
      if (nums[mid] <= target) {
          left = mid + 1
      } else {
          right = mid - 1
      }
  }

  if (index < 0) {
      return [index, index]
  }

  // 再查找两边边界
  let first = index
  let last = index
  while (nums[first] === target) {
      first = first - 1
  }
  while (nums[last] === target) {
      last = last + 1
  }


  return [first + 1, last - 1]
};

// 二分法
// 时间复杂度 O(log⁡n)，空间复杂度 O(1)
function searchRange(nums: number[], target: number): number[] {
  // 查找第一个小于 target 的元素下标
  const getLeftBorder = () => {
      let left = 0
      let right = nums.length - 1
      let leftBorder = -2
      while (left <= right) {
          const mid = Math.floor((left + right) / 2)
          if (nums[mid] >= target) {
              right = mid - 1
              leftBorder = right
          } else {
              left = mid + 1
          }
      }
      return leftBorder
  }

  // 查找第一个大于 target 的元素下标
  const getRightBorder = () => {
      let left = 0
      let right = nums.length - 1
      let rightBorder = -2
      while (left <= right) {
          const mid = Math.floor((left + right) / 2)
          if (nums[mid] <= target) {
              left = mid + 1
              rightBorder = left
          } else {
              right = mid - 1
          }
      }
      return rightBorder
  }

  const left = getLeftBorder()
  const right = getRightBorder()
  if (left < -1 || right < -1) return [-1, -1]
  if (right - left < 2) return [-1, -1]
  return [left + 1, right - 1]
};

// 上面方法的查找边界值的简化
function searchRange(nums: number[], target: number): number[] {
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
