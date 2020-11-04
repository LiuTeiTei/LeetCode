/* 
https://leetcode-cn.com/problems/valid-parentheses/

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
有效字符串需满足：
左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
注意空字符串可被认为是有效字符串。

示例 1:
输入: "()"
输出: true

示例 2:
输入: "()[]{}"
输出: true

示例 3:
输入: "(]"
输出: false

示例 4:
输入: "([)]"
输出: false

示例 5:
输入: "{[]}"
输出: true
*/


/**
 * @param {string} s
 * @return {boolean}
 */

const parenthesesObj = {
    '(': ')',
    '[': ']',
    '{': '}'
}

// 可以使用哈希映射（HashMap）存储每一种括号
// 相应的方法就是 pairs.has(key)   pairs.get(key)
const pairs = new Map([
    ['(', ')'],
    ['[', ']'],
    ['{', '}']
]);

// 利用栈的出入顺序
// 当遍历到右括号时，栈顶必须是对应的左括号，最后栈是空的就返回 true
var isValid = function(s) {
    if (s === '') return true
    if (s.length % 2 === 1) return false

    const arr = s.split('')
    const stack = []
    for(let i = 0; i < arr.length; i++) {
        if (parenthesesObj.hasOwnProperty(arr[i])) {
            stack.push(arr[i])
        } else {
            if (stack.length > 0 && arr[i] === parenthesesObj[stack[stack.length - 1]]) {
                stack.pop()
            } else {
                return false
            }
        }
    }
    return !stack.length
}

console.log(isValid('(](((((((((((((('))