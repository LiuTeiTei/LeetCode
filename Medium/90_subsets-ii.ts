/* 
https://leetcode.com/problems/subsets-ii/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0090.%E5%AD%90%E9%9B%86II.md

给你一个整数数组 nums ，其中可能包含重复元素，请你返回该数组所有可能的子集（幂集）。
解集 不能 包含重复的子集。返回的解集中，子集可以按 任意顺序 排列。

示例 1：
输入：nums = [1,2,2]
输出：[[],[1],[1,2],[1,2,2],[2],[2,2]]

示例 2：
输入：nums = [0]
输出：[[],[0]]
 
提示：
1 <= nums.length <= 10
-10 <= nums[i] <= 10
*/

function subsetsWithDup(nums: number[]): number[][] {
  const result: number[][] = []
  const path: number[] = []

  const backtracking = (index: number) => {
    result.push(path.slice())

    for (let i = index; i < nums.length; i++) {
      // 对同一数层去重（横向遍历）
      if (i > index && nums[i - 1] === nums[i]) {
        continue
      }
      path.push(nums[i])
      backtracking(i + 1)
      path.pop()
    }
  }

  nums.sort((a, b) => a - b)
  backtracking(0)
  return result
};