/* 
https://leetcode.cn/problems/sort-list/description/
给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。

示例 1：
输入：head = [4,2,1,3]
输出：[1,2,3,4]

示例 2：
输入：head = [-1,5,3,4,0]
输出：[-1,0,3,4,5]

示例 3：
输入：head = []
输出：[]
 
提示：
链表中节点的数目在范围 [0, 5 * 104] 内
-105 <= Node.val <= 105
 
进阶：你可以在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序吗？
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

// 归并排序 - 分治
// 时间复杂度: O(nlogn) 空间复杂度: O(n)
function sortList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head

  // 找到当前链表 中点
  let slow = head
  let fast = head.next
  while (fast && fast.next) {
      slow = slow.next
      fast = fast.next.next
  }

  // 从 中点 将链表断开
  const left = head
  const right = slow.next
  slow.next = null
  // 递归
  return merge(sortList(left), sortList(right))
};

// 将两个排序链表合并，转化为一个排序链表
function merge(left: ListNode | null, right: ListNode | null): ListNode | null {
  let curr = new ListNode(0)
  const result = curr
  while (left && right) {
      if (left.val <= right.val) {
          curr.next = left
          left = left.next
      } else {
          curr.next = right
          right = right.next
      }
      curr = curr.next
  }

  curr.next = left ?? right
  return result.next
} 
