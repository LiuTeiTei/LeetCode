/* 
https://leetcode.com/problems/non-overlapping-intervals/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0435.%E6%97%A0%E9%87%8D%E5%8F%A0%E5%8C%BA%E9%97%B4.md

给定一个区间的集合 intervals ，其中 intervals[i] = [starti, endi] 。
返回 需要移除区间的最小数量，使剩余区间互不重叠 。

示例 1:
输入: intervals = [[1,2],[2,3],[3,4],[1,3]]
输出: 1
解释: 移除 [1,3] 后，剩下的区间没有重叠。

示例 2:
输入: intervals = [[1,2], [1,2], [1,2]]
输出: 2
解释: 你需要移除两个 [1,2] 来使剩下的区间没有重叠。

示例 3:
输入: intervals = [[1,2], [2,3]]
输出: 0
解释: 你不需要移除任何区间，因为它们已经是无重叠的了。

提示:
1 <= intervals.length <= 105
intervals[i].length == 2
-5 * 104 <= starti < endi <= 5 * 104
*/

// 局部最优：优先选右边界小的区间，所以从左向右遍历，留给下一个区间的空间大一些，从而尽量避免交叉。
// 全局最优：选取最多的非交叉区间。

// 时间复杂度：O(nlog n) ，有一个快排
// 空间复杂度：O(n)，有一个快排，最差情况(倒序)时，需要n次递归调用。因此确实需要O(n)的栈空间
function eraseOverlapIntervals(intervals: number[][]): number {
  if (intervals.length <= 1) return 0
  // 按照左边界排序
  intervals.sort((a, b) => {
    return a[0] - b[0]
  })

  // 从右向左遍历，且左边界数值越大越好
  let count = 1
  let dividing = intervals[intervals.length - 1][0]
  for (let i = intervals.length - 2; i >= 0; i--) {
    if (intervals[i][1] <= dividing) {
      dividing = intervals[i][0]
      count++
    }
  }

  return intervals.length - count
};

console.log(eraseOverlapIntervals([[1,2],[2,3]]))