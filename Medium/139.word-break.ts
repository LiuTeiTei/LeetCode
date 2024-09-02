/* 
https://leetcode.cn/problems/word-break/description/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0139.%E5%8D%95%E8%AF%8D%E6%8B%86%E5%88%86.md

给你一个字符串 s 和一个字符串列表 wordDict 作为字典。
如果可以利用字典中出现的一个或多个单词拼接出 s 则返回 true。
注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。

示例 1：
输入: s = "leetcode", wordDict = ["leet", "code"]
输出: true
解释: 返回 true 因为 "leetcode" 可以由 "leet" 和 "code" 拼接成。

示例 2：
输入: s = "applepenapple", wordDict = ["apple", "pen"]
输出: true
解释: 返回 true 因为 "applepenapple" 可以由 "apple" "pen" "apple" 拼接成。
     注意，你可以重复使用字典中的单词。

示例 3：
输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
输出: false
 
提示：
1 <= s.length <= 300
1 <= wordDict.length <= 1000
1 <= wordDict[i].length <= 20
s 和 wordDict[i] 仅由小写英文字母组成
wordDict 中的所有字符串 互不相同
*/

// 动态规划
// dp[i]: 字符串长度为 i 且值为 true 时，可以拼接
// j < i，如果 dp[j] = true 且 [j, i] 这个区间的子串出现在字典里，那么 dp[i] = true
// 时间复杂度: O(n^3) 空间复杂度: O(n)
function wordBreak(s: string, wordDict: string[]): boolean {
  const len = s.length + 1
  const dp: boolean[] = new Array(len).fill(false)
  dp[0] = true

  for (let i = 1; i < len; i++) {
      for (let j = 0; j < i; j++) {
          // 注意：dp 对应的 s 的索引是从 1 开始的，所有不是 s.slice(j + 1, i + 1)
          if (dp[j] && wordDict.includes(s.slice(j, i))) {
              dp[i] = true
          }
      }
  }

  return dp[len - 1]
};
