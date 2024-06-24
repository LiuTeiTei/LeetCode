/* 
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0084.%E6%9F%B1%E7%8A%B6%E5%9B%BE%E4%B8%AD%E6%9C%80%E5%A4%A7%E7%9A%84%E7%9F%A9%E5%BD%A2.md
https://leetcode.cn/problems/largest-rectangle-in-histogram/description/

给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。
求在该柱状图中，能够勾勒出来的矩形的最大面积。

示例 1:
输入：heights = [2,1,5,6,2,3]
输出：10
解释：最大的矩形为图中红色区域，面积为 10

示例 2：
输入： heights = [2,4]
输出： 4
 
提示：
1 <= heights.length <=105
0 <= heights[i] <= 104
*/

// 双指针
// 时间复杂度：O(n^2 + 2n)，空间复杂度：O(2n)
function largestRectangleArea(heights: number[]): number {
  const len = heights.length

  // 记录每个柱子 靠左边第一个小于该柱子的下标
  const leftH: number[] = []
  leftH[0] = -1
  for (let i = 1; i < len; i++) {
      let temp = i - 1
      // 不断向左寻找
      while (temp >= 0 && heights[temp] >= heights[i]) {
          temp = leftH[temp]
      }
      leftH[i] = temp
  }

  // 记录每个柱子 靠右边第一个小于该柱子的下标
  const rightH: number[] = []
  rightH[len - 1] = len
  for (let j = len - 2; j >= 0; j--) {
      let temp = j + 1
      // 不断向右寻找
      while (temp <= len - 1 && heights[temp] >= heights[j]) {
          temp = rightH[temp]
      }
      rightH[j] = temp
  }

  // 当前列为最高点时的面积
  let result = 0
  for (let i = 0; i < len; i++) {
      const area = (rightH[i] - leftH[i] - 1) * heights[i]
      result = Math.max(result, area)
  }

  return result
};
