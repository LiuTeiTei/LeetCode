/* 
https://leetcode.com/problems/intersection-of-two-arrays/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0349.%E4%B8%A4%E4%B8%AA%E6%95%B0%E7%BB%84%E7%9A%84%E4%BA%A4%E9%9B%86.md

给定两个数组 nums1 和 nums2 ，返回 它们的交集 。
输出结果中的每个元素一定是 唯一 的。我们可以 不考虑输出结果的顺序 。

示例 1：
输入：nums1 = [1,2,2,1], nums2 = [2,2]
输出：[2]

示例 2：
输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出：[9,4]
解释：[4,9] 也是可通过的

提示：
1 <= nums1.length, nums2.length <= 1000
0 <= nums1[i], nums2[i] <= 1000
*/

// 一个对象 hash
// 时间复杂度：O(n + m) ；空间复杂度：O(1)
// Runtime: 112 ms, faster than 46.60%, Memory Usage: 45.4 MB, less than 17.48% 
{
  function intersection(nums1: number[], nums2: number[]): number[] {
    const result: Record<string, number> = {}
  
    nums1.forEach(number => {
      result[number] = 1
    })
  
    nums2.forEach(number => {
      if (result[number]) {
        result[number] += 1
      }
    })
  
    return Object.entries(result).filter(item => item[1] > 1).map(item => Number(item[0]))
  };
}

// 优化版，两个 Set 对象，减少 count 统计
// 直接使用 set 不仅占用空间比数组大，而且速度要比数组慢，set 把数值映射到 key 上都要做 hash 计算。
// 时间复杂度：O(n + m) ；空间复杂度：O(2)
// Runtime: 101 ms, faster than 60.19%, Memory Usage: 45 MB, less than 38.84% 
function intersection(nums1: number[], nums2: number[]): number[] {
  const numsSmall = nums1.length > nums2.length ? nums2 : nums1
  const numsLarge = nums1.length > nums2.length ? nums1 : nums2

  const numsSmallSet = new Set(numsSmall)
  const resultSet: Set<number> = new Set()

  numsLarge.forEach(number => {
    numsSmallSet.has(number) && resultSet.add(number)
  })

  return Array.from(resultSet)
};

console.log(intersection([1,2,2,1], [2,2]))
