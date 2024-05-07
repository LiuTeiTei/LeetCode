/* 
https://leetcode.cn/problems/letter-combinations-of-a-phone-number/description/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0017.%E7%94%B5%E8%AF%9D%E5%8F%B7%E7%A0%81%E7%9A%84%E5%AD%97%E6%AF%8D%E7%BB%84%E5%90%88.md

给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按任意顺序 返回。
给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

示例 1：
输入：digits = "23"
输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]

示例 2：
输入：digits = ""
输出：[]

示例 3：
输入：digits = "2"
输出：["a","b","c"]
 
提示：
0 <= digits.length <= 4
digits[i] 是范围 ['2', '9'] 的一个数字。
*/

// 回溯算法
// 时间复杂度：O(3^m×4^n)，其中 m 是输入中对应 3 个字母的数字个数，n 是输入中对应 4 个字母的数字个数
// 空间复杂度：O(m+n)
function letterCombinations(digits: string): string[] {
  const digitMap = new Map([
      ['2', ['a', 'b', 'c']],
      ['3', ['d', 'e', 'f']],
      ['4', ['g', 'h', 'i']],
      ['5', ['j', 'k', 'l']],
      ['6', ['m', 'n', 'o']],
      ['7', ['p', 'q', 'r', 's']],
      ['8', ['t', 'u', 'v']],
      ['9', ['w', 'x', 'y', 'z']],
  ])

  const digitsArr: string[][] = []
  for (let i = 0; i < digits.length; i++) {
      if (digitMap.has(digits[i])) {
          digitsArr.push(digitMap.get(digits[i]))
      }
  }

  const result: string[] = []
  if (digitsArr.length < 1) return result

  // 回溯算法 --> 转成树的遍历
  // 集合的大小构成了树的宽度，递归的深度构成的树的深度
  const backTracking = (index: number, res: string[]) => {
      if (index === digitsArr.length) {
          result.push(res.join(''))
          return
      }
      const currentDigit = digitsArr[index]
      // for 循环，树的横向遍历
      for (let i = 0; i < currentDigit.length; i++) {
          res.push(currentDigit[i])
          // 递归，树的纵向遍历
          backTracking(index + 1, res)
          res.pop()
      }
  }
  backTracking(0, [])

  return result
};
