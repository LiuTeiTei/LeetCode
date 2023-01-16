/* 
https://leetcode.com/problems/combination-sum-iv/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0377.%E7%BB%84%E5%90%88%E6%80%BB%E5%92%8C%E2%85%A3.md

给你一个由 不同 整数组成的数组 nums ，
和一个目标整数 target 。
请你从 nums 中找出并返回总和为 target 的元素组合的个数。
题目数据保证答案符合 32 位整数范围。

示例 1：
输入：nums = [1,2,3], target = 4
输出：7
解释：
所有可能的组合为：
(1, 1, 1, 1)
(1, 1, 2)
(1, 2, 1)
(1, 3)
(2, 1, 1)
(2, 2)
(3, 1)
请注意，顺序不同的序列被视作不同的组合。

示例 2：
输入：nums = [9], target = 3
输出：0
 
提示：
1 <= nums.length <= 200
1 <= nums[i] <= 1000
nums 中的所有元素 互不相同
1 <= target <= 1000
 
进阶：如果给定的数组中含有负数会发生什么？问题会产生何种变化？如果允许负数出现，需要向题目中添加哪些限制条件？
*/

function combinationSum4(nums: number[], target: number): number {
  // dp[i]: 凑成目标正整数为i的排列个数为dp[i]
  const dp: number[] = Array(target + 1).fill(0)
 
  // 初始化
  dp[0] = 1

  // 因为求的是排列数，因此先遍历背包，再遍历物品
  for (let j = 1; j < target + 1; j++) {
    for (let i = 0; i < nums.length; i++) {
      if (j >= nums[i]) {
        dp[j] = dp[j] + dp[j - nums[i]]
      }
    }
  }

  return dp[target]
};