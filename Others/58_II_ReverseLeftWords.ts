/* 
https://leetcode-cn.com/problems/zuo-xuan-zhuan-zi-fu-chuan-lcof/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/%E5%89%91%E6%8C%87Offer58-II.%E5%B7%A6%E6%97%8B%E8%BD%AC%E5%AD%97%E7%AC%A6%E4%B8%B2.md

字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。
请定义一个函数实现字符串左旋转操作的功能。
比如，输入字符串"abcdefg"和数字2，该函数将返回左旋转两位得到的结果"cdefgab"。

示例 1：
输入: s = "abcdefg", k = 2
输出: "cdefgab"

示例 2：
输入: s = "lrloseumgh", k = 6
输出: "umghlrlose"

限制：
1 <= k < s.length <= 10000

进阶：
不能申请额外空间，只能在本串上操作
*/

// 额外使用两个 string 拼接
// 执行用时：84 ms, 在所有 TypeScript 提交中击败了16.00%的用户
// 内存消耗：44 MB, 在所有 TypeScript 提交中击败了39.11%的用户
{
  // function reverseLeftWords(s: string, n: number): string {
  //   const str1 = s.slice(0, n)
  //   const str2 = s.slice(n)
  //   return str2.concat(str1)
  // };
}

// 不使用额外空间，只在本串上操作
// 反转区间为前n的子串；反转区间为n到末尾的子串；反转整个字符串
// 执行用时：68 ms, 在所有 TypeScript 提交中击败了67.56%的用户
// 内存消耗：45.5 MB, 在所有 TypeScript 提交中击败了19.12%的用户
function reverseLeftWords(s: string, n: number): string {
  const reverse = (sArr: string[], start: number = 0, end: number = sArr.length) => {
    while (start < end) {
      const temp = sArr[start]
      sArr[start] = sArr[end]
      sArr[end] = temp

      start++
      end--
    }
  }

  const sArr = s.split('')
  reverse(sArr, 0, n - 1)
  reverse(sArr, n, s.length - 1)
  reverse(sArr)

  return sArr.join('')
};

console.log(reverseLeftWords('abcdefg', 2))
