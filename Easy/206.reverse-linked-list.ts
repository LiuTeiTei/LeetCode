/* 
https://leetcode.com/problems/reverse-linked-list/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0206.%E7%BF%BB%E8%BD%AC%E9%93%BE%E8%A1%A8.md

给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。

示例 1：
输入：head = [1,2,3,4,5]
输出：[5,4,3,2,1]

示例 2：
输入：head = [1,2]
输出：[2,1]

示例 3：
输入：head = []
输出：[]

提示：
链表中节点的数目范围是 [0, 5000]
-5000 <= Node.val <= 5000

进阶：
链表可以选用迭代或递归方式完成反转。你能否用两种方法解决这道题？
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
// 时间复杂度: O(n) 空间复杂度: O(1)
function reverseList(head: ListNode | null): ListNode | null {
  let curr = head
  let result: ListNode | null = null
  let temp = curr

  while (curr) {
      // 保存 cur 的下一个节点
      temp = curr.next
      // 翻转操作
      curr.next = result
      result = curr
      curr = temp
  }

  return result
};

// 递归算法 - 从前往后翻转指针指向
// 时间复杂度: O(n) 空间复杂度: O(n)
function reverseList(head: ListNode | null): ListNode | null {
  const revers = (result: ListNode | null, curr: ListNode | null) => {
      if (!curr) return result

      const temp = curr.next
      curr.next = result
      return revers(curr, temp)
  }

  return revers(null, head)
};

// 递归算法 - 从后往前翻转指针指向
// 时间复杂度: O(n) 空间复杂度: O(n)
function reverseList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head

  const result = reverseList(head.next)
  const temp = head.next
  head.next.next = head
  head.next = null

  return result
};
