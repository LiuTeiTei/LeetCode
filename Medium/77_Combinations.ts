/* 
https://leetcode.cn/problems/combinations/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0077.%E7%BB%84%E5%90%88.md

给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
你可以按 任何顺序 返回答案。

示例 1：
输入：n = 4, k = 2
输出：
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]

示例 2：
输入：n = 1, k = 1
输出：[[1]]
 
提示：
1 <= n <= 20
1 <= k <= n
*/

// 回溯算法 - 剪枝优化：path.length + n - index + 1 >= k
// 时间复杂度: O(n * 2^n) 空间复杂度: O(n + k)
function combine(n: number, k: number): number[][] {
  const backtracking = (index: number, path: number[], result: number[][]) => {
      if (path.length >= k) {
          result.push(path.slice())
          return
      }
      for (let i = index; i <= n && path.length + n - index + 1 >= k; i++) {
          path.push(i)
          // 递归：控制树的纵向遍历，i + 1 防止出现重复的组合
          backtracking(i + 1, path, result)
          // 回溯，撤销处理的节点
          path.pop()
      }
  }

  const result: number[][] = []
  backtracking(1, [], result)
  return result
};