/* 
https://leetcode.com/problems/design-linked-list/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0707.%E8%AE%BE%E8%AE%A1%E9%93%BE%E8%A1%A8.md

设计链表的实现。
您可以选择使用单链表或双链表。
单链表中的节点应该具有两个属性：val 和 next。val 是当前节点的值，next 是指向下一个节点的指针/引用。
如果要使用双向链表，则还需要一个属性 prev 以指示链表中的上一个节点。假设链表中的所有节点都是 0-index 的。

在链表类中实现这些功能：
get(index)：获取链表中第 index 个节点的值。如果索引无效，则返回-1。
addAtHead(val)：在链表的第一个元素之前添加一个值为 val 的节点。插入后，新节点将成为链表的第一个节点。
addAtTail(val)：将值为 val 的节点追加到链表的最后一个元素。
addAtIndex(index,val)：在链表中的第 index 个节点之前添加值为 val  的节点。如果 index 等于链表的长度，则该节点将附加到链表的末尾。如果 index 大于链表长度，则不会插入节点。如果index小于0，则在头部插入节点。
deleteAtIndex(index)：如果索引 index 有效，则删除链表中的第 index 个节点。
 
示例：
MyLinkedList linkedList = new MyLinkedList();
linkedList.addAtHead(1);
linkedList.addAtTail(3);
linkedList.addAtIndex(1,2);   //链表变为1-> 2-> 3
linkedList.get(1);            //返回2
linkedList.deleteAtIndex(1);  //现在链表是1-> 3
linkedList.get(1);            //返回3
 
提示：
所有val值都在 [1, 1000] 之内。
操作次数将在  [1, 1000] 之内。
请不要使用内置的 LinkedList 库。
*/

class ListNode {
  public val: number;
  public next: ListNode = null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val===undefined ? 0 : val);
    this.next = (next===undefined ? null : next);
  }
}

// 设置一个虚拟头结点在进行操作。
// Runtime: 188 ms, faster than 66.16%, Memory Usage: 51 MB, less than 33.33%
class MyLinkedList {
  // 记录链表长度
  private length: number
  private head: ListNode | null
  private tail: ListNode | null

  constructor() {
    this.length = 0
    this.head = null
    this.tail = null
  }

  // 获取指定 Node节点，这里不存在没办法获取到节点的情况，都已经在前置方法做过判断。
  private getNode(index: number): ListNode {
    // 创建虚拟头节点。
    let curNode = new ListNode(0, this.head)
    
    for (let i = 0; i <= index; i++) {
      curNode = curNode.next
    }

    return curNode
  }

  // 获取链表中第 index 个节点的值。如果索引无效，则返回-1。
  get(index: number): number {
    if (index < 0 || index >= this.length) return -1

    const curNode = this.getNode(index)
    return curNode.val
  }

  // 在链表的第一个元素之前添加一个值为 val 的节点。插入后，新节点将成为链表的第一个节点。
  addAtHead(val: number): void {
    const node = new ListNode(val, this.head)

    if (!this.tail) {
      this.tail = node
    }
    this.head = node
    this.length++
  }

  // 将值为 val 的节点追加到链表的最后一个元素。
  addAtTail(val: number): void {
    const node = new ListNode(val)

    if (this.tail) {
      this.tail.next = node
    } else {
      // 还没有尾节点，说明一个节点都还没有。
      this.head = node
    }

    this.tail = node
    this.length++
  }

  // 在链表中的第 index 个节点之前添加值为 val  的节点。
  // 如果 index 等于链表的长度，则该节点将附加到链表的末尾。
  // 如果 index 大于链表长度，则不会插入节点。
  // 如果index小于0，则在头部插入节点。
  addAtIndex(index: number, val: number): void {
    if (index > this.length) {
      return
    }

    if (index === this.length) {
      this.addAtTail(val)
      return
    }

    if (index <= 0) {
      this.addAtHead(val)
      return
    } 

    const prevNode = this.getNode(index - 1)
    const nextNode = prevNode.next
    const curNode = new ListNode(val, nextNode)
    prevNode.next = curNode

    this.length++
  }

  // 如果索引 index 有效，则删除链表中的第 index 个节点。
  deleteAtIndex(index: number): void {
    if (index < 0 || index >= this.length) {
      return
    }

    // 处理头节点
    if (index === 0) {
      this.head = this.head.next
      this.length--
      return
    }

    const prevNode = this.getNode(index - 1)
    prevNode.next = prevNode.next?.next
    // 处理尾节点
    if (index === this.length - 1) {
      this.tail = prevNode
    }

    this.length--
  }
}

const linkedList1 = new MyLinkedList();
console.log(linkedList1.get(0))
linkedList1.addAtTail(3)   // 3
console.log(linkedList1.get(0))
linkedList1.addAtHead(1)   // 1 -> 3
console.log(linkedList1.get(0), linkedList1.get(1))
linkedList1.addAtIndex(1, 2)   // 1-> 2-> 3
console.log(linkedList1.get(0), linkedList1.get(1), linkedList1.get(2))
linkedList1.deleteAtIndex(1)  // 1-> 3
console.log(linkedList1.get(0), linkedList1.get(1), linkedList1.get(2))

const linkedList2 = new MyLinkedList();
linkedList2.addAtIndex(0, 10)    //  10
console.log(linkedList2.get(0))
linkedList2.addAtIndex(0, 20)    // 20 -> 10
console.log(linkedList2.get(0), linkedList2.get(1))
linkedList2.addAtIndex(1, 30)    // 20 -> 30 -> 10
console.log(linkedList2.get(0), linkedList2.get(1), linkedList2.get(2))