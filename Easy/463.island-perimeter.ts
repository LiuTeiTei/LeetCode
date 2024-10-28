/* 
https://leetcode.cn/problems/island-perimeter/description/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/kamacoder/0106.%E5%B2%9B%E5%B1%BF%E7%9A%84%E5%91%A8%E9%95%BF.md

给定一个 row x col 的二维网格地图 grid ，其中：grid[i][j] = 1 表示陆地， grid[i][j] = 0 表示水域。
网格中的格子 水平和垂直 方向相连（对角线方向不相连）。
整个网格被水完全包围，但其中恰好有一个岛屿（或者说，一个或多个表示陆地的格子相连组成的岛屿）。
岛屿中没有“湖”（“湖” 指水域在岛屿内部且不和岛屿周围的水相连）。
格子是边长为 1 的正方形。网格为长方形，且宽度和高度均不超过 100 。计算这个岛屿的周长。

示例 1：
输入：grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]
输出：16
解释：它的周长是上面图片中的 16 个黄色的边

示例 2：
输入：grid = [[1]]
输出：4

示例 3：
输入：grid = [[1,0]]
输出：4
 
提示：
row == grid.length
col == grid[i].length
1 <= row, col <= 100
grid[i][j] 为 0 或 1
*/

// 迭代
// 时间复杂度: O(5mn) 空间复杂度: O(1)
function islandPerimeter(grid: number[][]): number {
  const row = grid.length
  const col = grid[0].length
  let result = 0

  // 遍历每一个空格，遇到岛屿则计算其左上右下的空格情况。
  for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
          if (grid[i][j]) {
              // 如果该陆地左上右下的空格是有水域，则说明是一条边
              if (j === 0 || !grid[i][j - 1]) result += 1
              if (i === 0 || !grid[i - 1][j]) result += 1
              if (j === col - 1 || !grid[i][j + 1]) result += 1
              if (i === row - 1 || !grid[i + 1][j]) result += 1
          }
      }
  }

  return result
};

// 深度优先搜索
// 时间复杂度: O(5mn) 空间复杂度: O(mn)
function islandPerimeter(grid: number[][]): number {
  const row = grid.length
  const col = grid[0].length
  const dx = [0, -1, 0, 1]
  const dy = [-1, 0, 1, 0]

  const dfs = (x: number, y: number) => {
      // 如果该格子在边框外，或者是水域，则说明是一条边
      if (x < 0 || x >= row || y < 0 || y >= col || grid[x][y] === 0) {
          return 1
      }
      if (grid[x][y] === 2) {
          return 0
      }
      // 标记该格子遍历过
      grid[x][y] = 2

      // 计算该格子的周长，递归该格子的左上右下
      let res = 0
      for (let i = 0; i < 4; i++) {
          res += dfs(x + dx[i], y + dy[i])
      }
      return res
  }

  let result = 0
  // 遍历每一个空格，计算该格子的边长。
  for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
          if (grid[i][j]) {
              result += dfs(i, j)
          }
      }
  }
  return result
};
