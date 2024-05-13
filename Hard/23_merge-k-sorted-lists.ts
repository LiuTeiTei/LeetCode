/* 
https://leetcode.cn/problems/merge-k-sorted-lists/

给你一个链表数组，每个链表都已经按升序排列。
请你将所有链表合并到一个升序链表中，返回合并后的链表。

示例 1：
输入：lists = [[1,4,5],[1,3,4],[2,6]]
输出：[1,1,2,3,4,4,5,6]
解释：链表数组如下：
[
  1->4->5,
  1->3->4,
  2->6
]
将它们合并到一个有序链表中得到。
1->1->2->3->4->4->5->6

示例 2：
输入：lists = []
输出：[]

示例 3：
输入：lists = [[]]
输出：[]
 
提示：
k == lists.length
0 <= k <= 10^4
0 <= lists[i].length <= 500
-10^4 <= lists[i][j] <= 10^4
lists[i] 按 升序 排列
lists[i].length 的总和不超过 10^4
*/

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

// https://leetcode.cn/problems/merge-two-sorted-lists/
function mergeTewLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  const result: ListNode = new ListNode(0, undefined)
  let resultCurr = result
  let list1Curr = list1
  let list2Curr = list2

  while(list1Curr && list2Curr) {
      if (list1Curr?.val <= list2Curr?.val) {
          resultCurr.next = list1Curr
          resultCurr = resultCurr.next
          list1Curr = list1Curr.next
      } else {
          resultCurr.next = list2Curr
          resultCurr = resultCurr.next
          list2Curr = list2Curr.next
      }
  }

  // 合并后 list1Curr 和 list2Curr 最多只有一个还未被合并完，直接加上
  resultCurr.next = list1Curr ?? list2Curr
  return result.next
}

// 顺序合并: 第 i 次循环把第 i 个链表和 result 合并
// 时间复杂度 O(m^2 * n)，空间复杂度 O(1)，其中 m 是 lists 的长度，n 是每个链表的最长长度。
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  let result: ListNode = null

  for(let i = 0; i < lists.length; i++) {
      result = mergeTewLists(result, lists[i])
  }

  return result
};

// 分治合并: 两两合并
// 时间复杂度 O(mn * logm)，空间复杂度 O(logm)，其中 m 是 lists 的长度，n 是每个链表的最长长度。
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  const backTarcking = (left: number, right: number) => {
      if (left === right) return lists[left]
      // 排除 lists 为 [],[[]] 的边界 case
      if (left > right) return null
      const mid = Math.floor((left + right) / 2)
      return mergeTewLists(backTarcking(left, mid), backTarcking(mid + 1, right))
  }

  return backTarcking(0, lists.length - 1)
};

// 优先队列合并: 维护当前每个链表没有被合并的元素的最前面一个，每次合并最小的元素。
// 时间复杂度 O(mn * logm)，空间复杂度 O(m)，其中 m 是 lists 的长度，n 是每个链表的最长长度。
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  // TODO
};
