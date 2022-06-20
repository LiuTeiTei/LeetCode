/* 
https://leetcode.com/problems/balanced-binary-tree/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0110.%E5%B9%B3%E8%A1%A1%E4%BA%8C%E5%8F%89%E6%A0%91.md

给定一个二叉树，判断它是否是高度平衡的二叉树。
本题中，一棵高度平衡二叉树定义为：
一个二叉树每个节点的左右两个子树的高度差的绝对值不超过 1 。

示例 1：
输入：root = [3,9,20,null,null,15,7]
输出：true

示例 2：
输入：root = [1,2,2,3,3,null,null,4,4]
输出：false

示例 3：
输入：root = []
输出：true
 
提示：
树中的节点数在范围 [0, 5000] 内
-104 <= Node.val <= 104
*/

/**
 * Definition for a binary tree node.
 */
 class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val ?? 0
    this.right = right ?? null
    this.left = left ?? null
  }
}

// 后序遍历 ———— 递归方法
{
  function isBalanced(root: TreeNode | null): boolean {
    // 返回以该节点为根节点的二叉树的高度，如果不是平衡二叉树了则返回 -1
    const getHeight = (root: TreeNode | null): number => {
      if (root === null) return 0
  
      const leftHight = getHeight(root.left)
      const rightHight = getHeight(root.right)

      // 当判定右子树、左子树、本身为平衡二叉树时,直接返回-1
      if (leftHight === -1 || rightHight === -1 || Math.abs(leftHight - rightHight) > 1) {
        return -1
      }
  
      return 1 + Math.max(leftHight, rightHight)
    }
  
    const hight = getHeight(root)
    return hight !== -1 ? true : false
  };
}

// 后序遍历 ———— 迭代方法
// 理论上所有的递归都可以用迭代来实现，但是有的场景效率很低，因为没有很好的模拟回溯的过程，所以迭代法有很多重复的计算。
function isBalanced(root: TreeNode | null): boolean {
  // 返回以该节点为根节点的二叉树的高度
  const getHeight = (node: TreeNode | null) => {
    if (root === null) return 0
    
    let depth = 0
    let hight = 0
    let queue: (TreeNode | null)[] = [node]

    while (queue.length) {
      let currNode = queue.pop()
      if (currNode) {
        queue.push(currNode)   // 中
        queue.push(null)
        depth++
        currNode.right && queue.push(currNode.right)   // 右
        currNode.left && queue.push(currNode.left)    // 左
      } else {
        queue.pop()
        depth--
      }
      hight = hight > depth ? hight : depth;
    }
    
    return hight
  }

  if (root === null) return true
  
  let queue: TreeNode[] = [root]
  while (queue.length) {
    const currNode = queue.pop()!
    if (Math.abs(getHeight(currNode.left) - getHeight(currNode.right)) > 1) {
      return false
    }
    currNode.left && queue.push(currNode.left)
    currNode.right && queue.push(currNode.right)
  }

  return true
};

console.log(isBalanced(new TreeNode(1, new TreeNode(2, new TreeNode(3, new TreeNode(4), new TreeNode(4)), new TreeNode(3)), new TreeNode(2))))