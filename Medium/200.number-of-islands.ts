/* 
https://leetcode.cn/problems/number-of-islands/

给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。
此外，你可以假设该网格的四条边均被水包围。

示例 1：
输入：grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
输出：1

示例 2：
输入：grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
输出：3
 
提示：
m == grid.length
n == grid[i].length
1 <= m, n <= 300
grid[i][j] 的值为 '0' 或 '1'
*/

// 暴力 + 递归
// 时间复杂度: O((m * n) ^ 2) 空间复杂度: O(m * n)
function numIslands(grid: string[][]): number {
  const m = grid.length
  const n = grid[0].length
  const mapedLands = new Array(m).fill(false).map(item => new Array(n).fill(false))

  let result = 0

  const getLands = (i: number, j:number) => {
      if (grid[i]?.[j] === '1' && !mapedLands[i][j]) {
          mapedLands[i][j] = true

          if (grid[i - 1]?.[j] === '1') {
              getLands(i - 1, j)
          }
          if (grid[i]?.[j + 1] === '1') {
              getLands(i, j + 1)
          }
          if (grid[i + 1]?.[j] === '1') {
              getLands(i + 1, j)
          }
          if (grid[i]?.[j - 1] === '1') {
              getLands(i, j - 1)
          }
      }
  }

  for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
          if (grid[i][j] === '1' && !mapedLands[i][j]) {
              getLands(i, j)
              result += 1
          }
      }
  }

  return result
};