/* 
https://leetcode.cn/problems/sort-colors/description/

给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，
原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。
必须在不使用库内置的 sort 函数的情况下解决这个问题。

示例 1：
输入：nums = [2,0,2,1,1,0]
输出：[0,0,1,1,2,2]

示例 2：
输入：nums = [2,0,1]
输出：[0,1,2]

提示：
n == nums.length
1 <= n <= 300
nums[i] 为 0、1 或 2
 
进阶：
你能想出一个仅使用常数空间的一趟扫描算法吗？
 */

/**
 Do not return anything, modify nums in-place instead.
 */
// 单指针
// 时间复杂度: O(n) 空间复杂度: O(1)
function sortColors(nums: number[]): void {
  let index = 0
  // 第一次遍历，将所有的 0 移动到头部
  for (let i = index; i < nums.length; i++) {
      if (nums[i] === 0) {
          const temp = nums[i]
          nums[i] = nums[index]
          nums[index] = temp
          index += 1
      }
  }

  // 第二次遍历，将所有的 1 移动到 0 后
  for (let j = index; j < nums.length; j++) {
      if (nums[j] === 1) {
          const temp = nums[j]
          nums[j] = nums[index]
          nums[index] = temp
          index += 1
      }
  }
};

/**
 Do not return anything, modify nums in-place instead.
 */
// 双指针
// 时间复杂度: O(n) 空间复杂度: O(1)
function sortColors(nums: number[]): void {
  const swap = (a, b) => {
      const temp = nums[a]
      nums[a] = nums[b]
      nums[b] = temp
  }

  let p0 = 0
  let p1 = 0
  for (let i = 0; i < nums.length; i++) {
      if (nums[i] === 0) {
          swap(i, p0)
          // 如果把 1 交换到后面去了，要再换 1
          if (nums[i] === 1) {
              swap(i, p1)
          }
          p0 += 1
          p1 += 1
      } else if (nums[i] === 1) {
          swap(i, p1)
          p1 += 1
      }
  }
};