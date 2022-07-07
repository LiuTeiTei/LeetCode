/* 
https://leetcode.com/problems/letter-combinations-of-a-phone-number/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0017.%E7%94%B5%E8%AF%9D%E5%8F%B7%E7%A0%81%E7%9A%84%E5%AD%97%E6%AF%8D%E7%BB%84%E5%90%88.md

给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。
答案可以按任意顺序 返回。
给出数字到字母的映射如下（与电话按键相同）。
注意 1 不对应任何字母。

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

const numberMap = {
  '2': 'abc',
  '3': 'def',
  '4': 'ghi',
  '5': 'jkl',
  '6': 'mno',
  '7': 'pqrs',
  '8': 'tuv',
  '9': 'wxyz',
}

function letterCombinations(digits: string): string[] {
  const len = digits.length
  const result: string[] = []
  const path: string[] = []

  // index 记录遍历 digits 第几个数字，也表示树的深度
  const backtracking = (index: number) => {
    const num = digits[index]

    // 也可以是 index === len 的判断条件
    if (path.length === len) {
      result.push(path.join(''))
      return
    }

    for (let i = 0; i < numberMap[num].length; i++) {
      path.push(numberMap[num][i])
      backtracking(index + 1)
      path.pop()
    }
  }

  if (len > 0) {
    backtracking(0)
  }
  
  return result
};

console.log(letterCombinations('23'))