/* 
https://leetcode.cn/problems/binary-tree-preorder-traversal/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E9%80%92%E5%BD%92%E9%81%8D%E5%8E%86.md
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E8%BF%AD%E4%BB%A3%E9%81%8D%E5%8E%86.md

给你二叉树的根节点 root ，返回它节点值的 前序 遍历。

示例 1：
输入：root = [1,null,2,3]
输出：[1,2,3]

示例 2：
输入：root = []
输出：[]

示例 3：
输入：root = [1]
输出：[1]

示例 4：
输入：root = [1,2]
输出：[1,2]

示例 5：
输入：root = [1,null,2]
输出：[1,2]
 
提示：
树中节点数目在范围 [0, 100] 内
-100 <= Node.val <= 100
 
进阶：递归算法很简单，你可以通过迭代算法完成吗？
*/

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

// 递归方法
function preorderTraversal(root: TreeNode | null): number[] {
  const traversal = (currTree: TreeNode | null, result: number[]): void => {
    if (currTree === null) return
    result.push(currTree.val)
    traversal(currTree.left, result)
    traversal(currTree.right, result)
  }

  const result: number[] = []
  traversal(root, result)
  return result
};

// 迭代方法
function preorderTraversal(root: TreeNode | null): number[] {
  if (root === null) return []

  const result: number[] = []
  const treeStack: TreeNode[] = []
  let currTree = root
  treeStack.push(root)

  // 抛出中间节点，压入右节点，再压入左节点，如此循环
  while(treeStack.length > 0) {
    currTree = treeStack.pop()!
    result.push(currTree.val)
    if (currTree.right !== null) treeStack.push(currTree.right)
    if (currTree.left !== null) treeStack.push(currTree.left)
  }

  return result
};
