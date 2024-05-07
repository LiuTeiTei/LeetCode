/* 
https://leetcode.cn/problems/remove-nth-node-from-end-of-list/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0019.%E5%88%A0%E9%99%A4%E9%93%BE%E8%A1%A8%E7%9A%84%E5%80%92%E6%95%B0%E7%AC%ACN%E4%B8%AA%E8%8A%82%E7%82%B9.md

给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

示例 1：
输入：head = [1,2,3,4,5], n = 2
输出：[1,2,3,5]

示例 2：
输入：head = [1], n = 1
输出：[]

示例 3：
输入：head = [1,2], n = 1
输出：[1]
 
提示：
链表中结点的数目为 sz
1 <= sz <= 30
0 <= Node.val <= 100
1 <= n <= sz
 
进阶：你能尝试使用一趟扫描实现吗？

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

// 双指针，leftNode 和 rightNode 之间间隔 n
// 时间复杂度 O(n)，空间复杂度 O(1)
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  let leftNode = head
  let rightNode = head
  let interval = 0
  while (interval < n) {
      rightNode = rightNode.next
      interval++
  }

  // rightNode 处于 head 长度之外，说明删除的是头结点
  if (!rightNode) return head.next

  while (rightNode.next) {
      rightNode = rightNode.next
      leftNode = leftNode.next
  }

  // 删除第 n 个结点
  const temNode = leftNode.next.next
  leftNode.next = temNode
  return head
};
