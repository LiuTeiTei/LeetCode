/* 
https://leetcode-cn.com/problems/kth-largest-element-in-a-stream/

设计一个找到数据流中第 k 大元素的类（class）。注意是排序后的第 k 大元素，不是第 k 个不同的元素。
请实现 KthLargest 类：
KthLargest(int k, int[] nums) 使用整数 k 和整数流 nums 初始化对象。
int add(int val) 返回当前数据流中第 k 大的元素。
 
示例：
输入：
["KthLargest", "add", "add", "add", "add", "add"]
[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
输出：
[null, 4, 5, 5, 8, 8]

解释：
KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
kthLargest.add(3);   // return 4
kthLargest.add(5);   // return 5
kthLargest.add(10);  // return 5
kthLargest.add(9);   // return 8
kthLargest.add(4);   // return 8
*/


/**
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function(k, nums) {
    this.index = k - 1
    this.nums = nums.sort((a, b) => b - a)
};

/** 
 * @param {number} val
 * @return {number}
 */

// 最笨的方法，每添加一次值就进行一次排序
{
    // KthLargest.prototype.add = function(val) {
    //     this.nums.push(val)
    //     this.nums.sort((a, b) => b - a)
    //     return this.nums[this.index]
    // }
}

// 遍历排序，找到 val 合适的位置就停止遍历
{
    // KthLargest.prototype.add = function(val) {
    //     // 特殊情况： this.nums === []
    //     if (this.nums.length < 1) {
    //         this.nums.push(val)
    //         return val
    //     }
    //     for (let i = 0; i < this.nums.length; i++) {
    //         if (this.nums[i] <= val) {
    //             this.nums.splice(i, 0, val)
    //             break
    //         } else if (i === this.nums.length - 1) {
    //             // 特殊情况 val 最小
    //             this.nums.push(val)
    //         }
    //     }
    //     // 特殊情况 this.index >= this.nums.length - 1 
    //     return this.nums[this.index <= this.nums.length - 1 ? this.index : this.nums.length - 1]
    // }
}

// 简化版
{
    KthLargest.prototype.add = function(val) {
        let insert = this.nums.length
        for (let i = 0; i < this.nums.length; i++){
            if (val > this.nums[i]) {
                insert = i
                break
            }
        }
        this.nums.splice(insert, 0, val)
        return this.nums[this.index]
    }
}

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */

var obj = new KthLargest(2, [0])
console.log(obj.add(-1))
console.log(obj.add(1))
console.log(obj.add(-4))
console.log(obj.add(0))
console.log(obj.add(4))