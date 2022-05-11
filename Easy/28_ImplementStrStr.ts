/* 
https://leetcode.com/problems/implement-strstr/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0028.%E5%AE%9E%E7%8E%B0strStr.md

给你两个字符串 haystack 和 needle ，
请你在 haystack 字符串中找出 needle 字符串出现的第一个位置（下标从 0 开始）。
如果不存在，则返回  -1 。

说明：
当 needle 是空字符串时，我们应当返回什么值呢？这是一个在面试中很好的问题。
对于本题而言，当 needle 是空字符串时我们应当返回 0 。这与 C 语言的 strstr() 以及 Java 的 indexOf() 定义相符。

示例 1：
输入：haystack = "hello", needle = "ll"
输出：2

示例 2：
输入：haystack = "aaaaa", needle = "bba"
输出：-1

示例 3：
输入：haystack = "", needle = ""
输出：0

提示：

1 <= haystack.length, needle.length <= 104
haystack 和 needle 仅由小写英文字符组成
*/

// 可以使用的原始 api：string.prototype.search、string.prototype.split
// KPM 算法，当出现字符串不匹配时，可以记录一部分之前已经匹配的文本内容，利用这些信息避免从头再去做匹配。
// 时间复杂度为 O(n + m)
// Runtime: 62 ms, faster than 96.11%, Memory Usage: 43.3 MB, less than 57.34%
function strStr(haystack: string, needle: string): number {
  if (haystack.length < needle.length) return -1
  if (needle.length === 0) return 0

  // 构造 next 数组，计算某字符的每个字母对应的最长公共前后缀长度
  const getNext = (value: string) => {
    // 初始化左右指针
    const next = []
    let i = 0
    let j = 1
    next.push(i)

    for (; j < value.length; j++){
      // 前后缀不相同了，利用已经存储的 next 数组快速跳到之前匹配的位置
      while(i > 0 && value[i] !== value[j]) {
        i = next[i - 1]
      }

      //  找到相同的前后缀
      if (value[i] === value[j]) {
        i++
      }

      next.push(i)
    }

    return next
  }
  const next = getNext(needle)


  // 使用next数组，用模式串匹配文本串
  let hP = 0
  let nP = 0
  for (; hP < haystack.length; hP++) {
    // 不匹配，寻找之前 needle 匹配的位置
    while(nP > 0 && haystack[hP] !== needle[nP]) {
      nP = next[nP - 1]
    }

    // 匹配，hP 和 nP 同时向后移动
    if (haystack[hP] === needle[nP]) {
      nP++
    }

    if (nP === needle.length) {
      return hP - needle.length + 1
    }
  }

  return -1
};

console.log(strStr('aabaabaaf', 'aabaaf')) // 3
console.log(strStr('aabaaabaaf', 'aabaaf')) // 4
console.log(strStr('aabaaccaaf', 'aabaaf')) // -1
console.log(strStr('adcadcaddcadde', 'adcadde')) // -1
