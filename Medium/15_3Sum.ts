/* 
https://leetcode.com/problems/3sum/

给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。
注意：答案中不可以包含重复的三元组。

示例 1：
输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]

示例 2：
输入：nums = []
输出：[]

示例 3：
输入：nums = [0]
输出：[]
 
提示：
0 <= nums.length <= 3000
-105 <= nums[i] <= 105

*/

interface Array<T> {
  includes(value: T): boolean
}

// Runtime: 8380 ms, Memory Usage: 52.4 MB
function threeSum (nums: number[]): number[][] {
  // 因为不能有重复的三元组，而且没有顺序要求，因此可以先排序，删除掉出现过两次以上数字（除 0 以外）
  nums.sort((a, b) => a - b)
  for (let i = 1; i < nums.length - 2; i++){
    if (nums[i] === 0) {
      if (nums[i - 1] === nums[i] && nums[i + 2] === nums[i]){
        nums.splice(i + 1, 1)
      }
    } else {
      if (nums[i - 1] === nums[i] && nums[i + 1] === nums[i]){
        nums.splice(i + 1, 1)
      }
    }
  }
  if (nums[nums.length - 1] === 0 && nums[nums.length - 4] === 0) nums.splice(nums.length - 1, 1)

  const res: Array<string> = []

  // 在剩下的数组里面查找目标 c
  // const findThird = (a: number, b: number, arr: Array<number>) => {
  //   const c = 0 - (a + b)
  //   return arr.includes(c) ? [a, b, c].sort((a, b) => a - b).join(',') : undefined
  // }

  // 因为是按顺序排列的，所以当 arr[i] < c 时前面的值肯定不能满足条件，不需要再遍历了
  const findThird = (a: number, b: number, arr: Array<number>) => {
    const c = 0 - (a + b)
    let exit = false

    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i] === c) {
        exit = true
        break
      }

      if (arr[i] < c) {
        break
      }
    }
    
    return exit ? [a, b, c].join(',') : undefined
  }

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length - 1; j++) {
      const restNums = nums.slice(j + 1, nums.length)
      const resChild = findThird(nums[i], nums[j], restNums)

      // 需要排序重复的值
      if (resChild && !res.includes(resChild)) {
        res.push(resChild)
      }
    }
  }

  return res.map(string => string.split(',').map(item => Number(item)))
};

console.log(threeSum([0, 0, 0]).map(arr => arr.join(',')))