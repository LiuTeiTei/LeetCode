/* 
https://leetcode.com/problems/unique-paths/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0062.%E4%B8%8D%E5%90%8C%E8%B7%AF%E5%BE%84.md

一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。
机器人每次只能向下或者向右移动一步。
机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。
问总共有多少条不同的路径？

示例 1：
输入：m = 3, n = 7
输出：28

示例 2：
输入：m = 3, n = 2
输出：3
解释：
从左上角开始，总共有 3 条路径可以到达右下角。
1. 向右 -> 向下 -> 向下
2. 向下 -> 向下 -> 向右
3. 向下 -> 向右 -> 向下

示例 3：
输入：m = 7, n = 3
输出：28

示例 4：
输入：m = 3, n = 3
输出：6
 
提示：
1 <= m, n <= 100
题目数据保证答案小于等于 2 * 109
*/

// 动态规划
// 到达 [m, n] 的路径数等于 [m - 1, n] + [m, n - 1]
// 时间复杂度：O(m * n), 空间复杂度：O(m * n)
function uniquePaths(m: number, n: number): number {
  // !NOTE: 当一个对象被传递给 fill 方法的时候，填充数组的是这个对象的引用。
  const dp: number[][] = new Array(m).fill(0).map(_ => new Array(n).fill(0))
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 || j === 0) {
        dp[i][j] = 1
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
      }
    }
  }

  return dp[m - 1][n - 1]
};

// 动态规划
// 用 滚动数组 代替二阶矩阵
// 时间复杂度：O(m * n), 空间复杂度：O(m)
function uniquePaths(m: number, n: number): number {
  const dp: number[] = new Array(n).fill(0)
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 || j === 0) {
        dp[j] = 1
      } else {
        dp[j] = dp[j - 1] + dp[j]
      }
    }
  }

  return dp[n - 1]
};
