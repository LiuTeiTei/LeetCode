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
// 时间复杂度 O(n)，空间复杂度 O(n)
function isValid(s: string): boolean {
  const bracketsMap = new Map<string, string>([
      [')', '('],
      ['}', '{'],
      [']', '['],
  ])

  const stack: string[] = []
  for (let i = 0; i < s.length; i++) {
      if (!bracketsMap.has(s[i])) {
          // 左括号进栈
          stack.push(s[i])
      } else {
          // 右括号出栈
          if (bracketsMap.get(s[i]) !== stack.pop()) {
              return false
          }
      }
  }

  return !stack.length
};
