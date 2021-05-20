/* 
https://leetcode.com/problems/reverse-linked-list/

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
 */
function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}

function getList(array) {
  if (array.length > 0) {
    const value = array[0]
    array.shift()
    return new ListNode(value, getList(array))
  }
}

// head = new ListNode(1, new ListNode(2, new ListNode(3)));
// {
//   val: 3,
//   next: {
//     val: 2,
//     next: {
//       val: 1,
//       next: undefined,
//     },
//   },
// }
const head = getList([1,2,3])


/**
 * @param {ListNode} head
 * @return {ListNode}
 */

// 迭代方法
// 通过 3 个指针：prev，curr，next
// 动画演示：https://leetcode-cn.com/problems/reverse-linked-list/solution/dong-hua-yan-shi-206-fan-zhuan-lian-biao-by-user74/
var reverseList = function(head) {
  let prev = null;
  let curr = head;
  while (curr) {
    const next =curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
};

// 动画演示：https://leetcode-cn.com/problems/reverse-linked-list/solution/shi-pin-jiang-jie-die-dai-he-di-gui-hen-hswxy/

const result = reverseList(head)
console.log('debug')