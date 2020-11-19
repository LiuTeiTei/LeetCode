/* 
https://leetcode-cn.com/problems/di-string-match/

给定只含 "I"（增大）或 "D"（减小）的字符串 S ，令 N = S.length。
返回 [0, 1, ..., N] 的任意排列 A 使得对于所有 i = 0, ..., N-1，都有：
如果 S[i] == "I"，那么 A[i] < A[i+1]
如果 S[i] == "D"，那么 A[i] > A[i+1]
 
示例 1：
输入："IDID"
输出：[0,4,1,3,2]

示例 2：
输入："III"
输出：[0,1,2,3]

示例 3：
输入："DDI"
输出：[3,2,0,1]
*/

/**
 * @param {string} S
 * @return {number[]}
 */
var diStringMatch = function(S) {
    const N = S.length
    let strArr = S.split('')
    let arr = Array.from(Array(N + 1)).map((_, index) => index)
    let result = []
    for (let i = 0; i < N; i++) {
        if (strArr[i] === 'I') {
            result.push(arr[0])
            arr.shift()
        } else {
            result.push(arr[arr.length - 1])
            arr.pop()
        }
    }
    result.push(arr[0])
    return result
};

console.log(diStringMatch('IIID'))