/* 
https://leetcode.cn/problems/counting-bits/description/

给你一个整数 n ，对于 0 <= i <= n 中的每个 i ，计算其二进制表示中 1 的个数 ，
返回一个长度为 n + 1 的数组 ans 作为答案。

示例 1：
输入：n = 2
输出：[0,1,1]
解释：
0 --> 0
1 --> 1
2 --> 10

示例 2：
输入：n = 5
输出：[0,1,1,2,1,2]
解释：
0 --> 0
1 --> 1
2 --> 10
3 --> 11
4 --> 100
5 --> 101
 
提示：
0 <= n <= 105
 
进阶：
很容易就能实现时间复杂度为 O(n log n) 的解决方案，你可以在线性时间复杂度 O(n) 内用一趟扫描解决此问题吗？
你能不使用任何内置函数解决此问题吗？（如，C++ 中的 __builtin_popcount ）
*/

// 位运算
// 时间复杂度: O(nlogn) 空间复杂度: O(n)
function countBits(n: number): number[] {
  const countOne = (n: number) => {
      let num = n
      let count = 0
      while (num) {
          // 注意 + 运算符优先级高于 &
          count = count + (num & 1)
          num = num >> 1
      }
      return count
  }

  const res = new Array(n + 1)
  for (let i = 0; i <= n; i++) {
      res[i] = countOne(i)
  }

  return res
};

// 动态规划
// dp[i] 表示第 i 个数中二进制 1 的个数
// 奇数一定比前面那个偶数多一个 1，因为多的就是最低位的 1
// 偶数中 1 的个数一定和除以 2 之后的那个数一样多，因为最低位是 0，除以 2 就是右移一位。
// 时间复杂度: O(n) 空间复杂度: O(n)
function countBits(n: number): number[] {
  const dp: number[] = new Array(n).fill(0)
  dp[0] = 0

  for (let i = 1; i <= n; i++) {
      if (i % 2 === 1) {
          dp[i] = dp[i -1] + 1
      } else {
          dp[i] = dp[i / 2]
      }
  }

  return dp
};
