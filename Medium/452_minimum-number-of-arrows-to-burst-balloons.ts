/* 
https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0452.%E7%94%A8%E6%9C%80%E5%B0%91%E6%95%B0%E9%87%8F%E7%9A%84%E7%AE%AD%E5%BC%95%E7%88%86%E6%B0%94%E7%90%83.md

有一些球形气球贴在一堵用 XY 平面表示的墙面上。
墙面上的气球记录在整数数组 points ，
其中points[i] = [xstart, xend] 表示水平直径在 xstart 和 xend之间的气球。
你不知道气球的确切 y 坐标。
一支弓箭可以沿着 x 轴从不同点 完全垂直 地射出。
在坐标 x 处射出一支箭，若有一个气球的直径的开始和结束坐标为 xstart，xend，
且满足  xstart ≤ x ≤ xend，则该气球会被 引爆 。
可以射出的弓箭的数量 没有限制 。 
弓箭一旦被射出之后，可以无限地前进。
给你一个数组 points ，返回引爆所有气球所必须射出的 最小 弓箭数 。

示例 1：
输入：points = [[10,16],[2,8],[1,6],[7,12]]
输出：2
解释：气球可以用2支箭来爆破:
-在x = 6处射出箭，击破气球[2,8]和[1,6]。
-在x = 11处发射箭，击破气球[10,16]和[7,12]。

示例 2：
输入：points = [[1,2],[3,4],[5,6],[7,8]]
输出：4
解释：每个气球需要射出一支箭，总共需要4支箭。

示例 3：
输入：points = [[1,2],[2,3],[3,4],[4,5]]
输出：2
解释：气球可以用2支箭来爆破:
- 在x = 2处发射箭，击破气球[1,2]和[2,3]。
- 在x = 4处射出箭，击破气球[3,4]和[4,5]。

提示:
1 <= points.length <= 105
points[i].length == 2
-231 <= xstart < xend <= 231 - 1
*/

function findMinArrowShots(points: number[][]): number {
  if (points.length < 1) return 0
  
  // 按照气球的起始位置排序
  points.sort((a, b) => {
    return a[0] - b[0]
  })
  
  let result = 1
  // 一组重叠气球最小右边界
  let min = points[0][1]
  for (let i = 1; i < points.length; i++) {
    if (points[i][0] > min) {
      result++
      // 重制最小右边界
      min = points[i][1]
    } else {
      // 重叠气球中右边边界的最小值
      min = Math.min(min, points[i][1])
    }
  }

  return result
};