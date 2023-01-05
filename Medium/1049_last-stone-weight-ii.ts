/* 
https://leetcode.com/problems/last-stone-weight-ii/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/1049.%E6%9C%80%E5%90%8E%E4%B8%80%E5%9D%97%E7%9F%B3%E5%A4%B4%E7%9A%84%E9%87%8D%E9%87%8FII.md

有一堆石头，用整数数组 stones 表示。其中 stones[i] 表示第 i 块石头的重量。
每一回合，从中选出任意两块石头，然后将它们一起粉碎。
假设石头的重量分别为 x 和 y，且 x <= y。
那么粉碎的可能结果如下：
如果 x == y，那么两块石头都会被完全粉碎；
如果 x != y，那么重量为 x 的石头将会完全粉碎，而重量为 y 的石头新重量为 y-x。
最后，最多只会剩下一块 石头。
返回此石头 最小的可能重量 。如果没有石头剩下，就返回 0。

示例 1：
输入：stones = [2,7,4,1,8,1]
输出：1
解释：
组合 2 和 4，得到 2，所以数组转化为 [2,7,1,8,1]，
组合 7 和 8，得到 1，所以数组转化为 [2,1,1,1]，
组合 2 和 1，得到 1，所以数组转化为 [1,1,1]，
组合 1 和 1，得到 0，所以数组转化为 [1]，这就是最优值。

示例 2：
输入：stones = [31,26,33,21,40]
输出：5
 
提示：
1 <= stones.length <= 30
1 <= stones[i] <= 100
*/

// 让石头尽量分成重量相同的两堆，相撞之后剩下的石头最小 =》转换成 416 题型 =》转换成 01背包 问题
function lastStoneWeightII(stones: number[]): number {
  const sum = stones.reduce((prev, curr) => prev + curr, 0)
  const target = Math.floor(sum / 2)

  // dp[j] 表示重量为 j 的背包，所背的石头的最大重量为 dp[j]
  const dp: number[] = Array(target + 1).fill(0)

  // 初始化 dp 数组
  for (let j = stones[0]; j <= target; j++) {
    dp[j] = stones[0]
  }

  // 遍历 dp 数组
  for (let i = 1; i < stones.length; i++) {
    for (let j = target; j >= stones[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - stones[i]] + stones[i])
    }
  }

  return sum - dp[target] * 2
};