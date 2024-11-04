/* 
https://leetcode.cn/problems/making-a-large-island/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/kamacoder/0104.%E5%BB%BA%E9%80%A0%E6%9C%80%E5%A4%A7%E5%B2%9B%E5%B1%BF.md

给你一个大小为 n x n 二进制矩阵 grid 。最多 只能将一格 0 变成 1 。
返回执行此操作后，grid 中最大的岛屿面积是多少？
岛屿 由一组上、下、左、右四个方向相连的 1 形成。

示例 1:
输入: grid = [[1, 0], [0, 1]]
输出: 3
解释: 将一格0变成1，最终连通两个小岛得到面积为 3 的岛屿。

示例 2:
输入: grid = [[1, 1], [1, 0]]
输出: 4
解释: 将一格0变成1，岛屿的面积扩大为 4。

示例 3:
输入: grid = [[1, 1], [1, 1]]
输出: 4
解释: 没有0可以让我们变成1，面积依然为 4。

提示：
n == grid.length
n == grid[i].length
1 <= n <= 500
grid[i][j] 为 0 或 1
*/

// 深度优先搜索
// 第一步：遍历地图 1，得出各个岛屿的面积，并做编号记录。
// 第二步：遍历地图 0，并统计该由 0 变成的 1 加上周边岛屿面积，将其相邻面积相加在一起，选一个最大面积。
// 时间复杂度: O(10mn) 空间复杂度: O(2mn)
function largestIsland(grid: number[][]): number {
  const m = grid.length
  const n = grid[0].length
  const dx = [0, -1, 0, 1]
  const dy = [-1, 0, 1, 0]
  const mapedGrid = new Array(m).fill(false).map(item => new Array(n).fill(false))
  const areaMap = new Map<number, number>()

  let maxArea = 0
  let landKey = 0
  let currArea = 0

  // 得出某个岛屿的面积，并给该岛屿编号 landKey
  const dfs = (x: number, y: number) => {
      // 给岛屿标记新编号
      mapedGrid[x][y] = landKey

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

  // 记录每个岛屿的面积
  for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
          if (grid[i][j] === 1 && !mapedGrid[i][j]) {
              // 重新计算面积
              currArea = 1
              landKey += 2

              // 深度优先搜索
              dfs(i, j)

              // 记录岛屿面积
              maxArea = Math.max(maxArea, currArea)
              areaMap.set(landKey, currArea)
          }
      }
  }

  // 如果全是岛屿, 直接返回面积
  if (maxArea === m * n) return maxArea

  // 计算 0 变成 1 后的面积
  for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
          if (grid[i][j] === 0) {
              // 记录当前 0 周围岛屿的编号
              const aroundLandKey = new Set<number>()
              for (let k = 0; k < 4; k++) {
                  const nextI = i + dx[k]
                  const nextJ = j + dy[k]

                  // 越界了不继续递归
                  if (nextI < 0 || nextI >= m || nextJ < 0 || nextJ >= n) continue

                  // 满足条件记录
                  if (mapedGrid[nextI][nextJ]) {
                      aroundLandKey.add(mapedGrid[nextI][nextJ])
                  }
              }
              
              // 计算 0 周围岛屿的面积
              let aroundArea = 0
              for (const landKey of aroundLandKey) {
                  aroundArea += areaMap.get(landKey)!
              }

              // 0 变成 1 后岛屿的面积 = 周围岛屿的面积 + 1
              maxArea = Math.max(maxArea, aroundArea + 1)
          }
      }
  }

  return maxArea
};

largestIsland([[1,1,0,0,0], [1,1,0,0,0], [0,0,1,0,0], [0,0,0,1,1]]) // 6
largestIsland([
    [0,1,0,0,0,0,0,0], 
    [1,1,1,0,0,0,1,1],
    [0,1,1,1,0,1,1,1],
    [0,0,0,0,1,0,0,0],
    [0,0,0,0,1,0,0,0],
    [0,0,1,0,0,0,0,0],
    [0,1,1,0,0,1,1,0],
]) // 15
