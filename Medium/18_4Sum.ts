/* 
https://leetcode.com/problems/4sum/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0018.%E5%9B%9B%E6%95%B0%E4%B9%8B%E5%92%8C.md

给你一个由 n 个整数组成的数组 nums ，和一个目标值 target 。
请你找出并返回满足下述全部条件且不重复的四元组 [nums[a], nums[b], nums[c], nums[d]] 
（若两个四元组元素一一对应，则认为两个四元组重复）：

0 <= a, b, c, d < n
a、b、c 和 d 互不相同
nums[a] + nums[b] + nums[c] + nums[d] == target
你可以按 任意顺序 返回答案 。

 
示例 1：
输入：nums = [1,0,-1,0,-2,2], target = 0
输出：[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]

示例 2：
输入：nums = [2,2,2,2,2], target = 8
输出：[[2,2,2,2]]
 

提示：
1 <= nums.length <= 200
-109 <= nums[i] <= 109
-109 <= target <= 109
*/

// 双指针，15_3Sum 的进阶版，再外层再套一层循环
// 时间复杂度 O(n^3)
// 和 454_4SumII 不同的是，输入只有一个数组，且结果不能重复
// Runtime: 185 ms, faster than 54.73%, Memory Usage: 45.1 MB, less than 86.49%
function fourSum(nums: number[], target: number): number[][] {
  const resultArr: number[][] = []

  if (nums.length < 4) return resultArr

  // 先从小到大排序
  nums.sort((a, b) => a - b)

  for (let i = 0; i < nums.length - 3; i++) {
    // 去除 i 的重复值
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue
    }

    for (let j = i + 1; j < nums.length - 2; j++) {
      // 去除 j 的重复值
      if (j > i + 1 && nums[j] === nums[j - 1]) {
        continue
      }

      let leftP = j + 1
      let rightP = nums.length - 1
      
      while(leftP < rightP) {
        const sum = nums[i] + nums[j] + nums[leftP] + nums[rightP]
        if (sum > target) {
          rightP--
        } else if (sum < target) {
          leftP++
        } else {
          resultArr.push([nums[i], nums[j], nums[leftP], nums[rightP]])

          // 去除 leftP 的重复值
          while(nums[leftP] === nums[leftP + 1]){
            leftP++
          }

          // 去除 leftP 的重复值
          while(nums[rightP] === nums[rightP - 1]){
            rightP--
          }

          leftP++
          rightP--
        }
      }
    }
  }

  return resultArr
};

console.log(fourSum([1,0,-1,0,-2,2], 0))
