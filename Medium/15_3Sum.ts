/* 
https://leetcode.com/problems/3sum/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0015.%E4%B8%89%E6%95%B0%E4%B9%8B%E5%92%8C.md

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

// 三指针，中指针从左指针的下一位开始，右指针从数组尾部开始
// 时间复杂度 O(n^3)
// Time Limit Exceeded Or Runtime: 5112 ms, faster than 9.00%, Memory Usage: 52.7 MB, less than 90.38%
{
  function threeSum (nums: number[]): number[][] {
    // 因为不能有重复的三元组，而且没有顺序要求，因此可以先排序，删除掉出现过两次以上非 0 数字，以及出现过三次以上的 0 数字；
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

    if (nums[nums.length - 1] === 0 && nums[nums.length - 4] === 0) {
      nums.splice(nums.length - 1, 1)
    }
  
    const res: Array<string> = []
  
    // Runtime: 8380 ms, Memory Usage: 52.4 MB
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
}

// 三指针，但只排序，不做删除等额外的处理
// 时间复杂度 O(n^3)
// Runtime: 199 ms, faster than 79.21%, Memory Usage: 52.7 MB, less than 90.38%
function threeSum(nums: number[]): number[][] {
  if (nums.length < 3) return []

  nums.sort((a, b) => a - b)

  const resultArr: number[][] = []

  for (let leftP = 0; leftP < nums.length; leftP++) {
    // 去除重复值的 leftP
    if ( leftP > 0 && nums[leftP] === nums[leftP - 1] ) {
      continue
    }

    let middleP = leftP + 1
    let rightP = nums.length - 1

    while(middleP < rightP) {
      let sum = nums[leftP] + nums[middleP] + nums[rightP]

      if (sum === 0) {
        resultArr.push([nums[leftP], nums[middleP], nums[rightP]])

        // 去除重复值的 middleP
        while (nums[middleP] === nums[middleP + 1]) {
          middleP++
        }
        // 去除重复值的 rightP
        while(nums[rightP] === nums[rightP - 1]) {
          rightP--
        }

        middleP++
        rightP--
      } else if (sum < 0) {
        middleP++
      } else {
        rightP--
      }
    }
  }

  return resultArr
};

// Hash 方法，两 层for 循环确定 a、b 的数值，再使用哈希法来确定 0-(a+b) 是否在数组里出现过
// 简化为头尾指针的 TwoSum 问题，但要注意去除重复的结果
// 因为在去重的操作中有很多细节需要注意，虽然时间复杂度要低一些，但是逻辑层面没有三指针清晰
// 时间复杂度 O(n^2)

console.log(threeSum([-1,0,1,2,-1,-4]).map(arr => arr.join(',')))