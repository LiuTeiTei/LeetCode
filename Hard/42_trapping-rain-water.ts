/* 
https://leetcode.cn/problems/trapping-rain-water/submissions/537502308/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0042.%E6%8E%A5%E9%9B%A8%E6%B0%B4.md

给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

示例 1：
输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
输出：6
解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 

示例 2：
输入：height = [4,2,0,3,2,5]
输出：9
 
提示：
n == height.length
1 <= n <= 2 * 104
0 <= height[i] <= 105
*/

// 双指针
// 时间复杂度：O(3n)，空间复杂度：O(2n)
function trap(height: number[]): number {
  const len = height.length

  // 记录每个柱子左边柱子最大高度
  const leftH: number[] = []
  leftH[0] = height[0]
  for (let i = 1; i < len; i++) {
      leftH[i] = Math.max(leftH[i - 1], height[i - 1])
  }

  // 记录每个柱子右边柱子最大高度
  const rightH: number[] = []
  rightH[len - 1] = height[len - 1]
  for (let j = len - 2; j >= 0; j--) {
      rightH[j] = Math.max(rightH[j + 1], height[j + 1])
  }

  // 当前列雨水面积：min(左边柱子的最高高度，记录右边柱子的最高高度) - 当前柱子高度
  let result = 0
  for (let i = 1; i < len - 1; i++) {
      const count = Math.min(leftH[i], rightH[i]) - height[i]
      if (count > 0) result += count
  }
  
  return result
};
