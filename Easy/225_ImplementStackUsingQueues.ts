/* 
https://leetcode.com/problems/implement-stack-using-queues/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0225.%E7%94%A8%E9%98%9F%E5%88%97%E5%AE%9E%E7%8E%B0%E6%A0%88.md

请你仅使用两个队列实现一个后入先出（LIFO）的栈，
并支持普通栈的全部四种操作（push、top、pop 和 empty）。

实现 MyStack 类：
void push(int x) 将元素 x 压入栈顶。
int pop() 移除并返回栈顶元素。
int top() 返回栈顶元素。
boolean empty() 如果栈是空的，返回 true ；否则，返回 false 。
 
注意：
你只能使用队列的基本操作 —— 也就是 push to back、peek/pop from front、size 和 is empty 这些操作。
你所使用的语言也许不支持队列。 你可以使用 list （列表）或者 deque（双端队列）来模拟一个队列 , 只要是标准的队列操作即可。
 
示例：
输入：
["MyStack", "push", "push", "top", "pop", "empty"]
[[], [1], [2], [], [], []]
输出：
[null, null, null, 2, 2, false]

解释：
MyStack myStack = new MyStack();
myStack.push(1);
myStack.push(2);
myStack.top(); // 返回 2
myStack.pop(); // 返回 2
myStack.empty(); // 返回 False
 
提示：
1 <= x <= 9
最多调用100 次 push、pop、top 和 empty
每次调用 pop 和 top 都保证栈不为空
 
进阶：你能否仅用一个队列来实现栈。
*/

// 使用两个队列，其中一个单纯用来备份。
class MyStack {
  private queue: number[]
  private tempQueue: number[]

  constructor() {
    this.queue = []
    this.tempQueue = []
  }

  push(x: number): void {
    this.queue.push(x)
  }

  pop(): number {
    while (this.queue.length > 1) {
      this.tempQueue.push(this.queue.shift()!)
    }
    const result = this.queue.pop()
    this.queue = this.tempQueue
    this.tempQueue = []
    return result!
  }

  top(): number {
    const result = this.pop()
    this.push(result)
    return result
  }

  empty(): boolean {
    return this.queue.length === 0
  }
}

// 使用一个队列，pop 时循环。
class MyStack {
  private queue: number[]

  constructor() {
    this.queue = []
  }

  push(x: number): void {
    this.queue.push(x)
  }

  pop(): number {
    let len = this.queue.length
    while (len > 1) {
      this.queue.push(this.queue.shift()!)
      len--
    }
    return this.queue.shift()!
  }

  top(): number {
    const result = this.pop()
    this.queue.push(result)
    return result
  }

  empty(): boolean {
    return this.queue.length === 0
  }
}

/**
* Your MyStack object will be instantiated and called as such:
* var obj = new MyStack()
* obj.push(x)
* var param_2 = obj.pop()
* var param_3 = obj.top()
* var param_4 = obj.empty()
*/