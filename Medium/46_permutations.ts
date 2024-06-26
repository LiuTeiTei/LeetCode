/* 
https://leetcode.com/problems/permutations/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0046.%E5%85%A8%E6%8E%92%E5%88%97.md

给定一个不含重复数字的数组 nums ，返回其所有可能的全排列。
你可以 按任意顺序 返回答案。

示例 1：
输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

示例 2：
输入：nums = [0,1]
输出：[[0,1],[1,0]]

示例 3：
输入：nums = [1]
输出：[[1]]
 
提示：
1 <= nums.length <= 6
-10 <= nums[i] <= 10
nums 中的所有整数 互不相同
*/

// 回溯法，哈希表记录使用过的值
// 时间复杂度: O(n×n!) 空间复杂度: O(n)
function permute(nums: number[]): number[][] {
  const backtracking = (path: number[], result: number[][]) => {
      if (path.length === nums.length) {
          result.push(path.slice())
          return
      }

      for (let i = 0; i < nums.length; i++) {
          if (usedMap.get(nums[i])) {
              continue
          }
          path.push(nums[i])
          usedMap.set(nums[i], true)
          backtracking(path, result)
          path.pop()
          usedMap.set(nums[i], false)
      }
  }

  const usedMap = new Map<number, boolean>()
  const result: number[][] = []
  backtracking([], result)
  return result
};