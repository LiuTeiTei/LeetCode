/* 
https://leetcode.com/problems/longest-substring-without-repeating-characters/

给定一个字符串 s ，请你找出其中不含有重复字符的最长子串的长度。

示例 1:
输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

示例 2:
输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

示例 3:
输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     
示例 4:
输入: s = ""
输出: 0
 
提示：

0 <= s.length <= 5 * 104
s 由英文字母、数字、符号和空格组成
*/

/**
 * @param {string} s
 * @return {number}
 */

// 滑动窗口
// 左右两个指针，分别指向 0、1 元素，右指针不断右移直到发现重复的字符，此时左指针右移一个，左右指针相遇时右指针右移一个。
// 时间复杂度：O(n) 左指针和右指针分别会遍历整个字符串一次。
// 空间复杂度：O(∣Σ∣)，其中 ∣Σ∣ 表示字符集。我们需要用到哈希集合来存储出现过的字符，可以默认为所有在 [0,128) 内的 ASCII 码，即 ∣Σ∣=128。
{
  function lengthOfLongestSubstring(s: string): number {
    if (s.length <= 1) return s.length
  
    let leftP = 0
    let rightP = 1
    let result = 1
    const arr = s.split('')
    const map = new Map<string, boolean>()
    map.set(arr[leftP], true)
  
    while (rightP < s.length) {
      if (leftP === rightP) {
        map.set(arr[rightP], true)
        rightP = rightP + 1
      } else {
        if (!map.has(arr[rightP])) {
          map.set(arr[rightP], true)
          rightP = rightP + 1
          result = rightP - leftP > result ? rightP - leftP : result
        } else {
          map.delete(arr[leftP])
          leftP = leftP + 1
        }
      }
  
    }
  
    return result
  };
}

// 滑动窗口
// 利用 utf 巧妙的记录下字符出现的上个位置，遇到重复的字符就从该字符的下一个字符开始
interface Array<T> {
  fill(value: T): Array<T>;
}
function lengthOfLongestSubstring(s: string): number {
  let max = 0;
  const last = Array<number>(128).fill(-1)

  // 窗口开始位置
  let start = 0;
  for (let i = 0; i < s.length; i++) {
    const UTFIndex = s.charCodeAt(i);
    // 从上一次出现位置的下一个位置开始
    start = Math.max(start, last[UTFIndex] + 1);
    max = Math.max(max, i - start + 1)
    // 记录这一次出现的位置
    last[UTFIndex] = i;
  }

  return max;
};

console.log(lengthOfLongestSubstring('asbcafkdj'));