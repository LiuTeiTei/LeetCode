/* 
https://leetcode.com/problems/reverse-string-ii/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0541.%E5%8F%8D%E8%BD%AC%E5%AD%97%E7%AC%A6%E4%B8%B2II.md

给定一个字符串 s 和一个整数 k，从字符串开头算起，
每计数至 2k 个字符，就反转这 2k 字符中的前 k 个字符。
如果剩余字符少于 k 个，则将剩余字符全部反转。
如果剩余字符小于 2k 但大于或等于 k 个，则反转前 k 个字符，其余字符保持原样。
 
示例 1：
输入：s = "abcdefg", k = 2
输出："bacdfeg"

示例 2：
输入：s = "abcd", k = 2
输出："bacd"
 
提示：
1 <= s.length <= 104
s 仅由小写英文组成
1 <= k <= 104
*/

// 以 2k 为间隔遍历，左右指针进行反转
// 当需要固定规律一段一段去处理字符串的时候，在 for 循环的表达式上处理
// Runtime: 111 ms, faster than 37.50%, Memory Usage: 45.5 MB, less than 75.00%
function reverseStr(s: string, k: number): string {
  const arr = s.split('')

  for (let i = 0; i < arr.length; i += 2 * k) {
    let leftP = i;
    let rightP = i + k - 1 > arr.length ? arr.length - 1 : i + k - 1

    // 反转
    while(rightP > leftP) {
      const temp = arr[rightP]
      arr[rightP] = arr[leftP]
      arr[leftP] = temp

      rightP--
      leftP++
    }
  }

  return arr.join('')
};

console.log(reverseStr('abcdefg', 2))
