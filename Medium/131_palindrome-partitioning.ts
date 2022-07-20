/* 
https://leetcode.com/problems/palindrome-partitioning/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0131.%E5%88%86%E5%89%B2%E5%9B%9E%E6%96%87%E4%B8%B2.md

给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是 回文串 。返回 s 所有可能的分割方案。
回文串 是正着读和反着读都一样的字符串。

示例 1：
输入：s = "aab"
输出：[["a","a","b"],["aa","b"]]

示例 2：
输入：s = "a"
输出：[["a"]]
 
提示：
1 <= s.length <= 16
s 仅由小写英文字母组成
*/

function partition(s: string): string[][] {
  const result: string[][] = []
  const path: string[] = []

  const isPalindrome = (value: string): boolean => {
    for (let i = 0, j = value.length - 1; i < j; i++, j--){
      if (value[i] !== value[j]) {
        return false
      }
    }
    return true
  }

  const backtracking = (index: number) => {
    if (index === s.length) {
      result.push([...path])
      return
    }

    for (let i = index; i < s.length; i++) {
      const str = s.slice(index, i + 1)
      if (!isPalindrome(str)) {
        continue
      }
      
      path.push(str)
      // 切割过的地方不能重复切割所以递归函数需要传入 i + 1
      backtracking(i + 1)
      path.pop()
    }
  }

  backtracking(0)
  return result
};

console.log(partition("aab"))