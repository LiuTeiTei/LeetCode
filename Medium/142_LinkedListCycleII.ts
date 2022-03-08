/* 
https://leetcode-cn.com/problems/linked-list-cycle-ii/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0142.%E7%8E%AF%E5%BD%A2%E9%93%BE%E8%A1%A8II.md

给定一个链表的头节点  head ，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 

为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。
如果 pos 是 -1，则在该链表中没有环。
注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。

不允许修改 链表。

示例 1：
输入：head = [3,2,0,-4], pos = 1
输出：返回索引为 1 的链表节点
解释：链表中有一个环，其尾部连接到第二个节点。

示例 2：
输入：head = [1,2], pos = 0
输出：返回索引为 0 的链表节点
解释：链表中有一个环，其尾部连接到第一个节点。

示例 3：
输入：head = [1], pos = -1
输出：返回 null
解释：链表中没有环。

提示：
链表中节点的数目范围在范围 [0, 104] 内
-105 <= Node.val <= 105
pos 的值为 -1 或者链表中的一个有效索引
 
进阶：你是否可以使用 O(1) 空间解决此题？
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

const head = getListNode([3, 2, 0, -4])
head.next.next.next.next = head.next



// Runtime: 72 ms, faster than 98.70%, Memory Usage: 45.7 MB, less than 27.69% 
function detectCycle(head: ListNode | null): ListNode | null {
  let fastNode = head
  let slowNode = head

  while(fastNode !== null && fastNode.next !== null) {
    fastNode = fastNode.next.next
    slowNode = slowNode.next

    // 判断是否存在环，如果存在环，fastNode 和 slowNode 一定会在环中相遇，且此时 slowNode 是第一次进环。
    if (fastNode === slowNode) {
      let headNode = head
      let meetNode = fastNode

      // 从头结点出发一个指针，从相遇节点也出发一个指针，这两个指针每次只走一个节点， 那么当这两个指针相遇的时候就是环形入口的节点。
      while(headNode !== meetNode) {
        headNode = headNode.next
        meetNode = meetNode.next
      }

      return meetNode
    }
  }

  return null
};

console.log(detectCycle(head))
