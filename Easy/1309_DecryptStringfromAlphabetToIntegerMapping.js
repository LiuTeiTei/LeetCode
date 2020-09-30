/* 
给你一个字符串 s，它由数字（'0' - '9'）和 '#' 组成。我们希望按下述规则将 s 映射为一些小写英文字符：
    字符（'a' - 'i'）分别用（'1' - '9'）表示。
    字符（'j' - 'z'）分别用（'10#' - '26#'）表示。 
返回映射之后形成的新字符串。

题目数据保证映射始终唯一。

示例 1：

输入：s = "10#11#12"
输出："jkab"
解释："j" -> "10#" , "k" -> "11#" , "a" -> "1" , "b" -> "2".
*/


// 遍历 s 按照 # 划分
// 时间复杂度是：遍历一遍 s ，遍历 s.length * 26 次 transObj
{
    const transObj = {}
    for (let i = 1, j = 97; i < 10; i++, j++) {
        transObj[i] = String.fromCharCode(j)
    }
    for (let i = 10, j =106; i < 27; i++, j++){
        transObj[`${i}#`] = String.fromCharCode(j)
    }

    let freqAlphabets = function(s) {
        const len = s.length
        if (len < 1 || len >1000) return null
        let arr = []
        for (let i = len - 1; i >= 0; i--) {
            if (s[i] === '#') {
                arr.unshift(transObj[s.slice(i - 2,i + 1)])
                i = i - 2
            } else {
                arr.unshift(transObj[s.slice(i, i + 1)])
            }
        }
        return arr.join('')
    }
}

// 不用建立一个 transObj 表，直接转
// 时间复杂度：O(N)，其中 NN 是字符串 s 的长度。
// 空间复杂度：O(1)。
let freqAlphabets = function(s) {
    const len = s.length
    if (len < 1 || len >1000) return null
    let res = ''
    for (let i = len - 1; i >= 0; i--) {
        if (s[i] === '#') {
            res = String.fromCharCode(Number(s.slice(i - 2, i)) + 96) + res
            i = i - 2
        } else {
            res = String.fromCharCode(Number(s.slice(i, i + 1)) + 96) + res
        }
    }
    return res
}
console.log(freqAlphabets('12345678910#11#12#13#14#15#16#17#18#19#20#21#22#23#24#25#26#')) // abcdefghijklmnopqrstuvwxyz
