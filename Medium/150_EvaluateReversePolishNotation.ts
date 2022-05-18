/* 
https://leetcode.com/problems/evaluate-reverse-polish-notation/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0150.%E9%80%86%E6%B3%A2%E5%85%B0%E8%A1%A8%E8%BE%BE%E5%BC%8F%E6%B1%82%E5%80%BC.md

根据 逆波兰表示法，求表达式的值。
有效的算符包括 +、-、*、/ 。每个运算对象可以是整数，也可以是另一个逆波兰表达式。
注意 两个整数之间的除法只保留整数部分。
可以保证给定的逆波兰表达式总是有效的。换句话说，表达式总会得出有效数值且不存在除数为 0 的情况。

示例 1：
输入：tokens = ["2","1","+","3","*"]
输出：9
解释：该算式转化为常见的中缀算术表达式为：((2 + 1) * 3) = 9

示例 2：
输入：tokens = ["4","13","5","/","+"]
输出：6
解释：该算式转化为常见的中缀算术表达式为：(4 + (13 / 5)) = 6

示例 3：
输入：tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
输出：22
解释：该算式转化为常见的中缀算术表达式为：
  ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
= ((10 * (6 / (12 * -11))) + 17) + 5
= ((10 * (6 / -132)) + 17) + 5
= ((10 * 0) + 17) + 5
= (0 + 17) + 5
= 17 + 5
= 22
 
提示：
1 <= tokens.length <= 104
tokens[i] 是一个算符（"+"、"-"、"*" 或 "/"），或是在范围 [-200, 200] 内的一个整数
 
逆波兰表达式：
逆波兰表达式是一种后缀表达式，所谓后缀就是指算符写在后面。
平常使用的算式则是一种中缀表达式，如 ( 1 + 2 ) * ( 3 + 4 ) 。
该算式的逆波兰表达式写法为 ( ( 1 2 + ) ( 3 4 + ) * ) 。
逆波兰表达式主要有以下两个优点：
去掉括号后表达式无歧义，上式即便写成 1 2 + 3 4 + * 也可以依据次序计算出正确结果。
适合用栈操作运算：遇到数字则入栈；遇到算符则取出栈顶两个数字进行计算，并将结果压入栈中
*/

// 使用 eval() 函数将 string 换成表达式计算
{
  function evalRPN(tokens: string[]): number {
    const stack: string[] = []
  
    for (let i = 0; i < tokens.length; i++){
      const value = tokens[i]
  
      if (!Number.isNaN(Number(value))) {
        stack.push(value)
      } else {
        const value1 = stack.pop()
        const value2 = stack.pop()
        const result = eval(`(${value2})${value}(${value1})`)
        // 除法只保留整数
        stack.push(String(parseInt(result)))
      }
    }
  
    return Number(stack[0])
  }
}

// eval() 函数不安全：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval#don.27t_use_eval.21
{
  function evalRPN(tokens: string[]): number {
    const stack: number[] = []
  
    for (let i = 0; i < tokens.length; i++){
      const value = tokens[i]
  
      switch(value) {
        case '+':
          stack.push(stack.pop()! + (stack.pop()!))
          break
        case '-':
          const value1 = stack.pop()!
          stack.push(stack.pop()! - (value1))
          break
        case '*':
          stack.push(stack.pop()! * (stack.pop()!))
          break
        case '/':
          const value2 = stack.pop()!
          stack.push(Math.trunc(stack.pop()! / (value2)))
          break
        default:
          stack.push(Number(value))
          break
      }
    }
  
    return stack[0]
  }
}

// 用 Map 函数替换 switch 函数
function evalRPN(tokens: string[]): number {
  const stack: number[] = []
  const operatorMap: Map<string, (a: number, b: number) => number> = new Map([
    ['+', (a, b) => a + b],
    ['-', (a, b) => a - b],
    ['/', (a, b) => Math.trunc(a / b)],
    ['*', (a, b) => a * b],
  ])

  for (let value of tokens){
    if (operatorMap.has(value)) {
      const value1 = stack.pop()!
      const value2 = stack.pop()!
      stack.push(operatorMap.get(value)!(value2, value1))
    } else {
      stack.push(Number(value))
    }
  }

  return stack.pop()!
}

console.log(evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"])) // 22
console.log(evalRPN(["4","13","5","/","+"])) // 6
console.log(evalRPN(["4","-2","/","2","-3","-","-"])) // -7
console.log(evalRPN(["4","13","5","/","+"])) // 6