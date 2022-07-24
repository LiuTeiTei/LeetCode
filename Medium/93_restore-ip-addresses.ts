/* 
https://leetcode.com/problems/restore-ip-addresses/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0093.%E5%A4%8D%E5%8E%9FIP%E5%9C%B0%E5%9D%80.md

有效 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔。
例如："0.1.2.201" 和 "192.168.1.1" 是 有效 IP 地址，
但是 "0.011.255.245"、"192.168.1.312" 和 "192.168@1.1" 是 无效 IP 地址。
给定一个只包含数字的字符串 s ，用以表示一个 IP 地址，
返回所有可能的有效 IP 地址，这些地址可以通过在 s 中插入 '.' 来形成。
你 不能 重新排序或删除 s 中的任何数字。你可以按 任何 顺序返回答案。

示例 1：
输入：s = "25525511135"
输出：["255.255.11.135","255.255.111.35"]

示例 2：
输入：s = "0000"
输出：["0.0.0.0"]

示例 3：
输入：s = "101023"
输出：["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]
 

提示：
1 <= s.length <= 20
s 仅由数字组成
*/

function restoreIpAddresses(s: string): string[] {
  const result: string[] = []
  const path: string[] = []

  const isValidateIP = (value: string): boolean => {
    return value.length === 1 || (value[0] !== '0' && Number(value) <= 255)
  }

  const backtracking = (index: number) => {
    if (path.length === 4) {
      if (index === s.length) {
        result.push(path.join('.'))
      }
      return
    }

    // 因为每一段 IP 最长只能是三位数，超过做剪枝
    for (let i = index; i < s.length && i - index <= 3; i++) {
      const str = s.slice(index, i + 1)
      if (!isValidateIP(str)) {
        continue
      }

      path.push(str)
      backtracking(i + 1)
      path.pop()
    }
  }

  backtracking(0)
  return result
};

console.log(restoreIpAddresses('25525511135'))