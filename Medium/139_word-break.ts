/* 
https://leetcode.com/problems/word-break/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0139.%E5%8D%95%E8%AF%8D%E6%8B%86%E5%88%86.md

给你一个字符串 s 和一个字符串列表 wordDict 作为字典。
请你判断是否可以利用字典中出现的单词拼接出 s 。
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
s 和 wordDict[i] 仅有小写英文字母组成
wordDict 中的所有字符串 互不相同
*/

// 时间复杂度：O(n^3)，空间复杂度：O(n)
function wordBreak(s: string, wordDict: string[]): boolean {
  // dp[j]：dp[j]为 true，表示长度为 j 的字符串 s，可以利用字典中出现的单词拼接
  const dp: boolean[] = new Array(s.length + 1).fill(false)

  // 初始化
  dp[0] = true

  // 一定严格按照顺序取出字符串才能完成拼接，相当于求排列 -》外层背包，内层价值
  for (let j = 1; j < s.length + 1; j++) {
    // 字典中的单词可以重复使用 -》完全背包 -》正序遍历
    for (let i = 0; i < wordDict.length; i++) {
      let flag = false
      if (j - wordDict[i].length >= 0) {
        const word = s.slice(j - wordDict[i].length, j)
        if (word === wordDict[i]) {
          flag = dp[j - wordDict[i].length]
        }
      }
      dp[j] = dp[j] || flag
    }
  }

  return dp[s.length]
};