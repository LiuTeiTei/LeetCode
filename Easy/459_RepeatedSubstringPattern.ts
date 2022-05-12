/* 
https://leetcode.com/problems/repeated-substring-pattern/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0459.%E9%87%8D%E5%A4%8D%E7%9A%84%E5%AD%90%E5%AD%97%E7%AC%A6%E4%B8%B2.md

给定一个非空的字符串 s ，检查是否可以通过由它的一个子串重复多次构成。

示例 1:

输入: s = "abab"
输出: true
解释: 可由子串 "ab" 重复两次构成。

示例 2:
输入: s = "aba"
输出: false

示例 3:
输入: s = "abcabcabcabc"
输出: true
解释: 可由子串 "abc" 重复四次构成。 (或子串 "abcabc" 重复两次构成。)
 

提示：

1 <= s.length <= 104
s 由小写英文字母组成
*/

// 利用 KMP 算法求出 next 数组，
// next 数组的最后一位值，表示了字符串最长相等前后缀的长度，
// 数组长度减去该值，相当于是第一个周期的长度，也就是最长不能重复的长度，
// 该长度如果能被数组长度整除，说明整个数组就是这个周期的循环。
// 时间复杂度 O(n)
// Runtime: 74 ms, faster than 91.84%, Memory Usage: 49 MB, less than 61.22%
function repeatedSubstringPattern(s: string): boolean {
  // 求 next 数组
  let len = s.length
  let next = [0]
  let leftP = 0
  let rightP = 1

  for (; rightP < len; rightP++) {
    while (leftP > 0 && s[leftP] !== s[rightP]) {
      leftP = next[leftP - 1]
    }
    if (s[leftP] === s[rightP]) {
      leftP++
    }

    next.push(leftP)
  }

  const maxUnrepeatedLength = next[len - 1]
  const minRepeated = len - maxUnrepeatedLength

  return (minRepeated !== len) && (len % minRepeated === 0)
};

console.log(repeatedSubstringPattern('abcabcabcabc')) // true
console.log(repeatedSubstringPattern('abac')) // false
