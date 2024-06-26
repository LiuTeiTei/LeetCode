/* 
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0700.%E4%BA%8C%E5%8F%89%E6%90%9C%E7%B4%A2%E6%A0%91%E4%B8%AD%E7%9A%84%E6%90%9C%E7%B4%A2.md
https://leetcode.cn/problems/search-in-a-binary-search-tree/submissions/542216681/

给定二叉搜索树（BST）的根节点 root 和一个整数值 val。
你需要在 BST 中找到节点值等于 val 的节点。 
返回以该节点为根的子树。 如果节点不存在，则返回 null 。

示例 1:
输入：root = [4,2,7,1,3], val = 2
输出：[2,1,3]

示例 2:
输入：root = [4,2,7,1,3], val = 5
输出：[]
 
提示：
树中节点数在 [1, 5000] 范围内
1 <= Node.val <= 107
root 是二叉搜索树
1 <= val <= 107
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

// 递归
function searchBST(root: TreeNode | null, val: number): TreeNode | null {
  if (!root || root.val === val)  return root

  if (root.val > val) return searchBST(root.left, val)
  if (root.val < val) return searchBST(root.right, val)

  return null
};

// 迭代
function searchBST(root: TreeNode | null, val: number): TreeNode | null {
  let currNode = root
  while (currNode) {
      if (currNode.val === val) {
          return currNode
      }else if (currNode.val > val) {
          currNode = currNode.left
      }else if (currNode.val < val) {
          currNode = currNode.right
      }
  }

  return null
};
