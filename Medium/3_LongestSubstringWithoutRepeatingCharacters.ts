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
// 左右两个指针，分别指向 0、1 元素，右指针不断右移直到发现重复的字符，此时左指针右移一个并且右指针重置到左指针的右边一个。
// O(n^3)   Runtime:488 ms   Memory:46 MB
{
  function lengthOfLongestSubstring(s: string): number {
    if (s.length < 2) return s.length;
  
    let max = 1;
    let arr: string[];
  
    for (let i = 0; i < s.length; i++) {
      arr = [s[i]];
      for (let j = i + 1; j < s.length; j++) {
        const isRepeated = arr.indexOf(s[j]) > -1;
  
        if (isRepeated) {
          arr = [];
          break
        } else {
          arr.push(s[j]);
          max = Math.max(max, arr.length);
        }
      }
    }
  
    return max;
  };
}

// 滑动窗口
// 查找是否相同优化
// O(n^2)   Runtime:104 ms   Memory:44 MB
{
  function lengthOfLongestSubstring(s: string): number {
    // 哈希集合，记录每个字符是否出现过
    const stringSet = new Set();
    // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动
    let rightP = -1;
    let max = 0;
    let n = s.length;

    for (let i = 0; i < n; i++) {
      if (i !== 0) {
        // 左指针向右移动一格，移除一个字符
        stringSet.delete(s.charAt(i - 1));
      }

      while (rightP + 1 < n && !stringSet.has(s.charAt(rightP + 1))) {
        // 不断地移动右指针
        stringSet.add(s.charAt(rightP + 1));
        ++rightP;
      }

      // 第 i 到 rk 个字符是一个极长的无重复字符子串
      max = Math.max(max, rightP - i + 1);
    }
  
    return max;
  };
}

// Runtime:96 ms   Memory:41.4 MB
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