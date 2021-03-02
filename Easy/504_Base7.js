/* 
https://leetcode.com/problems/base-7/

给定一个整数，将其转化为7进制，并以字符串形式输出。

示例 1:
输入: 100
输出: "202"

示例 2:
输入: -7
输出: "-10"

注意: 输入范围是 [-1e7, 1e7]
*/

/**
 * @param {number} num
 * @return {string}
*/

/* 内置对象 API */
{
  let convertToBase7 = function(num) {
    return num.toString(7)
  }
}

/* 除 7 取余法：
即每次将整数部分除以 7，余数为该位权上的数，而商继续除以 7，余数又为上一个位权上的数，
这个步骤一直持续下去，直到商为 0 为止，
最后读数时候，从最后一个余数起，一直到最前面的一个余数。
*/
{
  let convertToBase7 = function(num) {
    let resultArr = []

    let division = function(number) {
      const remainder = number % 7
      const quotient = parseInt(number / 7)
      resultArr.unshift(remainder)

      if (quotient !== 0) {
        division(quotient)
      }
    }
    division(Math.abs(num))

    return num < 0 ? '-' + resultArr.join('') : resultArr.join('')
  }
}

/* 超强递归 */
{
  var convertToBase7 = function(num) {
    if (num < 0) return '-' + convertToBase7(-1 * num)
    if (num < 7) return String(num)
    return convertToBase7(parseInt(num / 7)) + num % 7
  }
}

console.log(convertToBase7(-8))