/* 
https://leetcode.cn/problems/combinations/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0077.%E7%BB%84%E5%90%88.md

给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
你可以按 任何顺序 返回答案。

示例 1：
输入：n = 4, k = 2
输出：
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]

示例 2：
输入：n = 1, k = 1
输出：[[1]]
 
提示：
1 <= n <= 20
1 <= k <= n
*/

function combine(n: number, k: number): number[][] {
  // 初始化某一次结果
  const path: number[] = []
  // 初始化最终结果
  const result: number[][] = []

  // 定义循环函数，for 循环用来横向遍历（n），递归的过程是纵向遍历（k）
  const getPath = (startIndex: number) => {
    // 定义单次循环的终止条件
    if (path.length === k) {
      result.push(path.slice())
      return
    }

    for (let i = startIndex; i <= n; i++) {
      path.push(i)
      getPath(i + 1)
      path.pop()  // 回溯，撤销处理的节点
    }
  }

  getPath(1)
  return result
};

console.log(combine(3, 2))