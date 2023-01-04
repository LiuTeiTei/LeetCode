/* 
https://leetcode.com/problems/partition-equal-subset-sum/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0416.%E5%88%86%E5%89%B2%E7%AD%89%E5%92%8C%E5%AD%90%E9%9B%86.md

给你一个 只包含正整数 的 非空 数组 nums 。
请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。

示例 1：
输入：nums = [1,5,11,5]
输出：true
解释：数组可以分割成 [1, 5, 5] 和 [11] 。

示例 2：
输入：nums = [1,2,3,5]
输出：false
解释：数组不能分割成两个元素和相等的子集。
 
提示：
1 <= nums.length <= 200
1 <= nums[i] <= 100
*/

// 双指针法，不行，因为双指针讲究顺序，类似于 [2,2,1,1] 会失效。
/* {
  function canPartition(nums: number[]): boolean {
    const getSum = (nums: number[]) => {
      return nums.reduce((prev, curr) => prev + curr, 0)
    }
  
    nums.sort((a, b) => a - b)
    
    const sum = getSum(nums) / 2
    let leftP = 0
    let rightP = nums.length - 1
  
    while(leftP < rightP) {
      const midP = Math.floor((leftP + rightP) / 2)
      const midSum = getSum(nums.slice(0, midP + 1))
      if (midSum === sum) {
        return true
      } else if (midSum < sum) {
        leftP = midP + 1
      } else {
        rightP = midP
      }
    }
  
    return false
  };
} */

// 转换成 01背包 问题，二维数组
// 时间复杂度：O(n^2), 空间复杂度：O(n^2)
{
  function canPartition(nums: number[]): boolean {
    const sum = nums.reduce((prev, curr) => prev + curr, 0)
    if (sum % 2 === 1) return false
  
    const target = sum / 2
  
    // dp[i][j] 表示从下标为 [0-i] 的物品里任意取，放进容量为 j 的背包，价值总和最大是多少
    const dp: number[][] = new Array(nums.length).fill(0).map(() => new Array(target + 1).fill(0))
  
    // 初始化 dp 数组
    for (let j = nums[0]; j <= target; j++) {
      dp[0][j] = nums[0]
    }
  
    // 遍历 dp 数组
    for (let i = 1; i < nums.length; i++) {
      for (let j = 1; j <= target; j++) {
        dp[i][j] = j - nums[i] >= 0 ? Math.max(dp[i - 1][j], dp[i - 1][j - nums[i]] + nums[i]) : dp[i - 1][j]
      }
    }
  
    return dp[nums.length - 1][target] === target
  };
}

// 转换成 01背包 问题，一维数组
// 时间复杂度：O(n^2), 空间复杂度：O(n)
function canPartition(nums: number[]): boolean {
  const sum = nums.reduce((prev, curr) => prev + curr, 0)
  if (sum % 2 === 1) return false

  const target = sum / 2

  // dp[j] 表示容量为 j 的背包，所背的物品价值可以最大为 dp[j]
  const dp: number[] = new Array(target + 1).fill(0)

  // 初始化 dp 数组
  for (let j = nums[0]; j <= target; j++) {
    dp[j] = nums[0]
  }

  // 遍历 dp 数组
  for (let i = 1; i < nums.length; i++) {
    /* 
    一定要是倒序遍历，正序遍历可能会出现物品 i 被重复加入背包多次，
    二维：Math.max (dp[i - 1][j], dp[i - 1][j - nums[i]] + nums[i]) 中降到一维的时候，
    需要保证 dp[i - 1][*] --> dp[j - nums[i]] 对应的值是 i-1 时的值，
    如果是正序遍历就被当前 i 的值覆盖了，
    例如 [1,2,5] 这个例子。
    */
    for (let j = target; j >= nums[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - nums[i]] + nums[i])
    }
  }

  return dp[target] === target
};

const test0 = canPartition([1,2,5])
const test1 = canPartition([1,5,11,5])
const test2 = canPartition([2,2,1,1])
const test3 = canPartition([1,2,3,5])
console.log(test0, test1, test2, test3)