/* 
https://leetcode.cn/problems/kth-largest-element-in-an-array/description/
https://leetcode.cn/problems/kth-largest-element-in-an-array/solutions/307351/shu-zu-zhong-de-di-kge-zui-da-yuan-su-by-leetcod-2/

给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。
请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
你必须设计并实现时间复杂度为 O(n) 的算法解决此问题。

示例 1:
输入: [3,2,1,5,6,4], k = 2
输出: 5

示例 2:
输入: [3,2,3,1,2,4,5,5,6], k = 4
输出: 4
 
提示：
1 <= k <= nums.length <= 105
-104 <= nums[i] <= 104
*/

// 快速排序 - 超时了
// 时间复杂度: O(nlogn) 空间复杂度: O(logn)
function findKthLargest(nums: number[], k: number): number {
  // 交换数组
  const swap = (nums: number[], left: number, right: number) => {
      const temp = nums[left]
      nums[left] = nums[right]
      nums[right] = temp
  }

  // 分区排序：设定基准，有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面
  const partition = (nums: number[], left: number, right: number) => {
      const pivot = left
      let index = pivot + 1
      for (let i = index; i <= right; i++) {
          if (nums[i] < nums[pivot]) {
              swap(nums, i, index)
              index += 1
          }
      }
      swap(nums, pivot, index - 1)
      return index - 1
  }

  let result: number

  // 递归：把小于基准值元素的子数列和大于基准值元素的子数列排序
  const quickSort = (nums: number[], left: number, right: number) => {
      if (left < right) {
          const partitionIndex = partition(nums, left, right)
          quickSort(nums, left, partitionIndex - 1)
          quickSort(nums, partitionIndex + 1, right)

      }
      return nums
  }

  quickSort(nums, 0, nums.length - 1)
  return nums[nums.length - k]
};

// 快速排序 - 简化版
// 时间复杂度: O(n) 空间复杂度: O(logn)
function findKthLargest(nums: number[], k: number): number {
  // 交换数组
  const swap = (nums: number[], left: number, right: number) => {
      const temp = nums[left]
      nums[left] = nums[right]
      nums[right] = temp
  }

  const quickselect = (nums: number[], left: number, right: number, k: number) => {
      if (left === right) return nums[k]

      const partition = nums[left]
      let i = left - 1
      let j = right + 1
      while (i < j) {
          do i += 1
          while (nums[i] < partition)
          do j -= 1
          while (nums[j] > partition)
          if (i < j) swap(nums, i, j)
      }

      if (k <= j) {
          return quickselect(nums, left, j, k)
      } else {
          return quickselect(nums, j + 1, right, k) 
      }
  }

  return quickselect(nums, 0, nums.length - 1, nums.length - k)
};
