/* 
https://leetcode.com/problems/intersection-of-two-linked-lists/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/%E9%9D%A2%E8%AF%95%E9%A2%9802.07.%E9%93%BE%E8%A1%A8%E7%9B%B8%E4%BA%A4.md

给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。
如果两个链表不存在相交节点，返回 null 。

题目数据 保证 整个链式结构中不存在环。
注意，函数返回结果后，链表必须 保持其原始结构 。

自定义评测：
评测系统 的输入如下（你设计的程序 不适用 此输入）：
intersectVal - 相交的起始节点的值。如果不存在相交节点，这一值为 0
listA - 第一个链表
listB - 第二个链表
skipA - 在 listA 中（从头节点开始）跳到交叉节点的节点数
skipB - 在 listB 中（从头节点开始）跳到交叉节点的节点数
评测系统将根据这些输入创建链式数据结构，并将两个头节点 headA 和 headB 传递给你的程序。
如果程序能够正确返回相交节点，那么你的解决方案将被 视作正确答案 。

示例 1：
输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
输出：Intersected at '8'
解释：相交节点的值为 8 （注意，如果两个链表相交则不能为 0）。
从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,6,1,8,4,5]。
在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。

示例 2：
输入：intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
输出：Intersected at '2'
解释：相交节点的值为 2 （注意，如果两个链表相交则不能为 0）。
从各自的表头开始算起，链表 A 为 [1,9,1,2,4]，链表 B 为 [3,2,4]。
在 A 中，相交节点前有 3 个节点；在 B 中，相交节点前有 1 个节点。

示例 3：
输入：intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
输出：null
解释：从各自的表头开始算起，链表 A 为 [2,6,4]，链表 B 为 [1,5]。
由于这两个链表不相交，所以 intersectVal 必须为 0，而 skipA 和 skipB 可以是任意值。
这两个链表不相交，因此返回 null 。
 
提示：
listA 中节点数目为 m
listB 中节点数目为 n
1 <= m, n <= 3 * 104
1 <= Node.val <= 105
0 <= skipA <= m
0 <= skipB <= n
如果 listA 和 listB 没有交点，intersectVal 为 0
如果 listA 和 listB 有交点，intersectVal == listA[skipA] == listB[skipB]
 
进阶：你能否设计一个时间复杂度 O(m + n) 、仅用 O(1) 内存的解决方案？
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

const common = getListNode([8, 4, 5])
const headA = getListNode([4, 1])
headA.next.next = common
const headB = getListNode([5, 6, 1])
headB.next.next.next = common



// Runtime: 118 ms, faster than 70.46%, Memory Usage: 50.2 MB, less than 59.49%
function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
  // 求出 headA 的长度
  let lengthA = 0
  let currA = headA
  while(currA !== null) {
    lengthA++
    currA = currA.next
  }

  // 求出 headB 的长度
  let lengthB = 0
  let currB = headB
  while(currB !== null) {
    lengthB++
    currB = currB.next
  }

  // 让 A、B 指针距离链表末尾的位置相同
  currA = headA
  currB = headB
  if (lengthA > lengthB) {
    let temp = lengthA - lengthB
    while (temp > 0) {
      temp--
      currA = currA.next
    }
  }
  if (lengthA < lengthB) {
    let temp = lengthB - lengthA
    while (temp > 0) {
      temp--
      currB = currB.next
    }
  }

  // 同时向后移动 currA 和 currB，如果遇到 curA == curB，则找到交点。
  while(currA !== null) {
    if (currA === currB) {
      return currA
    }
    currA = currA.next
    currB = currB.next
  }

  return null
};

console.log(getIntersectionNode(headA, headB))
