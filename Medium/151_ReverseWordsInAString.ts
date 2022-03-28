/* 
https://leetcode.com/problems/reverse-words-in-a-string/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0151.%E7%BF%BB%E8%BD%AC%E5%AD%97%E7%AC%A6%E4%B8%B2%E9%87%8C%E7%9A%84%E5%8D%95%E8%AF%8D.md

给你一个字符串 s ，颠倒字符串中 单词 的顺序。
单词 是由非空格字符组成的字符串。
s 中使用至少一个空格将字符串中的 单词 分隔开。
返回 单词 顺序颠倒且 单词 之间用单个空格连接的结果字符串。

注意：输入字符串 s中可能会存在前导空格、尾随空格或者单词间的多个空格。
返回的结果字符串中，单词间应当仅用单个空格分隔，且不包含任何额外的空格。

示例 1：
输入：s = "the sky is blue"
输出："blue is sky the"

示例 2：
输入：s = "  hello world  "
输出："world hello"
解释：颠倒后的字符串中不能存在前导空格和尾随空格。

示例 3：
输入：s = "a good   example"
输出："example good a"
解释：如果两个单词间有多余的空格，颠倒后的字符串需要将单词间的空格减少到仅有一个。

提示：
1 <= s.length <= 104
s 包含英文大小写字母、数字和空格 ' '
s 中 至少存在一个 单词
 
进阶：如果字符串在你使用的编程语言中是一种可变数据类型，请尝试使用 O(1) 额外空间复杂度的 原地 解法。
*/

// 利用 api，先去掉空格转成数组，反转，在用空格拼接
// 这样的写法，没有意义
// Runtime: 86 ms, faster than 66.93%, Memory Usage: 44.7 MB, less than 74.19%
{
  function reverseWords(s: string): string {
    const arr = s.split(' ').filter(item => item.length > 0)
    return arr.reverse().join(' ')
  }
}

// 空间复杂度 O(1)
// 移除多余空格，将整个字符串都反转过来，再把单词反转一下。
// Runtime: 87 ms, faster than 65.32%, Memory Usage: 45.3 MB, less than 39.52%
function reverseWords(s: string): string {

  // 使用双指针来移除冗余空格的时间复杂度为 O(n)，如果使用库函数的方法会有其他空间或时间的消耗
  const removeExtraSpaces = (arr: string[]): void => {
    const length = arr.length
    let leftP = 0
    let rightP = 0

    while (rightP < length) {
      // 去除开头的所有空格
      if (leftP === 0 && arr[rightP] === ' ') {
        rightP++
        continue
      }

      // 保留中间一个空格
      if (arr[rightP] === ' ' && arr[rightP - 1] === ' ') {
        rightP++
        continue
      }

      arr[leftP] = arr[rightP]
      leftP++
      rightP++
    }

    // 去除末尾空格
    if (arr[leftP - 1] === ' ') {
      leftP--
    }

    arr.length = leftP
  }

  // 反转字符串中所有字符
  const reverseAllWords = (arr: string[], start?: number, end?: number): void => {
    let leftP = start ?? 0
    let rightP = end ?? arr.length - 1

    while (leftP < rightP) {
      const temp = arr[leftP]
      arr[leftP] = arr[rightP]
      arr[rightP] = temp

      leftP++
      rightP--
    }
  }

  // 反转单个字符串
  const reversSingleWord = (arr: string[]): void => {
    const length = arr.length
    let leftP = 0
    let rightP = 0

    while (rightP < length) {
      leftP = rightP

      while (arr[rightP] !== ' ' && rightP < length) {
        rightP++
      }

      reverseAllWords(arr, leftP, rightP - 1)
      rightP++
    }
  }

  const arr = s.split('')

  removeExtraSpaces(arr)
  reverseAllWords(arr)
  reversSingleWord(arr)

  return arr.join('')
};

console.log(reverseWords("  hello world  "))