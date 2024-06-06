/* 
https://leetcode.cn/problems/daily-temperatures/description/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0739.%E6%AF%8F%E6%97%A5%E6%B8%A9%E5%BA%A6.md

给定一个整数数组 temperatures ，表示每天的温度，返回一个数组 answer ，
其中 answer[i] 是指对于第 i 天，下一个更高温度出现在几天后。
如果气温在这之后都不会升高，请在该位置用 0 来代替。

示例 1:
输入: temperatures = [73,74,75,71,69,72,76,73]
输出: [1,1,4,2,1,1,0,0]

示例 2:
输入: temperatures = [30,40,50,60]
输出: [1,1,1,0]

示例 3:
输入: temperatures = [30,60,90]
输出: [1,1,0]
 
提示：
1 <= temperatures.length <= 105
30 <= temperatures[i] <= 100
*/

// 栈
// 维持一个 index 栈，比栈头大就压入，否则就弹出，值为 index 差
// 时间复杂度: O(n) 空间复杂度: O(n)
function dailyTemperatures(temperatures: number[]): number[] {
  const stack: number[] = []
  const result: number[] = []

  for(let i = 0; i < temperatures.length; i++) {
      while(temperatures[i] > temperatures[stack[stack.length - 1]]) {
          const index = stack.pop()
          result[index] = i - index
      }
      stack.push(i)
  }

  // stack 最终剩下的值都是没有更高温度的
  while(stack.length) {
      result[stack.pop()] = 0
  }

  return result
};
