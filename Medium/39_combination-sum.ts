/* 
https://leetcode.com/problems/combination-sum/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0039.%E7%BB%84%E5%90%88%E6%80%BB%E5%92%8C.md

给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，
找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，
并以列表形式返回。你可以按 任意顺序 返回这些组合。

candidates 中的 同一个 数字可以 无限制重复被选取 。
如果至少一个数字的被选数量不同，则两种组合是不同的。 

对于给定的输入，保证和为 target 的不同组合数少于 150 个。

示例 1：
输入：candidates = [2,3,6,7], target = 7
输出：[[2,2,3],[7]]
解释：
2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。
7 也是一个候选， 7 = 7 。
仅有这两种组合。

示例 2：
输入: candidates = [2,3,5], target = 8
输出: [[2,2,2,2],[2,3,3],[3,5]]
示例 3：

输入: candidates = [2], target = 1
输出: []
 
提示：
1 <= candidates.length <= 30
1 <= candidates[i] <= 200
candidate 中的每个元素都 互不相同
1 <= target <= 500
*/

// 回溯算法
// 时间复杂度: O(n * 2^n) 空间复杂度: O(target)
function combinationSum(candidates: number[], target: number): number[][] {
  const backtracking = (index: number, sum: number, path: number[], result: number[][]) => {
      if (sum > target) {
          return
      }
      if (sum === target) {
          result.push(path.slice())
          return
      }
      for (let i = index; i < candidates.length; i++) {
          sum = sum + candidates[i]
          path.push(candidates[i])
          backtracking(i, sum, path, result,)
          sum = sum - candidates[i]
          path.pop()
      }
  }
  
  const result = []
  backtracking(0, 0, [], result)
  return result
};

// 回溯算法-剪枝优化
// candidates 从小到大排列时，当 sum + candidates[i] 大于 target 的时候不用进入循环
// 时间复杂度: O(n * 2^n) 空间复杂度: O(target)
function combinationSum(candidates: number[], target: number): number[][] {
  const backtracking = (index: number, sum: number, path: number[], result: number[][]) => {
      // 进入循环时提前判断了 sum > target 的场景
      if (sum === target) {
          result.push(path.slice())
          return
      }
      // sum > target 时不需要再遍历了
      for (let i = index; i < candidates.length && sum + candidates[i] <= target; i++) {
          sum = sum + candidates[i]
          path.push(candidates[i])
          backtracking(i, sum, path, result,)
          sum = sum - candidates[i]
          path.pop()
      }
  }
  
  // 优化的前提是 candidates 升序排列
  candidates.sort((a, b) => a - b)
  const result = []
  backtracking(0, 0, [], result)
  return result
};