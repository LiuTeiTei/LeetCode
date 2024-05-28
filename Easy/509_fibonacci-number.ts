/* 
https://leetcode.com/problems/fibonacci-number/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0509.%E6%96%90%E6%B3%A2%E9%82%A3%E5%A5%91%E6%95%B0.md

斐波那契数 （通常用 F(n) 表示）形成的序列称为 斐波那契数列 。
该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。
也就是：
F(0) = 0，F(1) = 1
F(n) = F(n - 1) + F(n - 2)，其中 n > 1
给定 n ，请计算 F(n) 。

示例 1：
输入：n = 2
输出：1
解释：F(2) = F(1) + F(0) = 1 + 0 = 1

示例 2：
输入：n = 3
输出：2
解释：F(3) = F(2) + F(1) = 1 + 1 = 2

示例 3：

输入：n = 4
输出：3
解释：F(4) = F(3) + F(2) = 2 + 1 = 3
 
提示：
0 <= n <= 30
*/

// 动态规划
// dp[i]的定义为: 第i个数的斐波那契数值是dp[i]
// 状态转移方程为: dp[i] = dp[i - 1] + dp[i - 2]
// 时间复杂度：O(n), 空间复杂度：O(n)
function fib(n: number): number {
  const dp: number[] = [0, 1]

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }

  return dp[n]
}

// 动态规划
// 时间复杂度：O(n), 空间复杂度：O(1)
function fib(n: number): number {
  let dp0 = 0
  let dp1 = 1

  for (let i = 2; i <= n; i++) {
    const sum = dp0 + dp1
    dp0 = dp1
    dp1 = sum
  }

  return n === 0 ? n : dp1
}

// 递归解法
// 时间复杂度：O(2^n), 空间复杂度：O(n)
function fib(n: number): number {
  if (n < 2) {
    return n
  }
  return fib(n - 1) + fib(n - 2)
}