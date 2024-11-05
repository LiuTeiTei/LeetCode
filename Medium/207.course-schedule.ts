/* 
https://leetcode.cn/problems/course-schedule/description/
https://leetcode.cn/problems/course-schedule/solutions/250377/bao-mu-shi-ti-jie-shou-ba-shou-da-tong-tuo-bu-pai-

你这个学期必须选修 numCourses 门课程，记为 0 到 numCourses - 1 。在选修某些课程之前需要一些先修课程。 
先修课程按数组 prerequisites 给出，其中 prerequisites[i] = [ai, bi] ，
表示如果要学习课程 ai 则 必须 先学习课程  bi 。
例如，先修课程对 [0, 1] 表示：想要学习课程 0 ，你需要先完成课程 1 。
请你判断是否可能完成所有课程的学习？如果可以，返回 true ；否则，返回 false 。

示例 1：
输入：numCourses = 2, prerequisites = [[1,0]]
输出：true
解释：总共有 2 门课程。学习课程 1 之前，你需要完成课程 0 。这是可能的。

示例 2：
输入：numCourses = 2, prerequisites = [[1,0],[0,1]]
输出：false
解释：总共有 2 门课程。学习课程 1 之前，你需要先完成​课程 0 ；并且学习课程 0 之前，你还应先完成课程 1 。这是不可能的。
 
提示：
1 <= numCourses <= 2000
0 <= prerequisites.length <= 5000
prerequisites[i].length == 2
0 <= ai, bi < numCourses
prerequisites[i] 中的所有课程对 互不相同
*/

// 广度优先搜索 - 拓扑排序
// 时间复杂度: O(n + 2m) 空间复杂度: O(2n + m)
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  // 一个数组记录每个节点的入度数（这门课依赖几个其他课）
  const inDegreeArr = new Array(numCourses).fill(0)
  // 一个 map 记录节点入度指向（依赖这门课的其他课）
  const inDegreeMap = new Map<number, number[]>()

  // 初始化
  for (let i = 0; i < prerequisites.length; i++) {
      const start = prerequisites[i][1]
      const end = prerequisites[i][0]

      inDegreeArr[end] += 1
      const currInDegreeArr = inDegreeMap.get(start)
      if (currInDegreeArr) {
          inDegreeMap.set(start, [...currInDegreeArr, end])
      } else {
          inDegreeMap.set(start, [end])
      }
  }

  // 入度为 0 的入列
  const queue: number[] = []
  inDegreeArr.forEach((item, index) => {
      if (item === 0) queue.push(index)
  })

  // 广度优先搜索
  let count = 0
  while (queue.length) {
      // 记录出队的数量（入度为 0 的课程）
      count += 1
      // 当前选的课，出列
      const curr = queue.shift()!
      inDegreeMap.get(curr)?.forEach((item) => {
          // 入度-1
          inDegreeArr[item] -= 1
          // 入度为 0 时入列
          if (inDegreeArr[item] === 0) queue.push(item)
      })
  }

  return count === numCourses
};
