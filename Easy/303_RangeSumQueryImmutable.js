/* 
https://leetcode-cn.com/problems/range-sum-query-immutable/

给定一个整数数组 nums，求出数组从索引 i 到 j（i ≤ j）范围内元素的总和，包含 i、j 两点。
实现 NumArray 类：
NumArray(int[] nums) 使用数组 nums 初始化对象
int sumRange(int i, int j) 返回数组 nums 从索引 i 到 j（i ≤ j）范围内元素的总和，包含 i、j 两点（也就是 sum(nums[i], nums[i + 1], ... , nums[j])）
 
示例：
输入：
["NumArray", "sumRange", "sumRange", "sumRange"]
[[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
输出：
[null, 1, -1, -3]

解释：
NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
numArray.sumRange(0, 2); // return 1 ((-2) + 0 + 3)
numArray.sumRange(2, 5); // return -1 (3 + (-5) + 2 + (-1)) 
numArray.sumRange(0, 5); // return -3 ((-2) + 0 + 3 + (-5) + 2 + (-1))

提示：
0 <= nums.length <= 104
-105 <= nums[i] <= 105
0 <= i <= j < nums.length
最多调用 104 次 sumRange 方法
*/


// 暴力解法
// 每次调用 sumRange 时，我们都使用for循环将索引 i 到 j 之间的每个元素相加。
// 时间复杂度：每次查询的时间 O(n)，每个 sumRange 查询需要 O(n) 时间
// 空间复杂度：O(1)
{
    let NumArray = function(nums) {
        this.numsArray = nums
    };

    NumArray.prototype.sumRange = function(i, j) {
        if (i > j) return 
        if (i === j) return this.numsArray[i]
        if (j > this.numsArray.length + 1) { 
            j = this.numsArray.length - 1 
        }
        let sum = 0
        for (let key = i; i <= j; i++) {
            sum += this.numsArray[i]
        }
        return sum
    };
}

// 空间缓存
// 假设 sumRange 被调用 1000次，其参数完全相同。我们怎么能加快速度？
// 我们可以用额外的空间换取速度。通过预先计算所有的范围和可能性并将其结果存储在哈希表中，我们可以将查询加速到常量时间。
// 时间复杂度：每次查询的时间 O(1)
// 空间复杂度：O(n^2)
// 当初始值很大时会溢出
{
    let NumArray = function(nums) {
        this.map = new Map()
        for (let i = 0; i < nums.length; i++) {
            let sum = 0
            for (let j = i; j < nums.length; j++) {
                sum += nums[j]
                this.map.set(`${i},${j}`, sum)
            }
        }
    };

    NumArray.prototype.sumRange = function(i, j) {
        return this.map.get(`${i},${j}`)
    }
}

// 等价计算
// sumRange=sum[j+1]−sum[i]
// 时间复杂度：每次查询的时间 O(1)
// 空间复杂度：O(n)
{
    var NumArray = function(nums) {
        this.sumArray = [0]
        let sum = 0
        for (let i = 0; i < nums.length; i++) {
            sum += nums[i]
            this.sumArray.push(sum)
        }
    };

    NumArray.prototype.sumRange = function(i, j) {
        return this.sumArray[j + 1] - this.sumArray[i]
    }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * 
 * @param {number[]} nums
 * var obj = new NumArray(nums)
 * 
 * @param {number} i 
 * @param {number} j
 * @return {number}
 * var param_1 = obj.sumRange(i,j)
 */

const arrNum = new NumArray([-2, 5])
console.log(arrNum.sumRange(0, 1))