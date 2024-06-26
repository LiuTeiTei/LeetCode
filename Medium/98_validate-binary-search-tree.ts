/* 
https://leetcode.cn/problems/validate-binary-search-tree/description/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0098.%E9%AA%8C%E8%AF%81%E4%BA%8C%E5%8F%89%E6%90%9C%E7%B4%A2%E6%A0%91.md

给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。
有效 二叉搜索树定义如下：
节点的左子树只包含 小于 当前节点的数。
节点的右子树只包含 大于 当前节点的数。
所有左子树和右子树自身必须也是二叉搜索树。

示例 1：
输入：root = [2,1,3]
输出：true

示例 2：
输入：root = [5,1,4,null,null,3,6]
输出：false
解释：根节点的值是 5 ，但是右子节点的值是 4 。
 
提示：
树中节点数目范围在[1, 104] 内
-231 <= Node.val <= 231 - 1
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

// 中序遍历下，输出的二叉搜索树节点的数值是有序序列

// 先中序遍历，在比较结果是否为递增
// 时间复杂度: O(2n) 空间复杂度: (n)
function isValidBST(root: TreeNode | null): boolean {
  const traversal = (currNode: TreeNode | null, vals: number[]) => {
      if (!currNode) return true
      traversal(currNode.left, vals)
      vals.push(currNode.val)
      traversal(currNode.right, vals)
  }

  const vals: number[] = []
  traversal(root, vals)

  for (let i = 1; i < vals.length; i++) {
      if (vals[i] <= vals[i - 1]) return false
  }

  return true
};

// 中序遍历的过程中，比较值是否比上一次值大
// 时间复杂度: O(n) 空间复杂度: (1)
function isValidBST(root: TreeNode | null): boolean {
  let maxVal = -Infinity

  const tranversal = (currNode: TreeNode | null) => {
      if (!currNode) return true

      let leftValid = tranversal(currNode.left)
      if (!leftValid) return false
      
      if (maxVal < currNode.val) {
          maxVal = currNode.val
      } else {
          return false
      }

      let rightValid = tranversal(currNode.right)
      if (!rightValid) return false

      return leftValid && rightValid
  }

  return tranversal(root)
};
