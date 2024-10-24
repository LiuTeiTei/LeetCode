/* 
https://leetcode.cn/problems/number-of-islands/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/kamacoder/0099.%E5%B2%9B%E5%B1%BF%E7%9A%84%E6%95%B0%E9%87%8F%E6%B7%B1%E6%90%9C.md
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/kamacoder/0099.%E5%B2%9B%E5%B1%BF%E7%9A%84%E6%95%B0%E9%87%8F%E5%B9%BF%E6%90%9C.md

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

// 遇到一个没有遍历过的节点陆地，计数器就加一，然后把该节点陆地所能遍历到的陆地都标记上。
// 深度优先搜索
// 时间复杂度: O(4mn) 空间复杂度: O(mn)
function numIslands(grid: string[][]): number {
    const m = grid.length
    const n = grid[0].length
    const dx = [0, -1, 0, 1]
    const dy = [-1, 0, 1, 0]
    const mapedLands = new Array(m).fill(false).map(item => new Array(n).fill(false))

    let result = 0

    const dfs = (x: number, y:number) => {
        // 标记访问过
        mapedLands[x][y] = true

        // 递归该格子的左上右下
        for (let i = 0; i < 4; i++) {
            const nextX = x + dx[i]
            const nextY = y + dy[i]

            // 越界了不继续递归
            if (nextX < 0 || nextX >= m || nextY < 0 || nextY >= n) continue

            // 满足条件才进入递归，避免无用的递归调用
            if (!mapedLands[nextX][nextY] && grid[nextX][nextY] === '1') {
                dfs(nextX, nextY)
            }
        }
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1' && !mapedLands[i][j]) {
                // 遇到没访问过的陆地，+1
                result += 1

                // 深度优先搜索，将相邻陆地标记为已访问
                dfs(i, j)
            }
        }
    }

    return result
};

// 遇到一个没有遍历过的节点陆地，计数器就加一，然后把该节点陆地所能遍历到的陆地都标记上。
// 广度优先搜索
// 时间复杂度: O(4mn) 空间复杂度: O(mn)
function numIslands(grid: string[][]): number {
    const m = grid.length
    const n = grid[0].length
    const dx = [0, -1, 0, 1]
    const dy = [-1, 0, 1, 0]
    const mapedLands = new Array(m).fill(false).map(item => new Array(n).fill(false))

    let result = 0

    const bfs = (x: number, y:number) => {
        const queue: [number, number][] = []
        queue.push([x, y])
        // 只要加入队列就立刻标记访问过，如果从队列拿出来的时候再去标记走过，就会将一些节点重复加入队列造成超时
        mapedLands[x][y] = true

        while (queue.length) {
            const curr = queue.shift()!

            // push 格子的左上右下
            for (let i = 0; i < 4; i++) {
                const nextX = curr[0] + dx[i]
                const nextY = curr[1] + dy[i]

                // 越界了不继续递归
                if (nextX < 0 || nextX >= m || nextY < 0 || nextY >= n) continue

                // 满足条件才加入队列
                if (!mapedLands[nextX][nextY] && grid[nextX][nextY] === '1') {
                    queue.push([nextX, nextY])
                    // 只要加入队列就立刻标记访问过，如果从队列拿出来的时候再去标记走过，就会将一些节点重复加入队列造成超时
                    mapedLands[nextX][nextY] = true
                }
            }
        }
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1' && !mapedLands[i][j]) {
                // 遇到没访问过的陆地，+1
                result += 1

                // 广度优先搜索，将相邻陆地标记为已访问
                bfs(i, j)
            }
        }
    }

    return result
};
