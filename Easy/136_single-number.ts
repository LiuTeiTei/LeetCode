/* 
https://leetcode.cn/problems/single-number/description/

给你一个 非空 整数数组 nums ，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
你必须设计并实现线性时间复杂度的算法来解决此问题，且该算法只使用常量额外空间。

示例 1 ：
输入：nums = [2,2,1]
输出：1

示例 2 ：
输入：nums = [4,1,2,1,2]
输出：4

示例 3 ：
输入：nums = [1]
输出：1
 
提示：
1 <= nums.length <= 3 * 104
-3 * 104 <= nums[i] <= 3 * 104
除了某个元素只出现一次以外，其余每个元素均出现两次。
*/

// 时间复杂度 O(n)，空间复杂度 O(n)
function singleNumber(nums: number[]): number {
  const map = new Map<number, number>()

  for(let i = 0; i < nums.length; i++) {
      if (map.has(nums[i])) {
          map.delete(nums[i])
      } else {
          map.set(nums[i], nums[i])
      }
  }

  return map.keys().next().value
};

// 异或运算: 不带进位的二进制加法
// 1. 归零律：a⊕a=0
// 2. 恒等律：a⊕0=a
// 3. 交换律 & 结合律 -> 自反：a⊕b⊕a=b⊕a⊕a=b⊕(a⊕a)=b⊕0=b
// 时间复杂度 O(n)，空间复杂度 O(1)
function singleNumber(nums: number[]): number {
  let result = 0

  for(let i = 0; i < nums.length; i++) {
      result = result ^ nums[i]
  }

  return result
};
