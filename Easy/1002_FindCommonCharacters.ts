/* 
https://leetcode.com/problems/find-common-characters/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/1002.%E6%9F%A5%E6%89%BE%E5%B8%B8%E7%94%A8%E5%AD%97%E7%AC%A6.md

给你一个字符串数组 words ，请你找出所有在 words 的每个字符串中都出现的共用字符（ 包括重复字符），
并以数组形式返回。你可以按 任意顺序 返回答案。
 
示例 1：
输入：words = ["bella","label","roller"]
输出：["e","l","l"]

示例 2：
输入：words = ["cool","lock","cook"]
输出：["c","o"]

提示：
1 <= words.length <= 100
1 <= words[i].length <= 100
words[i] 由小写英文字母组成
*/


// ❌ 这个方法将所有出现的次数都统计到一个对象中，混淆了 ['aa', 'bb'] 这个输入
{
  function commonChars(words: string[]): string[] {
    const commonMap: Record<string, number> = {}
  
    words.forEach(string => {
      for (let i = 0; i < string.length; i++) {
        const key = string[i]
        commonMap[key] = commonMap[key] ? commonMap[key] + 1 : 1
      }
    })
  
    const result: string[] = []
  
    for (let key in commonMap) {
      while (commonMap[key] >= words.length) {
        result.push(key)
        commonMap[key] -= 3
      }
    }
  
    return result
  };
}

// 时间复杂度：O(n * m + (n - 1) * m + m) ；空间复杂度：O(1 + 1)
// Runtime: 76 ms, faster than 100.00%, Memory Usage: 46.9 MB, less than 46.67%
function commonChars(words: string[]): string[] {
  const size = 26
  const a = 'a'.charCodeAt(0)
  const result: string[] = []
  
  // 以第一个 string 为基准，首先或者到基础 hash 数组.
  const firstString = words[0]
  const firstHash = new Array(size).fill(0)
  for (let i = 0; i < firstString.length; i++) {
    const index = firstString[i].charCodeAt(0) - a
    firstHash[index] += 1
  }

  // 遍历剩余的 string.
  for (let i = 1; i < words.length; i++) {
    // 先获取其他 string 的 hash 数组.
    const otherString = words[i]
    const otherHash = new Array(size).fill(0)
    for (let i = 0; i < otherString.length; i++) {
      const index = otherString[i].charCodeAt(0) - a
      otherHash[index] += 1
    }

    // 再和基准 hash 数组比较取得最小出现次数.
    otherHash.forEach((time, index) => {
      firstHash[index] = Math.min(time, firstHash[index])
    })
  }

  // 数字转化为字符
  firstHash
    .forEach((time, index) => {
      while (time > 0) {
        const char = String.fromCharCode(index + a)
        result.push(char)
        time--
      }
    })

  return result
};

console.log(commonChars(["bella","label","roller"]))
