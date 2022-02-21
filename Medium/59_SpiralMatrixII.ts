/* 
https://leetcode.com/problems/spiral-matrix-ii/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0059.%E8%9E%BA%E6%97%8B%E7%9F%A9%E9%98%B5II.md

给你一个正整数 n ，生成一个包含 1 到 n2 所有元素，且元素按顺时针顺序螺旋排列的 n x n 正方形矩阵 matrix 。

示例 1：
输入：n = 3
输出：[[1,2,3],[8,9,4],[7,6,5]]

示例 2：
输入：n = 1
输出：[[1]]
 
提示：
1 <= n <= 20
*/

// 要保持循环不变量原则，这里每次的判断条件都是左闭右闭，下次循环开始时进 1。
// Runtime: 97 ms, faster than 58.93%, Memory Usage: 44 MB, less than 25.00%.
function generateMatrix(n: number): number[][] {
  const result: number[][] = []

  // 构造 n*n 举证
  for (let i = 0; i < n; i++) {
    result.push(new Array(n))
  }

  let num = 1
  // time 为旋转次数
  for (let time = 1; time <= Math.ceil(n / 2); time++) {
    // 从左到右
    for (let i = time - 1, j = time - 1; j <= n - time; j++) {
      result[i][j] = num
      num++
    }

    // 从上到下
    for (let i = time, j = n - time; i <= n - time; i++) {
      result[i][j] = num
      num++
    }

    // 从右到左
    for (let i = n - time, j = n - time - 1; j >= time - 1; j--) {
      result[i][j] = num
      num++
    }

    // 从下到上
    for (let i = n - time - 1, j = time - 1; i >= time; i--) {
      result[i][j] = num
      num++
    }
  }
  
  return result
};

console.log(generateMatrix(3))