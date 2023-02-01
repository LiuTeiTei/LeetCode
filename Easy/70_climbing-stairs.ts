/* 
https://leetcode.com/problems/climbing-stairs/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0070.%E7%88%AC%E6%A5%BC%E6%A2%AF.md

假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
每次你可以爬 1 或 2 个台阶。
你有多少种不同的方法可以爬到楼顶呢？

示例 1：
输入：n = 2
输出：2
解释：有两种方法可以爬到楼顶。
1. 1 阶 + 1 阶
2. 2 阶

示例 2：
输入：n = 3
输出：3
解释：有三种方法可以爬到楼顶。
1. 1 阶 + 1 阶 + 1 阶
2. 1 阶 + 2 阶
3. 2 阶 + 1 阶
 

提示：
1 <= n <= 45
*/

// 第一层楼梯再跨两步就到第三层，第二层楼梯再跨一步就到第三层 =》转换成 斐波那契数列
{
  function climbStairs(n: number): number {
    let dp1 = 1
    let dp2 = 2
  
    for (let i = 3; i <= n; i++) {
      const dp3 = dp1 + dp2
      dp1 = dp2
      dp2 = dp3
    }
  
    return n < 3 ? n : dp2
  };
}

// 完全背包思想，一步一个台阶，两个台阶，三个台阶，直到 m 个台阶，有多少种不同的方法可以爬到楼顶
function climbStairs(n: number): number {
  const m = 2

  // dp[i]: 爬到有 i 个台阶的楼顶，有 dp[i] 种方法。
  const dp: number[] = new Array(n + 1).fill(0)

  // 初始化
  dp[0] = 1

  // 可以重复 -》完全背包，求的是排列数 -》先遍历背包后遍历物品
  for (let j = 1; j < n + 1; j++) {
    for (let i = 1; i <= m; i++) {
      if (j - i >= 0) {
        dp[j] = dp[j] + dp[j - i]
      }
    }
  }

  return dp[n]
};