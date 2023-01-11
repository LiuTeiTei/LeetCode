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

// 时间复杂度：O(n * len), 空间复杂度：O(len), len = sum * 2 + 1
// dp[j] 表示填满 j 这么大容积的包，有 dp[j] 种方法，j 包含 '+' 和 '-'
{
  function findTargetSumWays(nums: number[], target: number): number {
    const sum = nums.reduce((prev, curr) => prev + curr, 0)
    const len = sum * 2 + 1
  
    if (sum < Math.abs(target)) return 0
  
    const dp: number[] = Array(len).fill(0)
  
    // 初始化 dp 数组
    if (nums[0] === 0) {
      /* 
        此题中 0 分为 +0 和 -0
        例如 findTargetSumWays([0,0,0,0,0,0,0,0,1], 1) 这个例子，答案是 256
        如果不区分 +0 和 -0 答案是 128
      */
      dp[sum - nums[0]] = 2
      dp[sum + nums[0]] = 2
    } else {
      dp[sum - nums[0]] = 1
      dp[sum + nums[0]] = 1
    }
  
    // 遍历 dp 数组
    for (let i = 1; i < nums.length; i++) {
      /* 
        不能简单的正序或者倒序遍历，
        二维是：dp[i - 1][value1 + sum] + dp[i - 1][value2 + sum])，
        实际上是 dp[i][j] 对应上一行左右角的和，
        无论是正序还是倒序，都会有另一个值被覆盖，
        降为一维时，需要保留 i-1 时的 dp[j] 值。
      */
      const preDp = dp.slice()
      for (let j = 0; j < len; j++) {
        const currSum = j - sum
        const value1 = currSum - nums[i]
        const value2 = currSum + nums[i]
        if (value1 >= -sum && value2 <= sum) {
          dp[j] = preDp[value1 + sum] + preDp[value2 + sum]
        } else if (value1 < -sum) {
          dp[j] = preDp[value2 + sum]
        } else if (value2 > sum) {
          dp[j] = preDp[value1 + sum]
        }
      }
    }
  
    return dp[Math.abs(target) + sum]
  };
}

// 简化: 时间复杂度：O(n * len), 空间复杂度：O(len), len = sum + 1
// dp[j] 表示填满 j 这么大容积的包，有 dp[j] 种方法，j 只有 '+'
{
  function findTargetSumWays(nums: number[], target: number): number {
    const sum = nums.reduce((prev, curr) => prev + curr, 0)
  
    if (sum < Math.abs(target)) return 0
    if ((sum + target) % 2 === 1) return 0
  
    const dp: number[] = Array(sum + 1).fill(0)
    
    dp[nums[0]] = nums[0] === 0 ? 2 : 1
  
    for (let i = 1; i < nums.length; i++) {
      const preDp = dp.slice()
      for (let j = 0; j <= sum; j++) {
        const value1 = j - nums[i]
        const value2 = j + nums[i]
        if (value1 >= -sum && value2 <= sum) {
          dp[j] = preDp[Math.abs(value1)] + preDp[value2]
        } else if (value1 < -sum) {
          dp[j] = preDp[value2]
        } else if (value2 > sum) {
          dp[j] = preDp[Math.abs(value1)]
        }
      }
    }
    
    return dp[Math.abs(target)]
  };
}

// 终极简化: 时间复杂度：O(n * len), 空间复杂度：O(len), len = (sum + target) / 2 + 1
// dp[j] 表示填满 j 这么大容积的包，有 dp[j] 种方法，j 表示计算后的 target，target = 2 * j - sum，且前面的值是不满足 dp[j] 的定义的。
const findTargetSumWays = (nums, target) => {
  const sum = nums.reduce((prev, curr) => prev + curr, 0)
  const size = (sum + target) / 2

  if (sum < Math.abs(target)) return 0
  if ((sum + target) % 2 === 1) return 0

  const dp: number[] = Array(size + 1).fill(0)
  dp[0] = 1

  for(let i = 0; i < nums.length; i++) {
    for(let j = size; j >= nums[i]; j--) {
      dp[j] = dp[j] + dp[j - nums[i]]
    }
  }

  return dp[size]
};

const test1 = findTargetSumWays([1,1,1,1,1], 3)
const test2 = findTargetSumWays([0,0,0,0,0,0,0,1000], -1000)
const test3 = findTargetSumWays([1000], -1000)

console.log('%c [ test1 ]-63', 'font-size:13px; background:pink; color:#bf2c9f;', test1, test2, test3)