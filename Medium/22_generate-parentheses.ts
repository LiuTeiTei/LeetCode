/* 
https://leetcode.cn/problems/generate-parentheses/description/
https://leetcode.cn/problems/generate-parentheses/solutions/9251/zui-jian-dan-yi-dong-de-dong-tai-gui-hua-bu-lun-da/
https://leetcode.cn/problems/generate-parentheses/solutions/597236/sui-ran-bu-shi-zui-xiu-de-dan-zhi-shao-n-0yt3

数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

示例 1：
输入：n = 3
输出：["((()))","(()())","(())()","()(())","()()()"]

示例 2：
输入：n = 1
输出：["()"]
 
提示：
1 <= n <= 8
*/

// 动态规划
// dp[n] 表示 n 对括号时能生成的有效括号组件
// 已知 dp[n - 1] 的所有值，如何求取 dp[n]？
// 假设第 n 个 ( 括号始终在第一个，则第 n 和 ) 可以按顺序从第二个开始一直插入到最后一个
// 考虑去重的情况，因此 dp[n] = (dp[0]) * dp[n-1] + (dp[1]) * dp[n-2] + ... + (dp[n-1]) * dp[0]
// 时间复杂度: O(n ^ 4) 空间复杂度: O(n * result.length)
function generateParenthesis(n: number): string[] {
  const dp: string[][] = []
  dp[0] = ['']
  dp[1] = ['()']

  for (let i = 2; i <= n; i++) {
      dp[i] = []
      for (let j = 0; j < i; j++) {
          const temp1 = dp[j]
          const temp2 = dp[i - j - 1]
          for (let x = 0; x < temp1.length; x++) {
              for (let y = 0; y < temp2.length; y++) {
                  if (j === 0) {
                      // 特殊处理 (dp[0]) * dp[n-1]   
                      dp[i].push(`()${temp2[y]}`)
                  } else if (j === i - 1) {
                      // 特殊处理 (dp[n-1]) * dp[0]
                      dp[i].push(`(${temp1[x]})`)
                  } else {
                      dp[i].push(`(${temp1[x]})${temp2[y]}`)
                  }
              }
          }
      }
  }

  return dp[n]
};

// 回溯算法
// () 的满二叉树，在遍历树时排除不合法的括号
function generateParenthesis(n: number): string[] {
  const result: string[] = []
  const dfs = (paths: string, left: number, right: number) => {
      // 括号不成对
      if (left > n || right > n) return

      // 括号在生成过程中不能大于左括号
      if (right > left) return

      // 因为括号都是成对出现的
      if (paths.length === n * 2) {
          result.push(paths)
          return
      }

      dfs(`${paths}(`, left + 1, right)
      dfs(`${paths})`, left, right + 1)
  }

  dfs('', 0, 0)
  return result
};
