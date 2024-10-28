/* 
https://leetcode.cn/problems/all-paths-from-source-to-target/description/
https://leetcode.cn/problems/all-paths-from-source-to-target/solutions/956408/suo-you-ke-neng-de-lu-jing-by-leetcode-s-iyoh

给你一个有 n 个节点的 有向无环图（DAG），请你找出所有从节点 0 到节点 n-1 的路径并输出（不要求按特定顺序）
graph[i] 是一个从节点 i 可以访问的所有节点的列表（即从节点 i 到节点 graph[i][j]存在一条有向边）。

示例 1：
输入：graph = [[1,2],[3],[3],[]]
输出：[[0,1,3],[0,2,3]]
解释：有两条路径 0 -> 1 -> 3 和 0 -> 2 -> 3

示例 2：
输入：graph = [[4,3,1],[3,2,4],[3],[4],[]]
输出：[[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]
 
提示：
n == graph.length
2 <= n <= 15
0 <= graph[i][j] < n
graph[i][j] != i（即不存在自环）
graph[i] 中的所有元素 互不相同
保证输入为 有向无环图（DAG）
*/

// 深度优先搜索
// 时间复杂度: O(n * 2^n) 空间复杂度: O(n)
function allPathsSourceTarget(graph: number[][]): number[][] {
  const end = graph.length - 1
  const paths: number[][] = []
  const stack: number[] = []

  // 因为是有向无环图，从开头走到终点就是一条路径
  // 因为是有向无环图，不存在重复无效的便利，所以不用标记访问过的节点
  const dfs = (x: number) => {
      if (x === end) {
          paths.push(stack.slice())
          return
      }
      // 递归当前点的每个指向
      for (const y of graph[x]) {
          stack.push(y)
          dfs(y)
          stack.pop()
      }
  }

  stack.push(0)
  dfs(0)

  return paths
};

// 广度优先搜索
// 时间复杂度: O(n * 2^n) 空间复杂度: O(n)
function allPathsSourceTarget(graph: number[][]): number[][] {
  const end = graph.length - 1
  const paths: number[][] = []
  const queue: number[][] = []

  // 初始化队列
  queue.push([0])

  // 广度优先搜索
  while(queue.length) {
      const currPath = queue.shift()!
      const x = currPath.at(-1)
      // currPath 已经走到终点了
      if (x === end) {
          paths.push(currPath)
      } else {
          // x 指向的点加入队列进行遍历
          for (const y of graph[x]) {
              queue.push([...currPath, y])
          }
      }
  }

  return paths
};