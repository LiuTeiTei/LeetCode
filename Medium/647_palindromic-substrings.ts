/* 
https://leetcode.cn/problems/palindromic-substrings
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0647.%E5%9B%9E%E6%96%87%E5%AD%90%E4%B8%B2.md

给你一个字符串 s ，请你统计并返回这个字符串中 回文子串 的数目。
回文字符串 是正着读和倒过来读一样的字符串。
子字符串 是字符串中的由连续字符组成的一个序列。
具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。

示例 1：
输入：s = "abc"
输出：3
解释：三个回文子串: "a", "b", "c"

示例 2：
输入：s = "aaa"
输出：6
解释：6个回文子串: "a", "a", "a", "aa", "aa", "aaa"

提示：
1 <= s.length <= 1000
s 由小写英文字母组成
*/

// 动态规划
// 时间复杂度：O(n^2)，空间复杂度：O(n^2)

// 双指针：找中心然后向两边扩散看是不是对称。注意：中心点可以是一个元素，也可以是两个相同的元素。
// 时间复杂度：O(n^2)，空间复杂度：O(1)
function countSubstrings(s: string): number {
  const getPalinCount = (left: number, right: number) => {
    let count = 0
    while(s[left] === s[right] && left >= 0 && right < s.length) {
      count++
      left--
      right++
    }
    return count
  }

  let result = 0
  for (let i = 0; i < s.length; i++) {
    result += getPalinCount(i, i)
    result += getPalinCount(i, i + 1)
  }

  return result
};