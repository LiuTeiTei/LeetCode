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
// 时间复杂度: O(m + n) 空间复杂度: O(1)
function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
  let currA = headA
  let lenA = 0
  let currB = headB
  let lenB = 0

  // 求 headA 和 headB 的长度
  while (currA) {
      lenA += 1
      currA = currA.next
  }
  while (currB) {
      lenB += 1
      currB = currB.next
  }

  // 回到起点，且保证 currA 为长的那条
  if (lenA >= lenB) {
      currA = headA
      currB = headB
  } else {
      currA = headB
      currB = headA
  }

  // 让 curA 和 curB 末尾位置对齐
  let gap = Math.abs(lenA - lenB)
  while (gap > 0) {
      currA = currA.next
      gap -= 1
  }

  // 遍历 curA 和 curB，遇到相同则直接返回
  while (currA && currB) {
      if (currA === currB) return currA
      currA = currA.next
      currB = currB.next
  }

  return null
};
