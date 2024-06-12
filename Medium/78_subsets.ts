/* 
https://leetcode.com/problems/subsets/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0078.%E5%AD%90%E9%9B%86.md

给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。
解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。

示例 1：
输入：nums = [1,2,3]
输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

示例 2：
输入：nums = [0]
输出：[[],[0]]
 
提示：
1 <= nums.length <= 10
-10 <= nums[i] <= 10

nums 中的所有元素 互不相同
*/

// 回溯算法
// 时间复杂度: O(n * 2^n) 空间复杂度: O(n)
function subsets(nums: number[]): number[][] {
  const result: number[][] = []

  const backtracking = (index: number, path: number[]) => {
      result.push([...path])

      if (index >= nums.length) {
          return
      }

      for (let i = index; i < nums.length; i++) {
          path.push(nums[i])
          backtracking(i + 1, path)
          path.pop()
      }
  }

  backtracking(0, [])
  return result
};