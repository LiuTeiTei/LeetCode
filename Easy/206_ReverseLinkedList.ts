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

const head = getListNode([1, 2, 3, 4, 5])

// 巧妙使用 ListNode 类，需要重新定义一个新的链表，会造成内存空间的浪费。
// Runtime: 105 ms, faster than 54.93%, Memory Usage: 44.8 MB, less than 45.07% 
{
  // function reverseList(head: ListNode | null): ListNode | null {
  //   let result = null
  
  //   while(head) {
  //     result = new ListNode(head.val, result)
  
  //     head = head.next
  //   }
  
  //   return result
  // }
}

// 双指针法，
// Runtime: 93 ms, faster than 66.12%, Memory Usage: 45.4 MB, less than 15.67%
{
  // function reverseList(head: ListNode | null): ListNode | null {
  //   let prev = null
  //   let curr = head
  
  //   while(curr) {
  //     const temp = curr.next
  //     curr.next = prev
  //     prev = curr
  //     curr = temp
  //   }
  
  //   return prev
  // };
}

// 递归法：相对抽象一些，但是其实和双指针法是一样的逻辑，同样是当 cur 为空的时候循环结束，不断将 cur 指向 pre 的过程。
// Runtime: 64 ms, faster than 98.37%, Memory Usage: 45.5 MB, less than 15.67%
function reverseList(head: ListNode | null): ListNode | null {
  const revers = (prev: ListNode | null, curr: ListNode | null) => {
    if (curr === null) {
      return prev
    }
    const temp = curr.next
    curr.next = prev
    return revers(curr, temp)
  }

  return revers(null, head)
};

console.log(reverseList(head))