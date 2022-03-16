/* 
https://leetcode.com/problems/ransom-note/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0383.%E8%B5%8E%E9%87%91%E4%BF%A1.md

给你两个字符串：ransomNote 和 magazine ，判断 ransomNote 能不能由 magazine 里面的字符构成。
如果可以，返回 true ；否则返回 false 。
magazine 中的每个字符只能在 ransomNote 中使用一次。

示例 1：
输入：ransomNote = "a", magazine = "b"
输出：false

示例 2：
输入：ransomNote = "aa", magazine = "ab"
输出：false

示例 3：
输入：ransomNote = "aa", magazine = "aab"
输出：true

提示：
1 <= ransomNote.length, magazine.length <= 105
ransomNote 和 magazine 由小写英文字母组成
*/

// Map Hash
// Runtime: 153 ms, faster than 32.85%, Memory Usage: 46.5 MB, less than 39.42%
{
  function canConstruct(ransomNote: string, magazine: string): boolean {
    if (ransomNote.length > magazine.length) return false
  
    const letterMap: Map<string, number> = new Map()
  
    // 遍历 magazine，将出现的字母作为 letterMap 的 key，次数作为 letterMap 的 value
    magazine.split('').forEach(letter => {
      const count = letterMap.get(letter)
      letterMap.set(letter, count ? count + 1 : 1)
    })
  
    // 遍历 ransomNote，查看 letterMap 是否存在字母
    const ransomNoteArray = ransomNote.split('')
    for (let i = 0; i < ransomNoteArray.length; i++) {
      const letter = ransomNoteArray[i]
      const count = letterMap.get(letter)
      if (!count) {
        return false
      }
      letterMap.set(letter, count - 1)
    }
  
    return true
  };
}

// Array Hash
// 在本题的情况下，使用 Map 的空间消耗要比数组大一些的，因为 Map 要做哈希函数，是费时的！数据量大的话就能体现出来差别了.
// 而且题目已经限定为小写英文字母组成，长度为 26 的数组就可以解决了。
// Runtime: 126 ms, faster than 58.39%, Memory Usage: 47.1 MB, less than 26.28%
function canConstruct(ransomNote: string, magazine: string): boolean {
  if (ransomNote.length > magazine.length) return false

  const base = 'a'.charCodeAt(0)
  const letterArray = new Array(26).fill(0)

  // 遍历 magazine，将出现的字母作为 letterMap 的 key，次数作为 letterMap 的 value
  magazine.split('').forEach(letter => {
    const index = letter.charCodeAt(0) - base
    letterArray[index] += 1
  })

  // 遍历 ransomNote，查看 letterMap 是否存在字母
  const ransomNoteArray = ransomNote.split('')
  for (let i = 0; i < ransomNoteArray.length; i++) {
    const letter = ransomNoteArray[i]
    const index = letter.charCodeAt(0) - base
    const count = letterArray[index]
    if (!count) {
      return false
    }
    letterArray[index] -= 1
  }

  return true
};

console.log(canConstruct('aaa', 'aab'))
