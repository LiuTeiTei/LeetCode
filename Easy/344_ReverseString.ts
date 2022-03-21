/* 
https://leetcode.com/problems/reverse-string/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0344.%E5%8F%8D%E8%BD%AC%E5%AD%97%E7%AC%A6%E4%B8%B2.md

编写一个函数，其作用是将输入的字符串反转过来。
输入字符串以字符数组 s 的形式给出。
不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。

示例 1：
输入：s = ["h","e","l","l","o"]
输出：["o","l","l","e","h"]

示例 2：
输入：s = ["H","a","n","n","a","h"]
输出：["h","a","n","n","a","H"]
 
提示：
1 <= s.length <= 105
s[i] 都是 ASCII 码表中的可打印字符
*/

/**
 Do not return anything, modify s in-place instead.
 */

// 其实就是双指针，一头一尾交换后，同时向中间移动
// Runtime: 184 ms, faster than 16.01%, Memory Usage: 50.5 MB, less than 27.61%
function reverseString(s: string[]): void {
  for (let i = 0; i < s.length / 2; i++) {
    const index = s.length - 1 - i
    const temp = s[i]

    s[i] = s[index] 
    s[index] = temp
  }
};

const test = ["h","e","l","l","o"]
reverseString(test)
console.log(test)
