/* 
https://leetcode.com/problems/ones-and-zeroes/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0474.%E4%B8%80%E5%92%8C%E9%9B%B6.md

给你一个二进制字符串数组 strs 和两个整数 m 和 n 。
请你找出并返回 strs 的最大子集的长度，
该子集中 最多 有 m 个 0 和 n 个 1 。
如果 x 的所有元素也是 y 的元素，集合 x 是集合 y 的 子集 。

示例 1：

输入：strs = ["10", "0001", "111001", "1", "0"], m = 5, n = 3
输出：4
解释：最多有 5 个 0 和 3 个 1 的最大子集是 {"10","0001","1","0"} ，
因此答案是 4 。
其他满足题意但较小的子集包括 {"0001","1"} 和 {"10","1","0"} 。
{"111001"} 不满足题意，因为它含 4 个 1 ，大于 n 的值 3 。

示例 2：
输入：strs = ["10", "0", "1"], m = 1, n = 1
输出：2
解释：最大的子集是 {"0", "1"} ，所以答案是 2 。
 

提示：
1 <= strs.length <= 600
1 <= strs[i].length <= 100
strs[i] 仅由 '0' 和 '1' 组成
1 <= m, n <= 100
*/

function findMaxForm(strs: string[], m: number, n: number): number {
  // dp[i][j]：最多有 i 个 0 和 j 个 1 的 strs 的最大子集的大小为 dp[i][j]
  // 初始化 dp 数组
  const dp: number[][] = Array(m + 1).fill(0).map(_ => Array(n + 1).fill(0))

  strs.forEach((str) => {
    const zeroNum = str.split('').filter((item) => item === '0').length
    const oneNum = str.length - zeroNum

    // 倒序遍历 dp 数组
    for (let i = m; i >= zeroNum; i--) {
      for (let j = n; j >= oneNum; j--) {
        dp[i][j] = Math.max(dp[i][j], dp[i - zeroNum][j - oneNum] + 1)
      }
    }

  })

  return dp[m][n]
};

const test = findMaxForm(["10","0001","111001","1","0"], 3, 3)
console.log('%c [ test ]-54', 'font-size:13px; background:pink; color:#bf2c9f;', test)