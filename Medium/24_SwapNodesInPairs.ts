/* 
https://leetcode.com/problems/swap-nodes-in-pairs/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0024.%E4%B8%A4%E4%B8%A4%E4%BA%A4%E6%8D%A2%E9%93%BE%E8%A1%A8%E4%B8%AD%E7%9A%84%E8%8A%82%E7%82%B9.md

给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。
 
示例 1：
输入：head = [1,2,3,4]
输出：[2,1,4,3]

示例 2：
输入：head = []
输出：[]

示例 3：
输入：head = [1]
输出：[1]

提示：
链表中节点的数目在范围 [0, 100] 内
0 <= Node.val <= 100
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

const head = getListNode([1, 2, 3, 4, 5, 6, 7])

// 虚拟头结点，按照固定的顺序交换，先交换没有存的点，一定要画图帮助理清思路。
// Runtime: 60 ms, faster than 99.13%, Memory Usage: 44.8 MB, less than 24.67%
// null -> 1        -> 2 -> 3        -> 4 -> 5 -> 6 -> 7
// curr -> currNext ->   -> nextPair ->
function swapPairs(head: ListNode | null): ListNode | null {
  head = new ListNode(null, head)

  let curr = head
  while (curr && curr.next && curr.next.next) {
    const currNext = curr.next
    const nextPair = curr.next.next.next
    curr.next = currNext.next
    curr.next.next = currNext
    currNext.next = nextPair

    curr = currNext
  }

  return head.next
};

console.log(swapPairs(head))