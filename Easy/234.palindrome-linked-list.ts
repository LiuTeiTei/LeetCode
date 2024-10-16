/* 
https://leetcode.cn/problems/palindrome-linked-list/description/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0234.%E5%9B%9E%E6%96%87%E9%93%BE%E8%A1%A8.md

给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。
如果是，返回 true ；否则，返回 false 。

示例 1：
输入：head = [1,2,2,1]
输出：true

示例 2：
输入：head = [1,2]
输出：false
 
提示：
链表中节点数目在范围[1, 105] 内
0 <= Node.val <= 9
 
进阶：你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？
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

// 时间复杂度: O(2n) 空间复杂度: O(n)
function isPalindrome(head: ListNode | null): boolean {
  // 用栈记录链表的倒排
  const stack: number[] = []
  let currNode = head
  while (currNode) {
      stack.push(currNode.val)
      currNode = currNode.next
  }

  // 比较栈和链表的值
  currNode = head
  while (currNode) {
      const value = stack.pop()
      if (currNode.val !== value) return false
      currNode = currNode.next
  }

  return true
};

// 时间复杂度: O(2n) 空间复杂度: O(n)
function isPalindrome(head: ListNode | null): boolean {
  // 先将链表转成数组
  const arr: number[] = []
  let currNode = head
  while (currNode) {
      arr.push(currNode.val)
      currNode = currNode.next
  }

  // 再判断是否是回文
  for (let i = 0, j = arr.length - 1; i < j; i++, j--) {
      if (arr[i] !== arr[j]) return false
  }

  return true
};

// 时间复杂度: O(1.5n) 空间复杂度: O(1)
function isPalindrome(head: ListNode | null): boolean {
  if (!head || !head.next) return true
  
  // 快慢指针分隔链表
  const getFirstHalf = (head: ListNode | null) => {
      let slow = head
      let fast = head
      while(fast.next && fast.next.next) {
          slow = slow.next
          fast = fast.next.next
      }
      return slow
  }

  // 反转链表
  const reverseList = (head: ListNode | null): ListNode | null => {
      let curr: ListNode | null = head
      let prev: ListNode | null = null
      while(curr) {
          let temp: ListNode | null = curr.next
          curr.next = prev
          prev = curr
          curr = temp
      }
      return prev
  }

  const firstHalf = getFirstHalf(head)
  const reversedSecondHalf = reverseList(firstHalf.next)

  // 判断是否回文
  let p1 = head
  let p2 = reversedSecondHalf
  while(p2) {
      if (p1.val !== p2.val) return false
      p1 = p1.next
      p2 = p2.next
  }

  return true
};
