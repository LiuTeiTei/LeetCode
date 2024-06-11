/* 
https://leetcode.cn/problems/minimum-window-substring/description/

给你一个字符串 s 、一个字符串 t 。
返回 s 中涵盖 t 所有字符的最小子串。
如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。

注意：
对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量。
如果 s 中存在这样的子串，我们保证它是唯一的答案。
 
示例 1：
输入：s = "ADOBECODEBANC", t = "ABC"
输出："BANC"
解释：最小覆盖子串 "BANC" 包含来自字符串 t 的 'A'、'B' 和 'C'。

示例 2：
输入：s = "a", t = "a"
输出："a"
解释：整个字符串 s 是最小覆盖子串。

示例 3:
输入: s = "a", t = "aa"
输出: ""
解释: t 中两个字符 'a' 均应包含在 s 的子串中，
因此没有符合条件的子字符串，返回空字符串。
 
提示：
m == s.length
n == t.length
1 <= m, n <= 105
s 和 t 由英文字母组成
 
进阶：你能设计一个在 o(m+n) 时间内解决此问题的算法吗？
*/

// 滑动窗口
// 时间复杂度: O(s * s + s * t) 空间复杂度: O(s + t)
function minWindow(s: string, t: string): string {
  const tMap = new Map<string, number>()
  for (let i = 0; i < t.length; i++) {
      tMap.set(t[i], (tMap.get(t[i]) ?? 0) + 1)
  }

  const stepMap = new Map<string, number>()
  let leftP = 0
  let rightP = 0
  stepMap.set(s[rightP], 1)

  let result = [0, s.length]

  // 通过对比两个 map 来检查当前区间是否包含 t
  const check = () => {
      const iterator = tMap.entries()
      let flag = true
      let value = iterator.next().value
      while (value) {
          if ((stepMap.get(value[0]) ?? 0) >= value[1]) {
              value = iterator.next().value
          } else {
              return false
          }
      }
      return true
  }

  while(leftP < s.length && rightP < s.length) {
      if (!check()) {
          // 当前区间不包含 t 时，rightP 右移
          rightP += 1
          stepMap.set(s[rightP], (stepMap.get(s[rightP]) ?? 0) + 1)
      } else {
          // 当前区间包含 t leftP 右移
          result = rightP - leftP >= result[1] - result[0] ? result : [leftP, rightP]
          stepMap.set(s[leftP], (stepMap.get(s[leftP]) ?? 0) - 1)
          leftP += 1
      }
  }

  return result[1] - result[0] === s.length ? '' : s.slice(result[0], result[1] + 1)
};
