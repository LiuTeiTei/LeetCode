/* 
https://leetcode.com/problems/happy-number/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0202.%E5%BF%AB%E4%B9%90%E6%95%B0.md

编写一个算法来判断一个数 n 是不是快乐数。

「快乐数」 定义为：
对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。
然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。
如果这个过程 结果为 1，那么这个数就是快乐数。
如果 n 是 快乐数 就返回 true ；不是，则返回 false 。

示例 1：
输入：n = 19
输出：true
解释：
12 + 92 = 82
82 + 22 = 68
62 + 82 = 100
12 + 02 + 02 = 1

示例 2：
输入：n = 2
输出：false
提示：

1 <= n <= 231 - 1
*/

// 利用一个 Set 来记录出现过的数字
// Runtime: 68 ms, faster than 97.24% of, Memory Usage: 45.3 MB, less than 36.41% 
function isHappy(n: number): boolean {
  const numberHash: Set<number> = new Set()
  let prevNumber = n

  while (prevNumber !== 1) {
    // 判断上次的计算结果是否已存在，已存在表示无限循环
    if (numberHash.has(prevNumber)) return false

    // 存下上次的计算结果
    numberHash.add(prevNumber)

    // 不断取模计算平方
    let tempNumber = prevNumber
    let currNumber = 0
    while (tempNumber) {
      currNumber = currNumber + Math.pow(tempNumber % 10, 2)
      tempNumber = Math.floor(tempNumber / 10)
    }

    // 重新赋值，进入下次循环
    prevNumber = currNumber
  }

  return true
};

console.log(isHappy(19))
