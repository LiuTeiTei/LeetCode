/* 
https://leetcode.com/problems/maximum-depth-of-binary-tree/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0104.%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E6%9C%80%E5%A4%A7%E6%B7%B1%E5%BA%A6.md

给定一个二叉树，找出其最大深度。
二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
说明: 叶子节点是指没有子节点的节点。

示例：
给定二叉树 [3,9,20,null,null,15,7]，
    3
   / \
  9  20
    /  \
   15   7
返回它的最大深度 3 。
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

// 迭代方法，利用层序遍历
{
  function maxDepth(root: TreeNode | null): number {
    let result = 0
    if (root === null) return result
  
    const queue: TreeNode[] = []
    queue.push(root)
  
    while(queue.length > 0) {
      result++
      let len = queue.length
      while(len--) {
        const currNode = queue.shift()!
        currNode.left && queue.push(currNode.left)
        currNode.right && queue.push(currNode.right)
      }
    }
  
    return result
  };
}

// 递归方法，利用后序遍历，自下而上
{
  function maxDepth(root: TreeNode | null): number {
    const getMax = (node: TreeNode | null): number => {
      if (node === null) return 0
      
      const leftDepth = getMax(node.left)
      const rightDepth = getMax(node.right)
  
      return Math.max(leftDepth, rightDepth) + 1
    }
  
    return getMax(root)
  };
}

// 递归方法，利用后序遍历，自下而上 ———— 精简版
{
  function maxDepth(root: TreeNode | null): number {
    if (root === null) return 0
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
  };
}

/// 递归方法，利用前序遍历，自上而下
function maxDepth(root: TreeNode | null): number {
  const getMax = (node: TreeNode | null, count: number) => {
    if (node === null) {
      max = Math.max(max, count)
      return
    }

    getMax(node.left, count + 1)
    getMax(node.right, count + 1)
  }

  let max = 0
  getMax(root, 0)
  return max
};

const tree = new TreeNode(1, new TreeNode(2, new TreeNode(3)))
console.log(maxDepth(tree)) // 3