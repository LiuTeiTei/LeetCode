/* 
https://leetcode-cn.com/problems/binary-watch/

8 4 2 1
32 16 8 4 2 1
0011 011000
例如，上面的二进制手表读取 “3:25”。
给定一个非负整数 n 代表当前 LED 亮着的数量，返回所有可能的时间。

示例：
输入: n = 1
返回: ["1:00", "2:00", "4:00", "8:00", "0:01", "0:02", "0:04", "0:08", "0:16", "0:32"]
 
提示：
输出的顺序没有要求。
小时不会以零开头，比如 “01:00” 是不允许的，应为 “1:00”。
分钟必须由两位数组成，可能会以零开头，比如 “10:2” 是无效的，应为 “10:02”。
超过表示范围（小时 0-11，分钟 0-59）的数据将会被舍弃，也就是说不会出现 "13:00", "0:61" 等时间。
*/

/**
 * @param {number} num
 * @return {string[]}
 */

 // 回溯算法
var readBinaryWatch = function(num) {
    if(num === 0) return ['0:00']
    const list = [8, 4, 2, 1, 32, 16, 8, 4, 2, 1]
    let res = []
    let count = 0
    dfs(0, 0, 0)

    function dfs(index, hour, min) {
        if (count === num && hour < 12 && min < 60) res.push(`${hour}:${min < 10 ? '0' + min : min}`)
        if (count >= num || hour > 11 | min > 59) return

        // i 是 list 中存在的数值，因此要把 list 遍历到，i < list.length，dfs(i + 1, hour, min)
        // count 用来记录，已经有几种 i 置 1 了
        for (let i = index; i < list.length; i++) {
            const item = list[i]
            i < 4 ? (hour += item) : (min += item)
            count++
            dfs(i + 1, hour, min)
            // 回退
            count--
            i < 4 ? (hour -= item) : (min -= item)
        }
    }

    return res
};

console.log(readBinaryWatch(2)) //（44）
