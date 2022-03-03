/* 
https://leetcode.com/problems/remove-nth-node-from-end-of-list/
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

class ListNode {
  public val: number;
  public next: ListNode = null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val===undefined ? 0 : val);
    this.next = (next===undefined ? null : next);
  }
}

const getListNode = (nums: number[]) => {
  let result = new ListNode(nums[0])

  for (let i = 1, currentNode = result; i < nums.length; i++) {
    currentNode.next = new ListNode(nums[i])
    currentNode = currentNode.next
  }

  return result
}

const head = getListNode([1])

// 左右指针从虚拟头节点开始；
// 先右移右指针，使得左右指针之间相差 n - 1 个节点；
// 再集体右移左右指针，使得右指针处于链表最后一个节点，此时左指针的下一个节点就是要删除的节点。
// Runtime: 98 ms, faster than 61.39%, Memory Usage: 44.3 MB, less than 46.41%
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  head = new ListNode(0, head)
  let left = head
  let right = left

  while (n > 0) {
    if (!right.next) return null

    right = right.next
    n--
  }

  while (right.next) {
    right = right.next
    left = left.next
  }
  left.next = left.next.next

  return head.next
}

console.log(removeNthFromEnd(head, 1))