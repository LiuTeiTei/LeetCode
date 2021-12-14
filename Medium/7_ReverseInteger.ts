/* 
https://leetcode.com/problems/reverse-integer/

给你一个 32 位的有符号整数 x ，返回将 x 中的数字部分反转后的结果。
如果反转后整数超过 32 位的有符号整数的范围 [−231,  231 − 1] ，就返回 0。
假设环境不允许存储 64 位整数（有符号或无符号）。

示例 1：
输入：x = 123
输出：321

示例 2：
输入：x = -123
输出：-321

示例 3：
输入：x = 120
输出：21

示例 4：
输入：x = 0
输出：0
 
提示：
-2^31 <= x <= 2^31 - 1
*/

// 转成 string =》 转成数组 =》 反转 =》 转成 string =》 转成数字
// O(3n)   Runtime: 127 ms(20.95%)   Memory: 40.2 MB(94.60%)
{
  function reverse(x: number): number {
    const symbol = x < 0 ? -1 : 1
  
    const result = parseInt(Math.abs(x).toString().split('').reverse().join('')) * symbol
  
    const max = Math.pow(2, 31) - 1
    const min = Math.pow(2, 31) * -1
    if (result >= min && result <= max) {
      return result 
    } else {
      return 0
    }
  };
}

// 数字取商和模，迭代函数 =》 模 * 10 + 商
// O(n)   Runtime: 88 ms(90.34%)   Memory: 39.8 MB(99.51%)
{
  function reverse(x: number): number {
    const max = Math.pow(2, 31) - 1
    const min = Math.pow(2, 31) * -1
  
    let result = 0
  
    const singleReverse = (num: number) => {
      const qut = num > 0 ? Math.floor(num / 10) : Math.ceil(num / 10)
      const mod = num % 10
      result = result * 10 + mod

      if (qut !== 0) singleReverse(qut)

      if (result < min || result > max) {
        return 0
      } else {
      }
  
    }
  
    singleReverse(x)
  
    if (result >= min && result <= max) {
      return result
    } else {
      return 0
    }
  };
}

console.log(reverse(-12300))