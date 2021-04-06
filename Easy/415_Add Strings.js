/* 
https://leetcode-cn.com/problems/add-strings/

给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和。

Input: num1 = "11", num2 = "123"
Output: "134"

Input: num1 = "456", num2 = "77"
Output: "533"

Input: num1 = "0", num2 = "0"
Output: "0"

提示：
num1 和num2 的长度都小于 5100
num1 和num2 都只包含数字 0-9
num1 和num2 都不包含任何前导零
你不能使用任何內建 BigInteger 库， 也不能直接将输入的字符串转换为整数形式
*/


/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */

// 竖式加法
var addStrings = function(num1, num2) {
  let i = num1.length - 1, j = num2.length - 1, add = 0

  const res = []

  while (i >= 0 || j >= 0 || add != 0) {
    const x = i >= 0 ? num1.charAt(i) - 0 : 0
    const y = j >= 0 ? num2.charAt(j) - 0 : 0
    const sum = x + y + add
    res.unshift(sum % 10)
    add = Math.floor(sum / 10)
    i -= 1
    j -= 1
  }

  return res.join('')
}

console.log(addStrings('11111','0'))
