/* 
https://leetcode.com/problems/relative-ranks/

给出 N 名运动员的成绩，找出他们的相对名次并授予前三名对应的奖牌。前三名运动员将会被分别授予 “金牌”，“银牌” 和“ 铜牌”（"Gold Medal", "Silver Medal", "Bronze Medal"）。

(注：分数越高的选手，排名越靠前。)

示例 1:

输入: [5, 4, 3, 2, 1]
输出: ["Gold Medal", "Silver Medal", "Bronze Medal", "4", "5"]
解释: 前三名运动员的成绩为前三高的，因此将会分别被授予 “金牌”，“银牌”和“铜牌” ("Gold Medal", "Silver Medal" and "Bronze Medal").
余下的两名运动员，我们只需要通过他们的成绩计算将其相对名次即可。

示例 2:

输入: [10,3,8,9,4]
输出: ["Gold Medal","5","Bronze Medal","Silver Medal","4"]

提示:
N 是一个正整数并且不会超过 10000。
所有运动员的成绩都不相同。

*/

/**
 * @param {number[]} score
 * @return {string[]}
 */

//  先排序，后遍历，耗时长，O(n^2) > 200ms
{

    let findRelativeRanks = function(score) {
        if(!score.length) return
    
        const sortableScore = score.slice().sort((a, b) => b - a)
    
        const result = []
        score.forEach(item => {
            let rank = sortableScore.indexOf(item)
            if (rank === 0) {
                rank = "Gold Medal"
            } else if (rank === 1) {
                rank = "Silver Medal"
            } else if (rank === 2) {
                rank = "Bronze Medal"
            } else {
                rank = String(rank + 1)
            }
            result.push(rank)
        })
    
        return result
    }

    // console.log(findRelativeRanks([3, 4, 7, 1]))
}


// 同时遍历和排序，耗时长，O(2n^2) > 200ms
{

    let findRelativeRanks = function(score) {
        if(!score.length) return
    
        let result = Array(score.length).fill(-1)
        for(let i = score.length; i > 0; i--) {
            let max = Math.max(...score)
            let index = score.indexOf(max)
            score[index] = -1
    
            if (i === score.length) {
                result[index] = "Gold Medal"
            } else if (i === score.length - 1) {
                result[index] = "Silver Medal"
            } else if (i === score.length - 2) {
                result[index] = "Bronze Medal"
            } else {
                result[index] = String(score.length - i)
            }
        }
    
        return result
    }
    
    // console.log(findRelativeRanks([3, 4, 7, 1]))
    
}


//  创建 map，然后排序，最后遍历 map，节省一半时间，O(n) < 100ms
{

    let findRelativeRanks = function(score) {
        if(!score.length) return

        const mapScore = new Map()
        score.forEach((item, index) => mapScore.set(item, index))

        const sortableScore = score.slice().sort((a, b) => b - a)

        sortableScore.forEach((item, index) => {
            if (index === 0) {
                mapScore.set(item, "Gold Medal")
            } else if (index === 1) {
                mapScore.set(item, "Silver Medal")
            } else if (index === 2) {
                mapScore.set(item, "Bronze Medal")
            } else {
                mapScore.set(item, String(index + 1))
            }
        })

        return [...mapScore.values()]
    }

    console.log(findRelativeRanks([10,3,8,9,4]))
}
