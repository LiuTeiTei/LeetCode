/* 
https://leetcode.com/problems/combination-sum-ii/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0040.%E7%BB%84%E5%90%88%E6%80%BB%E5%92%8CII.md

给定一个候选人编号的集合 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
candidates 中的每个数字在每个组合中只能使用 一次 。
注意：解集不能包含重复的组合。 

示例 1:
输入: candidates = [10,1,2,7,6,1,5], target = 8,
输出:
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]

示例 2:
输入: candidates = [2,5,2,1,2], target = 5,
输出:
[
[1,2,2],
[5]
]
 
提示:
1 <= candidates.length <= 100
1 <= candidates[i] <= 50
1 <= target <= 30
*/

// 回溯算法
// 时间复杂度: O(n * 2^n) 空间复杂度: O(n)
function combinationSum2(candidates: number[], target: number): number[][] {
  const backtracking = (index: number, sum: number, path: number[], result: number[][]) => {
      if (sum > target) return
      if (sum === target) {
          result.push(path.slice())
          return
      }
      // 剪枝优化：sum + candidates[i] <= target
      for (let i = index; i < candidates.length && sum + candidates[i] <= target; i++) {
          // 对同一树层使用过的元素进行跳过
          if (i > index && candidates[i] == candidates[i - 1]) {
              continue;
          }
          sum = sum + candidates[i]
          path.push(candidates[i])
          backtracking(i + 1, sum, path, result)
          sum = sum - candidates[i]
          path.pop()
      }
  }

  // 需要先对 candidates 进行排序处理
  candidates.sort((a, b) => a - b)

  const result: number[][] = []
  backtracking(0, 0, [], result)
  return result
};
