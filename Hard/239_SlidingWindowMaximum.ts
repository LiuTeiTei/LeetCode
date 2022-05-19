/* 
https://leetcode.com/problems/sliding-window-maximum/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0239.%E6%BB%91%E5%8A%A8%E7%AA%97%E5%8F%A3%E6%9C%80%E5%A4%A7%E5%80%BC.md

给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。
你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。
返回 滑动窗口中的最大值 。

示例 1：
输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
输出：[3,3,5,5,6,7]
解释：
滑动窗口的位置                    最大值
-------------------------       -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7

示例 2：
输入：nums = [1], k = 1
输出：[1]

进阶：
你能在线性时间复杂度内解决此题吗？
 
提示：
1 <= nums.length <= 105
-104 <= nums[i] <= 104
1 <= k <= nums.length
*/

// 暴力解法，每次都循环得到 k 数组中最大值
// Time Limit Exceeded
// 时间复杂度 O(k^n)
{
  function maxSlidingWindow(nums: number[], k: number): number[] {
    const getMax = (nums: number[]) => {
      return nums.slice().sort((a, b) => a - b).pop()!
    }
  
    const target = nums.slice(0, k)
    const result = [getMax(target)]
  
    for (let i = k; i < nums.length; i++) {
      target.push(nums[i])
      target.shift()
      result.push(getMax(target))
    }
  
    return result
  };
}

// 额外维护一个单调递减的队列
// 时间复杂度 O(n)，空间复杂度 O(k)
function maxSlidingWindow(nums: number[], k: number): number[] {
  class MonoQueue {
    private queue: number[] = []

    constructor() {
      this.queue = []
    }

    // 入队：value 如果大于队尾元素，则将队尾元素删除，直至队尾元素大于value，或者队列为空。
    inQueue(value: number) {
      if (this.queue.length < 1) {
        this.queue.push(value)
      } else {
        while(this.queue.length > -1 && value > this.queue[this.queue.length - 1]) {
          this.queue.pop()
        }
        this.queue.push(value)
      }
    }

    // 出队：只有当队头元素等于value，才出队。
    outQueue(value: number) {
      if (this.top() === value) {
        this.queue.shift()
      }
    }

    top() {
      return this.queue[0]
    }
  }

  const queue = new MonoQueue()
  for (let i = 0; i < k; i++) {
    queue.inQueue(nums[i])
  }
  const result = [queue.top()]
  for (let j = k; j < nums.length; j++) {
    queue.outQueue(nums[j - k ])
    queue.inQueue(nums[j])
    result.push(queue.top())
  }

  return result
};

console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3)) // [3,3,5,5,6,7]
console.log(maxSlidingWindow([1], 1)) // [1]
