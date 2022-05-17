/*
https://leetcode.cn/problems/remove-all-adjacent-duplicates-in-string/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/1047.%E5%88%A0%E9%99%A4%E5%AD%97%E7%AC%A6%E4%B8%B2%E4%B8%AD%E7%9A%84%E6%89%80%E6%9C%89%E7%9B%B8%E9%82%BB%E9%87%8D%E5%A4%8D%E9%A1%B9.md

给出由小写字母组成的字符串 S，重复项删除操作会选择两个相邻且相同的字母，并删除它们。
在 S 上反复执行重复项删除操作，直到无法继续删除。
在完成所有重复项删除操作后返回最终的字符串。答案保证唯一。

示例1：
输入："abbaca"
输出："ca"
解释：
例如，在 "abbaca" 中，我们可以删除 "bb" 由于两字母相邻且相同，
这是此时唯一可以执行删除操作的重复项。之后我们得到字符串 "aaca"，
其中又只有 "aa" 可以执行重复项删除操作，所以最后的字符串为 "ca"。

示例2：
输入："azxxzy"
输出："ay"
 
提示：
1 <= S.length <= 20000
S 仅由小写英文字母组成。
*/

function removeDuplicates(s: string): string {
  const stack: string[] = []

  for (let i = 0; i < s.length; i++) {
    const curr = s[i]
    if (stack.length < 1) {
      stack.push(curr)
    } else {
      const prev = stack[stack.length - 1]
      if (curr === prev) {
        stack.pop()
      } else {
        stack.push(curr)
      }
    }
  }

  return stack.join('')
};

console.log(removeDuplicates('abbacaa'))
