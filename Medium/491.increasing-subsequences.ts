/* 
https://leetcode.com/problems/increasing-subsequences/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0491.%E9%80%92%E5%A2%9E%E5%AD%90%E5%BA%8F%E5%88%97.md

给你一个整数数组 nums ，找出并返回所有该数组中不同的递增子序列，
递增子序列中 至少有两个元素 。你可以按 任意顺序 返回答案。
数组中可能含有重复元素，如出现两个整数相等，也可以视作递增序列的一种特殊情况。

示例 1：
输入：nums = [4,6,7,7]
输出：[[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]

示例 2：
输入：nums = [4,4,3,2,1]
输出：[[4,4]]
 
提示：
1 <= nums.length <= 15
-100 <= nums[i] <= 100
*/

function findSubsequences(nums: number[]): number[][] {
  const result: number[][] = []
  const path: number[] = []

  const backtracking = (index: number) => {
    // 取树上的所有节点
    if (path.length >= 2) {
      result.push(path.slice())
    }
    // 可以不加终止条件
    if (index === nums.length) {
      return
    }

    // 同一父节点下的同层上使用过的元素就不能在使用了
    // 因为 nums 是无序数组，且不同排序，无法使用 i > index && nums[i] === nums[i - 1] 判断条件来去重
    // 利用 Set 记录本层元素是否重复使用，新的一层 usedSet 会重新定义，因此无需清空
    const usedSet: Set<number> = new Set()

    for (let i = index; i < nums.length; i++) {
      // 不满足递增时直接返回，无需继续回溯
      if (path.length > 0 && path[path.length - 1] > nums[i]) {
        continue
      }
      
      if (usedSet.has(nums[i])) {
        continue
      }

      usedSet.add(nums[i])
      path.push(nums[i])
      backtracking(i + 1)
      path.pop()
    }
  }

  backtracking(0)
  return result
};

console.log(findSubsequences([4,4,4,4]))