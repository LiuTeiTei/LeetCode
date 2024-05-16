/* 
https://leetcode.com/problems/combination-sum-iii/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0216.%E7%BB%84%E5%90%88%E6%80%BB%E5%92%8CIII.md

找出所有相加之和为 n 的 k 个数的组合，且满足下列条件：
只使用数字1到9
每个数字最多使用一次 
返回所有可能的有效组合的列表。
该列表不能包含相同的组合两次，组合可以以任何顺序返回。

示例 1:
输入: k = 3, n = 7
输出: [[1,2,4]]
解释:
1 + 2 + 4 = 7
没有其他符合的组合了。

示例 2:
输入: k = 3, n = 9
输出: [[1,2,6], [1,3,5], [2,3,4]]
解释:
1 + 2 + 6 = 9
1 + 3 + 5 = 9
2 + 3 + 4 = 9
没有其他符合的组合了。

示例 3:
输入: k = 4, n = 1
输出: []
解释: 不存在有效的组合。
在[1,9]范围内使用4个不同的数字，我们可以得到的最小和是 1+2+3+4 = 10，因为 10 > 1，没有有效的组合。
 
提示:
2 <= k <= 9
1 <= n <= 60
*/

// 回溯算法
// 时间复杂度: O(n * 2^n) 空间复杂度: O(n)
function combinationSum3(k: number, n: number): number[][] {
  const backtracking = (index: number, sum: number, path: number[], result: number[][]) => {
      if (sum > n) return
      if (sum === n && path.length === k) {
          result.push(path.slice())
          return
      }
      for (let i = index; i <= 9; i++) {
          // 剪枝优化
          if (sum + i > n || path.length + i - index + 1 >= n) {
              continue
          }
          sum = sum + i
          path.push(i)
          backtracking(i + 1, sum, path, result)
          sum = sum - i
          path.pop()
      }
  }

  const result:number[][] = []
  backtracking(1, 0, [], result)
  return result
};
