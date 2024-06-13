/* 
https://leetcode.cn/problems/word-search/description/

给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。
如果 word 存在于网格中，返回 true ；否则，返回 false 。
单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。
同一个单元格内的字母不允许被重复使用。

示例 1：
输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
输出：true

示例 2：
输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
输出：true

示例 3：
输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
输出：false
 
提示：
m == board.length
n = board[i].length
1 <= m, n <= 6
1 <= word.length <= 15
board 和 word 仅由大小写英文字母组成
 
进阶：你可以使用搜索剪枝的技术来优化解决方案，使其在 board 更大的情况下可以更快解决问题？
*/

// 回溯算法
// 时间复杂度: O(m * n * 3^w) 空间复杂度: O(1)
function exist(board: string[][], word: string): boolean {
  const m = board.length
  const n = board[0].length
  const w = word.length

  const backtracking = (mIndex: number, nIndex: number, wIndex: number) => {
      // 防止索引越界
      if (mIndex < 0 || mIndex >= m || nIndex < 0 || nIndex >= n) return false
      // 当前元素 !== 指定字符
      if (board[mIndex][nIndex] !== word[wIndex]) return false
      // 找到结果
      if (wIndex === w - 1) return true

      // 当前字母匹配后，将当前位置置空，避免之后被重复使用
      board[mIndex][nIndex] = ''

      // 向上下左右寻找下一个字母
      const hasNext = 
          backtracking(mIndex - 1, nIndex, wIndex + 1) ||
          backtracking(mIndex + 1, nIndex, wIndex + 1) ||
          backtracking(mIndex, nIndex - 1, wIndex + 1) ||
          backtracking(mIndex, nIndex + 1, wIndex + 1)
      
      // 还原
      board[mIndex][nIndex] = word[wIndex]

      return hasNext
  }

  // 遍历矩阵
  for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
          if (backtracking(i, j, 0)) return true
      }
  }

  return false
};
