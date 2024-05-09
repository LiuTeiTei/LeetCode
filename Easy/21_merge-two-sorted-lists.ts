/* 
https://leetcode.cn/problems/merge-two-sorted-lists/description/

将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

示例 1：
输入：l1 = [1,2,4], l2 = [1,3,4]
输出：[1,1,2,3,4,4]

示例 2：
输入：l1 = [], l2 = []
输出：[]

示例 3：
输入：l1 = [], l2 = [0]
输出：[0]

提示：
两个链表的节点数目范围是 [0, 50]
-100 <= Node.val <= 100
l1 和 l2 均按 非递减顺序 排列
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

// 双指针
// 时间复杂度 O(m + n)，空间复杂度 O(1)
function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
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
};
