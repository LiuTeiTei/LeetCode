/* 
https://leetcode.cn/problems/minimum-path-sum/description/

给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
说明：每次只能向下或者向右移动一步。

示例 1：
输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
输出：7
解释：因为路径 1→3→1→1→1 的总和最小。

示例 2：
输入：grid = [[1,2,3],[4,5,6]]
输出：12
 
提示：
m == grid.length
n == grid[i].length
1 <= m, n <= 200
0 <= grid[i][j] <= 200
*/

// 动态规划
// 到达 [m, n] 的最小等于 min([m - 1, n], [m, n - 1]) + grid[m, n]
// 时间复杂度：O(m * n), 空间复杂度：O(m * n)
function minPathSum(grid: number[][]): number {
  const m = grid.length
  const n = grid[0].length
  const dp: number[][] = new Array(m).fill(0).map(_ => new Array(n).fill(0))

  for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
          if (i === 0 && j === 0) {
              dp[i][j] = grid[i][j]
          } else if (i === 0) {
              dp[i][j] = dp[i][j - 1] + grid[i][j]
          } else if (j === 0) {
              dp[i][j] = dp[i - 1][j] + grid[i][j]
          } else {
              dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
          }
      }
  }

  return dp[m - 1][n - 1]
};

// 动态规划
// 用 滚动数组 代替二阶矩阵
// 时间复杂度：O(m * n), 空间复杂度：O(m)
function minPathSum(grid: number[][]): number {
  const m = grid.length
  const n = grid[0].length
  const dp: number[] = new Array(n).fill(0)

  for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
          if (i === 0 && j === 0) {
              dp[j] = grid[i][j]
          } else if (i === 0) {
              dp[j] = dp[j - 1] + grid[i][j]
          } else if (j === 0) {
              dp[j] = dp[j] + grid[i][j]
          } else {
              dp[j] = Math.min(dp[j], dp[j - 1]) + grid[i][j]
          }
      }
  }

  return dp[n - 1]
};
