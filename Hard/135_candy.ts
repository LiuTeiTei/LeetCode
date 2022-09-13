/* 
https://leetcode.com/problems/candy/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0135.%E5%88%86%E5%8F%91%E7%B3%96%E6%9E%9C.md

n 个孩子站成一排。给你一个整数数组 ratings 表示每个孩子的评分。
你需要按照以下要求，给这些孩子分发糖果：
每个孩子至少分配到 1 个糖果。
相邻两个孩子评分更高的孩子会获得更多的糖果。
请你给每个孩子分发糖果，计算并返回需要准备的 最少糖果数目 。

示例 1：
输入：ratings = [1,0,2]
输出：5
解释：你可以分别给第一个、第二个、第三个孩子分发 2、1、2 颗糖果。

示例 2：
输入：ratings = [1,2,2]
输出：4
解释：你可以分别给第一个、第二个、第三个孩子分发 1、2、1 颗糖果。
     第三个孩子只得到 1 颗糖果，这满足题面中的两个条件。
 

提示：
n == ratings.length
1 <= n <= 2 * 104
0 <= ratings[i] <= 2 * 104
*/

function candy(ratings: number[]): number {
  const candyArr = new Array(ratings.length).fill(1)
     
  // 从左到右遍历，只比较右边孩子评分比左边大的情况
  for (let i = 1; i < ratings.length; i++) {
    if (ratings[i] > ratings[i - 1]) {
      candyArr[i] = candyArr[i - 1] + 1
    }
  }

  // 从右到左遍历，只比较左边孩子评分比右边大的情况
  for (let j = ratings.length - 2; j >= 0; j--) {
    if (ratings[j] > ratings[j + 1]) {
      candyArr[j] = Math.max(candyArr[j], candyArr[j + 1] + 1)
    }
  }
  
  return candyArr.reduce((prev, curr) => prev + curr, 0)
};