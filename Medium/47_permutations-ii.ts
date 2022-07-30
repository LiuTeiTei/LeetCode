/* 
https://leetcode.com/problems/permutations-ii/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0047.%E5%85%A8%E6%8E%92%E5%88%97II.md

给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。

示例 1：
输入：nums = [1,1,2]
输出：
[[1,1,2],[1,2,1],[2,1,1]]

示例 2：
输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

提示：
1 <= nums.length <= 8
-10 <= nums[i] <= 10
*/

function permuteUnique(nums: number[]): number[][] {
  const result: number[][] = []
  const path: number[] = []

  const backtracking = (used: boolean[]) => {
    if (path.length == nums.length) {
      result.push([...path])
      return
    }

    for(let i = 0; i < nums.length; i++) {
      // used[i] === true 表示当前数字取过
      // i > 0 && nums[i - 1] === nums[i] && used[i - 1] === true) 表示当前数字在同一层内重复了，且被取过
      if (used[i] === true || (i > 0 && nums[i - 1] === nums[i] && used[i - 1] === true)) {
        continue
      }

      used[i] = true
      path.push(nums[i])
      backtracking(used)
      path.pop()
      used[i] = false
    }
  }

  nums.sort((a, b) => a - b)
  backtracking(new Array(nums.length).fill(false))
  return result
};
