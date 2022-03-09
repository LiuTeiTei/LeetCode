/* 
https://leetcode.com/problems/valid-anagram/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0242.%E6%9C%89%E6%95%88%E7%9A%84%E5%AD%97%E6%AF%8D%E5%BC%82%E4%BD%8D%E8%AF%8D.md

给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。
注意：若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词。

示例 1:
输入: s = "anagram", t = "nagaram"
输出: true

示例 2:
输入: s = "rat", t = "car"
输出: false

提示:
1 <= s.length, t.length <= 5 * 104
s 和 t 仅包含小写字母

进阶: 如果输入字符串包含 unicode 字符怎么办？你能否调整你的解法来应对这种情况？
*/


// 构造两个 对象hash 表，先比较长度，再依次比较每个字母出现的次数
// 时间复杂度：O(n + n + n + n)，空间复杂度：O(1 + 1)
// Runtime: 102 ms, faster than 79.05%, Memory Usage: 46.9 MB, less than 21.45%
{
  function isAnagram(s: string, t: string): boolean {
    const getRecord = (value: string): Record<string, number> => {
      const record: Record<string, number> = {}
      const values = value.split('')
  
      values.forEach(item => {
        record[item] = record[item] ?  record[item] + 1 : 1
      })
  
      return record
    }

    if (s.length !== t.length) return false
  
    const recordS = getRecord(s)
    const recordT = getRecord(t)
  
    if (Object.keys(recordS).length !== Object.keys(recordT).length) return false
  
    for(let key in recordS) {
      if (recordS[key] !== recordT[key]) return false
    }
  
    return true
  };
}

// 构造一个 对象hash 表，遍历 s 加 1，遍历 t 减 1
// 时间复杂度：O(n + n + n)，空间复杂度：O(1)
// Runtime: 95 ms, faster than 84.97%, Memory Usage: 46.8 MB, less than 21.79% 
{
  function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) return false
    
    const recordMap: Record<string, number> = {}
  
    s.split('').forEach(item => {
      recordMap[item] = recordMap[item] ? recordMap[item] + 1 : 1
    })
  
    t.split('').forEach(item => {
      recordMap[item] = recordMap[item] ? recordMap[item] - 1 : -1
    })
  
    return Object.values(recordMap).filter(item => item !== 0).length === 0
  };
}

// 上述方法的简化，构造长度为 24 的 数组hash 表
// 虽然不需要 Object.values 的调用，但是每个字母都需要查询一边 charCodeAt
// Runtime: 76 ms, faster than 97.64%, Memory Usage: 45.6 MB, less than 36.99% 
function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false

  const recordArray = new Array(26).fill(undefined)
  const baseCode = 'a'.charCodeAt(0)

  s.split('').forEach(item => {
    const index = item.charCodeAt(0) - baseCode
    recordArray[index] = recordArray[index] ? recordArray[index] + 1 : 1
  })

  t.split('').forEach(item => {
    const index = item.charCodeAt(0) - baseCode
    if (!recordArray[index]) return false
    recordArray[index]--
  })

  return recordArray.filter(item => item !==0 && item !== undefined).length === 0
};

console.log(isAnagram('ansagram', 'nagarams'))
