/* 
https://leetcode.com/problems/jump-game/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0055.%E8%B7%B3%E8%B7%83%E6%B8%B8%E6%88%8F.md

给定一个非负整数数组 nums ，你最初位于数组的 第一个下标 。
数组中的每个元素代表你在该位置可以跳跃的最大长度。
判断你是否能够到达最后一个下标。

示例 1：
输入：nums = [2,3,1,1,4]
输出：true
解释：可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。

示例 2：
输入：nums = [3,2,1,0,4]
输出：false
解释：无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0 ， 所以永远不可能到达最后一个下标。
 
提示：
1 <= nums.length <= 3 * 104
0 <= nums[i] <= 105
*/

// 将问题转化为跳跃覆盖范围究竟可不可以覆盖到终点
// 局部最优解：每次取最大跳跃步数（取最大覆盖范围）
// 整体最优解：最后得到整体最大覆盖范围，看是否能到终点。
function canJump(nums: number[]): boolean {
  let maxCover = 0

  for (let i = 0; i <= maxCover; i++) {
    maxCover = Math.max(maxCover, i + nums[i])
    if (maxCover >= nums.length - 1) return true
  }

  return false
};

canJump([3,0,0,0])