/* 
https://leetcode.com/problems/jump-game-ii/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0045.%E8%B7%B3%E8%B7%83%E6%B8%B8%E6%88%8FII.md

给你一个非负整数数组 nums ，你最初位于数组的第一个位置。
数组中的每个元素代表你在该位置可以跳跃的最大长度。
你的目标是使用最少的跳跃次数到达数组的最后一个位置。
假设你总是可以到达数组的最后一个位置。

示例 1:
输入: nums = [2,3,1,1,4]
输出: 2
解释: 跳到最后一个位置的最小跳跃数是 2。
     从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。

示例 2:
输入: nums = [2,3,0,1,4]
输出: 2
 

提示:
1 <= nums.length <= 104
0 <= nums[i] <= 1000
*/

// 动态规划
// dp[i] 表示到达 nums[i] 的最小跳跃次数
// dp[i] --> min(前 j 步可以跳到的话，dp[j] + 1)
// 时间复杂度：O(n!)，空间复杂度：O(n)
function jump(nums: number[]): number {
  const dp: number[] = nums.map((_, index) => index)

  for (let i = 1; i < nums.length; i++) {
      for (let j = i - 1; j >= 0; j--) {
          if (nums[j] >= i - j) {
              dp[i] = Math.min(dp[j] + 1, dp[i])
          }
      }
  }

  return dp[nums.length - 1]
};

// 贪心算法
// 局部最优：当前可移动距离尽可能多走，如果还没到终点，步数再加一。
// 整体最优：一步尽可能多走，从而达到最小步数
// 时间复杂度：O(n)，空间复杂度：O(1)
function jump(nums: number[]): number {
  let result = 0
  // 当前覆盖的最远距离下标
  let curDistance = 0
  // 下一步覆盖的最远距离下标
  let nextDistance = 0

  // 注意终止条件是倒数第二个元素
  for (let i = 0; i < nums.length - 1; i++) {
    nextDistance = Math.max(nums[i] + i, nextDistance)
    // 走完当前覆盖的最远距离下标，再往前走一步
    if (i === curDistance) {
      curDistance = nextDistance
      result++
    }
  }

  return result
};