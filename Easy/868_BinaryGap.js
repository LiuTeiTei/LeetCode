/* 
https://leetcode-cn.com/problems/binary-gap/?utm_source=LCUS&utm_medium=ip_redirect&utm_campaign=transfer2china

给定一个正整数 n，找到并返回 n 的二进制表示中两个 相邻 1 之间的 最长距离 。
如果不存在两个相邻的 1，返回 0 。
如果只有 0 将两个 1 分隔开（可能不存在 0 ），则认为这两个 1 彼此 相邻 。
两个 1 之间的距离是它们的二进制表示中位置的绝对差。例如，"1001" 中的两个 1 的距离为 3 。

示例 1：
输入：n = 22
输出：2
解释：
22 的二进制是 "10110" 。
在 22 的二进制表示中，有三个 1，组成两对相邻的 1 。
第一对相邻的 1 中，两个 1 之间的距离为 2 。
第二对相邻的 1 中，两个 1 之间的距离为 1 。
答案取两个距离之中最大的，也就是 2 。

示例 2：
输入：n = 5
输出：2
解释：
5 的二进制是 "101" 。

示例 3：
输入：n = 6
输出：1
解释：
6 的二进制是 "110" 。

示例 4：
输入：n = 8
输出：0
解释：
8 的二进制是 "1000" 。
在 8 的二进制表示中没有相邻的两个 1，所以返回 0 。

示例 5：
输入：n = 1
输出：0
*/

/**
 * @param {number} n
 * @return {number}
*/

// 先转成二进制的数组形式，再将 1 的索引值抽成数组，遍历寻找「后一位」-「前一位」最大的差值。
// 时间复杂度：o(2n)  空间复杂度：O(n)
{
  let binaryGap = function(n) {
    const binaryNum = n.toString(2)
    const binaryArr = String(binaryNum).split('')

    if (binaryArr.indexOf('1') < 0 || binaryArr.indexOf('1') === binaryArr.lastIndexOf('1')) {
      return 0
    }

    let indexOfOneArr = []
    binaryArr.forEach((item, index) => {
      if (item === '1') {
        indexOfOneArr.push(index)
      }
    })

    let maxGap = 0
    for (let i = 1; i < indexOfOneArr.length; i++) {
      const tempGap = indexOfOneArr[i] - indexOfOneArr[i - 1]
      maxGap = tempGap > maxGap ? tempGap : maxGap
    }

    return maxGap
  }
}

// 用 lastIndexOf 存储上一个 1 位置，候选答案为 index - lastIndexOf，再更新 lastIndexOf
// 时间复杂度：o(n)  空间复杂度：O(1)
{
  var binaryGap = function(n) {
    const binaryArr = String(n.toString(2)).split('')

    let maxGap = 0, lastIndex = -1

    binaryArr.forEach((item, index) => {
      if (item === '1') {
        if (lastIndex === -1) {
          lastIndex = index
        } else {
          maxGap = index - lastIndex > maxGap ? index - lastIndex : maxGap
          lastIndex = index
        }
      }
    })

    return lastIndex !== -1 ? maxGap : 0
  }
}

console.log(binaryGap(22))