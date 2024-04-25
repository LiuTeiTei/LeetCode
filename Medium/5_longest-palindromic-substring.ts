/* 
https://leetcode.cn/problems/longest-palindromic-substring
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0005.%E6%9C%80%E9%95%BF%E5%9B%9E%E6%96%87%E5%AD%90%E4%B8%B2.md

给你一个字符串 s，找到 s 中最长的回文子串。
如果字符串的反序与原始字符串相同，则该字符串称为回文字符串。

示例 1：
输入：s = "babad"
输出："bab"
解释："aba" 同样是符合题意的答案。

示例 2：
输入：s = "cbbd"
输出："bb"

提示：
1 <= s.length <= 1000
s 仅由数字和英文字母组成
*/

// 双指针：找中心然后向两边扩散看是不是对称。注意：中心点可以是一个元素，也可以是两个相同的元素。
// 时间复杂度：O(n^2)，空间复杂度：O(1)
function longestPalindrome(s: string): string {
  let result = ''

  const getPaline = (left: number, right: number) => {
    while (left >=0 && right < s.length && s[left] === s[right]) {
      if (right - left + 1 > result.length) {
        result = s.slice(left, right + 1)
      }
      left--
      right++
    }
  }

  for(let i = 0; i < s.length; i++) {
    getPaline(i , i)
    getPaline(i, i + 1)
  }

  return result
};