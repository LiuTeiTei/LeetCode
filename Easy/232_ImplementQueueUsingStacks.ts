/* 
https://leetcode.com/problems/implement-queue-using-stacks/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0232.%E7%94%A8%E6%A0%88%E5%AE%9E%E7%8E%B0%E9%98%9F%E5%88%97.md

请你仅使用两个栈实现先入先出队列。
队列应当支持一般队列支持的所有操作（push、pop、peek、empty）：

实现 MyQueue 类：
void push(int x) 将元素 x 推到队列的末尾
int pop() 从队列的开头移除并返回元素
int peek() 返回队列开头的元素
boolean empty() 如果队列为空，返回 true ；否则，返回 false

说明：
你 只能 使用标准的栈操作 —— 也就是只有 push to top, peek/pop from top, size, 和 is empty 操作是合法的。
你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。
 
示例 1：
输入：
["MyQueue", "push", "push", "peek", "pop", "empty"]
[[], [1], [2], [], [], []]
输出：
[null, null, null, 1, 1, false]

解释：
MyQueue myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
myQueue.peek(); // return 1
myQueue.pop(); // return 1, queue is [2]
myQueue.empty(); // return false
 
提示：
1 <= x <= 9
最多调用 100 次 push、pop、peek 和 empty
假设所有操作都是有效的 （例如，一个空的队列不会调用 pop 或者 peek 操作）
 
进阶：
你能否实现每个操作均摊时间复杂度为 O(1) 的队列？换句话说，执行 n 个操作的总时间复杂度为 O(n) ，即使其中一个操作可能花费较长时间。
*/

// 两个栈一个输入栈，一个输出栈
// 在 push 数据的时候，只要数据放进输入栈就好，
// 但在 pop 的时候，输出栈如果为空，就把进栈数据全部导入进来（注意是全部导入），再从出栈弹出数据，如果输出栈不为空，则直接从出栈弹出数据就可以了。
class MyQueue {
  private inputStack: number[]
  private outputStack: number[]

  constructor() {
    this.inputStack = []
    this.outputStack = []
  }

  push(x: number): void {
    this.inputStack.push(x)
  }

  pop(): number {
    if (this.outputStack.length < 1) {
      while (this.inputStack.length > 0) {
        this.outputStack.push(this.inputStack.pop()!)
      }
    }
    return this.outputStack.pop()!
  }

  peek(): number {
    const result = this.pop()
    this.outputStack.push(result)
    return result
  }

  empty(): boolean {
    return this.inputStack.length === 0 && this.outputStack.length === 0
  }
}

const obj = new MyQueue()
obj.push(1)
obj.push(2)
obj.peek()
obj.pop()
obj.empty()
