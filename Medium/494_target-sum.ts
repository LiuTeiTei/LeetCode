/* 
https://leetcode.com/problems/target-sum/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0494.%E7%9B%AE%E6%A0%87%E5%92%8C.md

给你一个整数数组 nums 和一个整数 target 。
向数组中的每个整数前添加 '+' 或 '-' ，
然后串联起所有整数，可以构造一个 表达式 ：
例如，nums = [2, 1] ，可以在 2 之前添加 '+' ，在 1 之前添加 '-' ，
然后串联起来得到表达式 "+2-1" 。
返回可以通过上述方法构造的、运算结果等于 target 的不同 表达式 的数目。

示例 1：
输入：nums = [1,1,1,1,1], target = 3
输出：5
解释：一共有 5 种方法让最终目标和为 3 。
-1 + 1 + 1 + 1 + 1 = 3
+1 - 1 + 1 + 1 + 1 = 3
+1 + 1 - 1 + 1 + 1 = 3
+1 + 1 + 1 - 1 + 1 = 3
+1 + 1 + 1 + 1 - 1 = 3

示例 2：
输入：nums = [1], target = 1
输出：1
 
提示：
1 <= nums.length <= 20
0 <= nums[i] <= 1000
0 <= sum(nums[i]) <= 1000
-1000 <= target <= 1000
*/

function findTargetSumWays(nums: number[], target: number): number {
  const max = nums.reduce((prev, curr) => Math.abs(prev) + Math.abs(curr), 0)
  const len = max * 2 + 1

  if (max < Math.abs(target)) return 0

  // dp[j] 表示填满 j 这么大容积的包，有 dp[j] 种方法
  const dp: number[] = Array(len).fill(0)

  // 初始化 dp 数组
  if (nums[0] === 0) {
    /* 
      此题中 0 分为 +0 和 -0
      例如 findTargetSumWays([0,0,0,0,0,0,0,0,1], 1) 这个例子，答案是 256
      如果不区分 +0 和 -0 答案是 128
    */
    dp[max - nums[0]] = 2
    dp[max + nums[0]] = 2
  } else {
    dp[max - nums[0]] = 1
    dp[max + nums[0]] = 1
  }

  // 遍历 dp 数组
  for (let i = 1; i < nums.length; i++) {
    /* 
      不能简单的正序或者倒序遍历，
      二维是：dp[i - 1][value1 + max] + dp[i - 1][value2 + max])，
      实际上是 dp[i][j] 对应上一行左右角的和，
      无论是正序还是倒序，都会有另一个值被覆盖，
      降为一维时，需要保留 i-1 时的 dp[j] 值。
    */
    const preDp = dp.slice()
    for (let j = 0; j < len; j++) {
      const sum = j - max
      const value1 = sum - nums[i]
      const value2 = sum + nums[i]
      if (value1 >= -max && value2 <= max) {
        dp[j] = preDp[value1 + max] + preDp[value2 + max]
      } else if (value1 < -max) {
        dp[j] = preDp[value2 + max]
      } else if (value2 > max) {
        dp[j] = preDp[value1 + max]
      }
    }
  }

  return dp[Math.abs(target) + max]
};

const test1 = findTargetSumWays([0,0,0,0,0,0,0,0,1], 1)
console.log('%c [ test1 ]-63', 'font-size:13px; background:pink; color:#bf2c9f;', test1)