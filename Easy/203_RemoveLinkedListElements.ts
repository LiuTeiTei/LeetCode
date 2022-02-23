/* 
https://leetcode.com/problems/remove-linked-list-elements/
https://leetcode-cn.com/problems/remove-linked-list-elements/

给你一个链表的头节点 head 和一个整数 val ，请你删除链表中所有满足 Node.val == val 的节点，并返回 新的头节点 。

示例 1：
输入：head = [1,2,6,3,4,5,6], val = 6
输出：[1,2,3,4,5]

示例 2：
输入：head = [], val = 1
输出：[]

示例 3：
输入：head = [7,7,7,7], val = 7
输出：[]
 
提示：
列表中的节点数目在范围 [0, 104] 内
1 <= Node.val <= 50
0 <= val <= 50

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

class ListNode {
  public val: number;
  public next: ListNode = null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val===undefined ? 0 : val);
    this.next = (next===undefined ? null : next);
  }
}

const head = new ListNode(1)
head.next = new ListNode(2);
head.next.next = new ListNode(6);
head.next.next.next = new ListNode(3);
head.next.next.next.next = new ListNode(4);
head.next.next.next.next.next = new ListNode(5);
head.next.next.next.next.next.next = new ListNode(6);

// 在原链表上直接删除：移除头结点 和 移除其他节点的操作方式是不一样，其实在写代码的时候也会发现，需要单独写一段逻辑来处理移除头结点的情况。
// Runtime: 152 ms, faster than 29.14%, Memory Usage: 47.9 MB, less than 20.86%
{
  function removeElements(head: ListNode | null, val: number): ListNode | null {
    // 删除头部节点
    while(head !== null && head.val === val) {
      head = head.next
    }
    if (head === null) return head
  
    // 删除非头部节点
    let prevNode = head
    let currentNode = head.next
    while(currentNode) {
      if (currentNode.val === val) {
        prevNode.next = currentNode.next
      } else {
        prevNode = prevNode.next
      }
      currentNode = currentNode.next
    }
  
    return head
  };
}


// 虚拟头节点：设置一个虚拟头结点，原链表的所有节点按照统一的方式进行移除。
// Runtime: 130 ms, faster than 49.82%, Memory Usage: 48.4 MB, less than 5.96%
function removeElements(head: ListNode | null, val: number): ListNode | null {
  head = new ListNode(0, head)

  let prevNode = head
  let currentNode = head.next
  while(currentNode) {
    if (currentNode.val === val) {
      prevNode.next = currentNode.next
    } else {
      prevNode = prevNode.next
    }
    currentNode = currentNode.next
  }

  return head.next
};

console.log(removeElements(head, 6))