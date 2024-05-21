/* 
https://leetcode.cn/problems/merge-intervals/description/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0056.%E5%90%88%E5%B9%B6%E5%8C%BA%E9%97%B4.md

以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。
请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。

示例 1：
输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
输出：[[1,6],[8,10],[15,18]]
解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].

示例 2：
输入：intervals = [[1,4],[4,5]]
输出：[[1,5]]
解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。
 
提示：
1 <= intervals.length <= 104
intervals[i].length == 2
0 <= starti <= endi <= 104
*/

// 排序
// 时间复杂度: O(nklog⁡k)，其中 n 是 intervals 中的 item 的数量，k 是 item 的长度。
// 空间复杂度: O(nk)
function merge(intervals: number[][]): number[][] {
  // 先按照 starti 从小到大排序
  intervals.sort((a, b) => a[0] - b[0])

  // start(i) 大于 end(i - 1) 就合并
  const result: number[][] = [intervals[0]]
  for (let i = 1; i < intervals.length; i++) {
      const resultLastIndex = result.length - 1
      if (result[resultLastIndex][1] >= intervals[i][0]) {
          const left = Math.min(result[resultLastIndex][0], intervals[i][0])
          const right = Math.max(result[resultLastIndex][1], intervals[i][1])
          result[resultLastIndex] = [left, right]
      } else {
          result.push(intervals[i])
      }
  }

  return result
};
