/* 
https://leetcode-cn.com/problems/day-of-the-week/

给你一个日期，请你设计一个算法来判断它是对应一周中的哪一天。
输入为三个整数：day、month 和 year，分别表示日、月、年。
您返回的结果必须是这几个值中的一个 {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"}。

示例 1：

输入：day = 31, month = 8, year = 2019
输出："Saturday"
*/

const weekObj = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

// 直接使用 Date API
{
    let dayOfTheWeek = function(day, month, year) {
        const date = new Date(year, month - 1, day)
        return weekObj[date.getDay()]
    }
}

// 基姆拉尔森计算公式
// W= (d+2m+3*(m+1)/5+y+y/4-y/100+y/400) mod 7*
// 把一月和二月看成是上一年的十三月和十四
let dayOfTheWeek = (day, month, year) => {
    if (month < 3) {
        month += 12
        year--
    }
    const weekday = (day + 1 + 2 * month + Math.floor(3 * (month + 1) / 5) + year + Math.floor(year / 4) - Math.floor(year / 100) + Math.floor(year / 400)) % 7
    return weekObj[weekday]
}

console.log(dayOfTheWeek(18, 7, 1999)) // 'Sunday'
