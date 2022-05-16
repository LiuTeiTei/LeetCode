/* 
https://leetcode.com/problems/valid-parentheses/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0020.%E6%9C%89%E6%95%88%E7%9A%84%E6%8B%AC%E5%8F%B7.md

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
有效字符串需满足：
左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
 
示例 1：
输入：s = "()"
输出：true

示例 2：
输入：s = "()[]{}"
输出：true

示例 3：
输入：s = "(]"
输出：false

示例 4：
输入：s = "([)]"
输出：false

示例 5：
输入：s = "{[]}"
输出：true
 
提示：
1 <= s.length <= 104
s 仅由括号 '()[]{}' 组成
*/

// 维持一个 stack，左括号 push，右括号 pop，同时比较 pop 出的值是不是一对。
function isValid(s: string): boolean {
  if (s.length === 0) return true

  const bracketsMap: Record<string, string> = {
    '(': ')',
    '[': ']',
    '{': '}'
  }
  const stack: string[] = []

  for (let i = 0; i < s.length; i++) {
    const value = s[i]
    if (bracketsMap.hasOwnProperty(value)) {
      stack.push(value)
    } else {
      const right = stack.pop()
      if (!right || value !== bracketsMap[right]) {
        return false
      }
    }
  }

  return stack.length === 0
};

console.log(isValid('()[]{}'))
console.log(isValid('([)]'))