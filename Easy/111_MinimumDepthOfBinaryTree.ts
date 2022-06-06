/* 
https://leetcode.com/problems/minimum-depth-of-binary-tree/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0111.%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E6%9C%80%E5%B0%8F%E6%B7%B1%E5%BA%A6.md

给定一个二叉树，找出其最小深度。
最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
说明：叶子节点是指没有子节点的节点。

示例 1：
输入：root = [3,9,20,null,null,15,7]
输出：2

示例 2：
输入：root = [2,null,3,null,4,null,5,null,6]
输出：5
 
提示：
树中节点数的范围在 [0, 105] 内
-1000 <= Node.val <= 1000
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

// 求二叉树的最小深度和求二叉树的最大深度的差别主要在于处理左右孩子不为空的逻辑
// 递归方法，利用后序遍历，自下而上
{
  function minDepth(root: TreeNode | null): number {
    if (root === null) return 0
  
    const getMin = (node: TreeNode | null): number => {
      if (node === null) return 0
      const leftDepth = getMin(node.left)
      const rightDepth = getMin(node.right)
  
      // 当一个左子树为空，右不为空，这时并不是最低点
      if (node.left === null && node.right !== null) {
        return 1 + rightDepth
      }
  
      // 当一个右子树为空，左不为空，这时并不是最低点
      if (node.left !== null && node.right === null) {
        return 1 + leftDepth
      }
  
      return 1 + Math.min(leftDepth, rightDepth)
    }
  
    return getMin(root)
  };
}

// 递归方法，利用后序遍历，自下而上 ———— 精简版 1
{
  function minDepth(root: TreeNode | null): number {
    if (root === null) return 0
  
    const leftDepth = minDepth(root.left)
    const rightDepth = minDepth(root.right)
  
    if (root.left === null && root.right !== null) {
      return 1 + rightDepth
    }
  
    if (root.left !== null && root.right === null) {
      return 1 + leftDepth
    }
  
    return 1 + Math.min(leftDepth, rightDepth)
  };
}

// 迭代方法，利用层序遍历
function minDepth(root: TreeNode | null): number {
  let depth = 0
  if (root === null) return depth

  const queue: TreeNode[] = [root]

  while(queue.length > 0) {
    let len = queue.length
    // 记录最小深度
    depth++

    while(len--) {
      const currNode = queue.shift()!

      // 当左右孩子都为空的时候，说明是最低点的一层了，退出
      if (currNode.left === null && currNode.right === null) {
        return depth
      }

      currNode.left && queue.push(currNode.left)
      currNode.right && queue.push(currNode.right)
    }
  }

  return depth
};


const tree = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)))
console.log(minDepth(tree))  // 3