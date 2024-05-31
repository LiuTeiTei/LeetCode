/* 
https://leetcode.cn/problems/edit-distance/description/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0072.%E7%BC%96%E8%BE%91%E8%B7%9D%E7%A6%BB.md

给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数  。
你可以对一个单词进行如下三种操作：
插入一个字符
删除一个字符
替换一个字符
 
示例 1：
输入：word1 = "horse", word2 = "ros"
输出：3
解释：
horse -> rorse (将 'h' 替换为 'r')
rorse -> rose (删除 'r')
rose -> ros (删除 'e')

示例 2：
输入：word1 = "intention", word2 = "execution"
输出：5
解释：
intention -> inention (删除 't')
inention -> enention (将 'i' 替换为 'e')
enention -> exention (将 'n' 替换为 'x')
exention -> exection (将 'n' 替换为 'c')
exection -> execution (插入 'u')

提示：
0 <= word1.length, word2.length <= 500
word1 和 word2 由小写英文字母组成
*/

// 动态规划
// dp[i][j]: 以下标 i 为结尾的 A，和以下标 j 为结尾的 B，最近编辑距离为dp[i][j]
// 当 A[i] 和 B[j] 相等的时候，dp[i][j] = dp[i - 1][j - 1] + 1
// 当 A[i] 和 B[j] 不相等的时候，要么换 dp[i][j] = dp[i - 1][j - 1] + 1，要么删 dp[i][j] = dp[i][j - 1] + 1，要么增 dp[i][j] = dp[i - 1][j] + 1
// 时间复杂度: O(m * n) 空间复杂度: O(m * n)
function minDistance(word1: string, word2: string): number {
  const m = word1.length
  const n = word2.length

  if (m === 0 || n === 0) return Math.max(m, n)

  const dp: number[][] = new Array(m).fill(0).map(_ => new Array(n).fill(0))

  // 第一行和第一列初始化的时候，只有第一个出现的重复字符不用操作，之后出现的重复字符都需要删掉
  let firstEqN = false
  let firstEqM = false

  for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
          if (i === 0 && j === 0) {
            if (word1[i] === word2[j]) {
                firstEqN = true
                firstEqM = true
                dp[i][j] = 0
            } else {
                dp[i][j] = 1
            }
          } else if (i === 0) {
            if (word1[i] === word2[j] && !firstEqM) {
                dp[i][j] = dp[i][j - 1]
                firstEqM = true
            } else {
                dp[i][j] = dp[i][j - 1] + 1
            }
          } else if (j === 0) {
            if (word1[i] === word2[j] && !firstEqN) {
                dp[i][j] = dp[i - 1][j]
                firstEqN = true
            } else {
                dp[i][j] = dp[i - 1][j] + 1
            }
          } else {
              dp[i][j] = word1[i] === word2[j] ? dp[i - 1][j - 1] : Math.min(
                  dp[i - 1][j - 1],
                  dp[i][j - 1],
                  dp[i - 1][j],
              ) + 1
          }
      }
  }

  return dp[m - 1][n - 1]
};

// 动态规划
// 虚拟第一行和第一列，不用额外处理初始化的情况
// dp[i][j] 表示以下标 i-1 为结尾的字符串 word1，和以下标 j-1 为结尾的字符串 word2，最近编辑距离为 dp[i][j]。
function minDistance(word1: string, word2: string): number {
    /**
        dp[i][j]: word1前i个字符，word2前j个字符，最少操作数
        dp[0][0]=0：表示word1前0个字符为'', word2前0个字符为''
     */
    const length1: number = word1.length,
        length2: number = word2.length;
    const dp: number[][] = new Array(length1 + 1).fill(0)
        .map(_ => new Array(length2 + 1).fill(0));
    for (let i = 0; i <= length1; i++) {
        dp[i][0] = i;
    }
    for (let i = 0; i <= length2; i++) {
        dp[0][i] = i;
    }
    for (let i = 1; i <= length1; i++) {
        for (let j = 1; j <= length2; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.min(
                    dp[i - 1][j],
                    dp[i][j - 1],
                    dp[i - 1][j - 1]
                ) + 1;
            }
        }
    }
    return dp[length1][length2];
};
