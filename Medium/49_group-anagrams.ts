/* 
给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。
字母异位词 是由重新排列源单词的所有字母得到的一个新单词。

示例 1:
输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
输出: [["bat"],["nat","tan"],["ate","eat","tea"]]

示例 2:
输入: strs = [""]
输出: [[""]]

示例 3:
输入: strs = ["a"]
输出: [["a"]]
 
提示：
1 <= strs.length <= 104
0 <= strs[i].length <= 100
strs[i] 仅包含小写字母
*/

// 排序 + 哈希表
// 时间复杂度: O(nklog⁡k)，其中 n 是 strs 中的字符串的数量，k 是 strs 中的字符串的的最大长度。
// 空间复杂度: O(nk)
function groupAnagrams(strs: string[]): string[][] {
  // 对每个元素进行排序
  const sortedStrs: string[] = []
  strs.forEach((str, index) => {
      sortedStrs.push(str.split('').sort().join(''))
  })

  // 将每组单词出现的 index 记录在哈希表中
  const indexMap = new Map<string, number[]>()
  sortedStrs.forEach((str, index) => {
      const indexes = indexMap.get(str)
      if (!indexes) {
          indexMap.set(str, [index])
      } else {
          indexMap.set(str, [...indexes, index])
      }
  })

  const result: string[][] = []
  indexMap.forEach((value) => {
      result.push(value.map((index) => strs[index]))
  })

  return result
};