/*
https://leetcode.cn/problems/add-two-numbers/description/

给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
请你将两个数相加，并以相同形式返回一个表示和的链表。
你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

示例 1：
输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807.

示例 2：
输入：l1 = [0], l2 = [0]
输出：[0]

示例 3：
输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
输出：[8,9,9,9,0,0,0,1]

提示：
每个链表中的节点数在范围 [1, 100] 内
0 <= Node.val <= 9
题目数据保证列表表示的数字不含前导零
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

// 时间复杂度：O(max⁡(m,n))，其中 m 和 n 分别为两个链表的长度。我们要遍历两个链表的全部位置，而处理每个位置只需要 O(1) 的时间。
// 空间复杂度：O(1)。注意返回值不计入空间复杂度。
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  let value1 = l1.val
  let value2 = l2.val
  let carry = (value1 + value2) > 9 ? 1 : 0
  
  const result = new ListNode((value1 + value2) % 10)

  let currentResult = result
  let currentL1 = l1.next
  let currentL2 = l2.next

  while(currentL1 !== null || currentL2 !== null) {
      value1 = currentL1 !== null ? currentL1.val : 0
      value2 = currentL2 !== null ? currentL2.val : 0
      currentResult.next = new ListNode((carry + value1 + value2) % 10)
      currentResult = currentResult.next
      carry = (carry + value1 + value2) > 9 ? 1 : 0
      if (currentL1 !== null) {
          currentL1 = currentL1.next
      }
      if (currentL2 !== null) {
          currentL2 = currentL2.next
      }
  }

  if (carry) {
      currentResult.next = new ListNode(carry)
  }

  return result
};