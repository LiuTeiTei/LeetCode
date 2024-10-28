/* 
https://leetcode.cn/problems/max-area-of-island/description/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/kamacoder/0100.%E5%B2%9B%E5%B1%BF%E7%9A%84%E6%9C%80%E5%A4%A7%E9%9D%A2%E7%A7%AF.md

给你一个大小为 m x n 的二进制矩阵 grid 。
岛屿 是由一些相邻的 1 (代表土地) 构成的组合，这里的「相邻」要求两个 1 必须在 水平或者竖直的四个方向上 相邻。
你可以假设 grid 的四个边缘都被 0（代表水）包围着。
岛屿的面积是岛上值为 1 的单元格的数目。
计算并返回 grid 中最大的岛屿面积。如果没有岛屿，则返回面积为 0 。

示例 1：
输入：grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
输出：6
解释：答案不应该是 11 ，因为岛屿只能包含水平或垂直这四个方向上的 1 。

示例 2：
输入：grid = [[0,0,0,0,0,0,0,0]]
输出：0

提示：
m == grid.length
n == grid[i].length
1 <= m, n <= 50
grid[i][j] 为 0 或 1
*/

// 深度优先搜索
// 时间复杂度: O(5mn) 空间复杂度: O(mn)
function maxAreaOfIsland(grid: number[][]): number {
  const m = grid.length
  const n = grid[0]?.length
  const dx = [0, 1, 0, -1]
  const dy = [-1, 0, 1, 0]
  const mapedGrid = new Array(m).fill(false).map(item => new Array(n).fill(false))

  let currArea = 0
  let maxArea = 0

  const dfs = (x: number, y: number) => {
      // 标记访问过
      mapedGrid[x][y] = true

      // 递归该格子的左上右下
      for (let i = 0; i < 4; i++) {
          const nextX = x + dx[i]
          const nextY = y + dy[i]

          // 越界了不继续递归
          if (nextX < 0 || nextX >= m || nextY < 0 || nextY >= n) continue

          // 满足条件才进入递归，避免无用的递归调用
          if (grid[nextX][nextY] === 1 && !mapedGrid[nextX][nextY]) {
              currArea += 1
              dfs(nextX, nextY)
          }
      }
  }

  for (let i = 0; i < m; i++) {
      for(let j = 0; j < n; j++) {
          if (grid[i][j] === 1 && !mapedGrid[i][j]) {
              // 重新计算面积
              currArea = 1

              // 深度优先搜索
              dfs(i, j)

              // 更新最大岛屿面积
              maxArea = Math.max(maxArea, currArea)
          }
      }
  }

  return maxArea
};
