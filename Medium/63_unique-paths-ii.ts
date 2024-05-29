/* 
https://leetcode.cn/problems/unique-paths-ii/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0063.%E4%B8%8D%E5%90%8C%E8%B7%AF%E5%BE%84II.md

一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。
机器人每次只能向下或者向右移动一步。
机器人试图达到网格的右下角（在下图中标记为 “Finish”）。
现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？
网格中的障碍物和空位置分别用 1 和 0 来表示。

示例 1：
输入：obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
输出：2
解释：3x3 网格的正中间有一个障碍物。
从左上角到右下角一共有 2 条不同的路径：
1. 向右 -> 向右 -> 向下 -> 向下
2. 向下 -> 向下 -> 向右 -> 向右

示例 2：
输入：obstacleGrid = [[0,1],[0,0]]
输出：1
 
提示：
m == obstacleGrid.length
n == obstacleGrid[i].length
1 <= m, n <= 100
obstacleGrid[i][j] 为 0 或 1
*/

// 动态规划
// 到达 [m, n] 的路径数等于 (左边没有障碍物 & [m - 1, n]) + (上面没有障碍物 & [m, n - 1])
// 时间复杂度：O(m * n), 空间复杂度：O(m * n)
function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
  const m = obstacleGrid.length
  const n = obstacleGrid[0].length

  if (obstacleGrid[m - 1][n - 1] == 1 || obstacleGrid[0][0] == 1) return 0

  const dp: number[][] = new Array(m).fill(0).map(_ => new Array(n).fill(0))

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 && j === 0) {
        dp[i][j] = 1
      } else if (i === 0) {
        dp[i][j] = obstacleGrid[i][j] ? 0 : dp[i][j - 1]
      } else if (j === 0) {
        dp[i][j] = obstacleGrid[i][j] ? 0 : dp[i - 1][j]
      } else {
        dp[i][j] = obstacleGrid[i][j] ? 0 : dp[i - 1][j] + dp[i][j - 1]
      }
    }
  }

  return dp[m - 1][n - 1]
};

// 动态规划
// 用 滚动数组 代替二阶矩阵
// 时间复杂度：O(m * n), 空间复杂度：O(m)
function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
  const m = obstacleGrid.length
  const n = obstacleGrid[0].length

  if (obstacleGrid[m - 1][n - 1] == 1 || obstacleGrid[0][0] == 1) return 0

  const dp: number[] = new Array(n).fill(0)

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 && j === 0) {
        dp[j] = 1
      } else if (i === 0) {
        dp[j] = obstacleGrid[i][j] ? 0 : dp[j - 1]
      } else if (j === 0) {
        dp[j] = obstacleGrid[i][j] ? 0 : dp[j]
      } else {
        dp[j] = obstacleGrid[i][j] ? 0 : dp[j] + dp[j - 1]
      }
    }
  }

  return dp[n - 1]
};
