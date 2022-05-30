/* 
https://leetcode.com/problems/symmetric-tree/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0101.%E5%AF%B9%E7%A7%B0%E4%BA%8C%E5%8F%89%E6%A0%91.md

给你一个二叉树的根节点 root ， 检查它是否轴对称。

示例 1：
输入：root = [1,2,2,3,4,4,3]
输出：true

示例 2：
输入：root = [1,2,2,null,3,null,3]
输出：false
 
提示：
树中节点数目在范围 [1, 1000] 内
-100 <= Node.val <= 100
 

进阶：
你可以运用递归和迭代两种方法解决这个问题吗？
*/

/** Definition for a binary tree node. */
class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val ?? 0
    this.left = left ?? null
    this.right = right ?? null
  }
}


// 强行层序遍历，很多无效的遍历循环，会 timeout
{
  function isSymmetric(root: TreeNode | null): boolean {
    if (root === null) return true
  
    // 层序遍历
    const queue: (TreeNode | null)[] = []
    queue.push(root.left)
    queue.push(root.right)
  
    while (queue.filter(item => item !== null).length > 0) {
      let len = queue.length
      if (len % 2 === 1) return false
  
      const valueArr: (number | undefined)[] = []
      while(len--) {
        const currNode = queue.shift()
        valueArr.push(currNode?.val !== undefined ? currNode.val : undefined)
        queue.push(currNode?.left ? currNode.left: null)
        queue.push(currNode?.right ? currNode.right : null)
      }
  
      const length = valueArr.length
      for(let i = 0; i < length; i += 2) {
        if (valueArr.shift() !== valueArr.pop()) return false
      }
    }
  
    return true
  };
}


// 递归方法，后序遍历，遍历两棵树同时比较内侧和外侧节点，准确的来说是一个树的遍历顺序是左右中，一个树的遍历顺序是右左中
{
  function isSymmetric(root: TreeNode | null): boolean {
    if (root === null) return true
  
    const compare = (left: TreeNode | null, right: TreeNode | null): boolean => {
      if ((left === null && right !== null) || (left !== null && right === null)) return false
      if (left === null && right === null) return true
      if (left?.val !== right?.val) return false
  
      const outside = compare(left?.left!, right?.right!)
      const inside = compare(left?.right!, right?.left!)
      return outside && inside
    }
    
    return compare(root.left, root.right)
  };
}

// 迭代方法，啥遍历都不是
function isSymmetric(root: TreeNode | null): boolean {
  if (root === null) return true

  const queue: (TreeNode | null)[] = []
  queue.push(root.left)
  queue.push(root.right)

  while (queue.length > 0) {
    const left = queue.shift()
    const right = queue.shift()
    
    if (left === null && right === null) continue
    if (left === null || right === null) return false
    if (left?.val !== right?.val) return false

    queue.push(left?.left!)
    queue.push(right?.right!)
    queue.push(left?.right!)
    queue.push(right?.left!)
  }
  
  return true
};

const tree1 = new TreeNode(1, new TreeNode(2, new TreeNode(3), new TreeNode(4)), new TreeNode(2, new TreeNode(4), new TreeNode(3)))
const tree2 = new TreeNode(2, new TreeNode(3, new TreeNode(4), new TreeNode(5)), new TreeNode(3, null, new TreeNode(4)))
const tree3 = new TreeNode(1, new TreeNode(0))
console.log(isSymmetric(tree1)) // true
console.log(isSymmetric(tree2)) // false
console.log(isSymmetric(tree3)) // false
