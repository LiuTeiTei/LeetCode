/* 
https://leetcode.com/problems/longest-valid-parentheses/

给你一个只包含 '(' 和 ')' 的字符串，找出最长有效（格式正确且连续）括号子串的长度。

示例 1：
输入：s = "(()"
输出：2
解释：最长有效括号子串是 "()"

示例 2：
输入：s = ")()())"
输出：4
解释：最长有效括号子串是 "()()"

示例 3：
输入：s = ""
输出：0
 
提示：
0 <= s.length <= 3 * 104
s[i] 为 '(' 或 ')'
*/

// "()(())" ===> 6  这种也算连续的，下面的函数只考虑了相邻的
{
  function longestValidParentheses(s: string): number {
    let result = 0
    let sum = 0
    let isRight = true
  
    for (let i = 0; i < s.length; i++) {
      if (s[i] === '(') {
        if (isRight) {
          sum++
        } else {
          result = Math.max(sum, result)
          sum = 1
        }
        isRight = false
      } else {
        if (!isRight) {
          sum++
        } else {
          result = Math.max(sum, result)
          sum = 0
        }
        isRight = true
      }
    }
  
    result = Math.max(sum, result)
    return result === 1 ? 0 : result
  };
}

// 将所有无法匹配的括号的位置全部置 1，转变成寻找最长的连续的 0 的长度
function longestValidParentheses(s: string): number {
  let validArray = new Array(s.length).fill(1)
  let rightStack: number[] = []

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      rightStack.push(i)
    } else {
      if (rightStack.length > 0) {
        const index = rightStack.pop()!
        validArray[index] = 0
        validArray[i] = 0
      }
    }
  }

  let result = 0
  let sum = 0

  // 遍历得到最大长度
  for (let j = 0; j < validArray.length; j++) {
    if (validArray[j] === 0) {
      sum++
    } else {
      result = Math.max(sum, result)
      sum = 0
    }
  }
  return Math.max(sum, result)
};