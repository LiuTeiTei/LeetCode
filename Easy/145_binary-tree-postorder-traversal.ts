/* 
https://leetcode.cn/problems/binary-tree-postorder-traversal/description/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E9%80%92%E5%BD%92%E9%81%8D%E5%8E%86.md
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E8%BF%AD%E4%BB%A3%E9%81%8D%E5%8E%86.md

给你一棵二叉树的根节点 root ，返回其节点值的 后序遍历 。

示例 1：
输入：root = [1,null,2,3]
输出：[3,2,1]

示例 2：
输入：root = []
输出：[]

示例 3：
输入：root = [1]
输出：[1]
 
提示：
树中节点的数目在范围 [0, 100] 内
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
function postorderTraversal(root: TreeNode | null): number[] {
  const traversal = (currTree: TreeNode | null, result: number[]): void => {
    if (currTree === null) return
    traversal(currTree.left, result)
    traversal(currTree.right, result)
    result.push(currTree.val)
  }

  const result: number[] = []
  traversal(root, result)
  return result
};

// 迭代方法
function postorderTraversal(root: TreeNode | null): number[] {
  if (root === null) return []

  const result: number[] = []
  const treeStack: TreeNode[] = []
  let currTree = root
  treeStack.push(root)

  // 前序遍历（中左右）==》调整为（中右左）==》反转就是后序遍历（左右中）
  while(treeStack.length > 0) {
    currTree = treeStack.pop()!
    result.push(currTree.val)
    if (currTree.left !== null) treeStack.push(currTree.left)
    if (currTree.right !== null) treeStack.push(currTree.right)
  }

  return result.reverse()
};
