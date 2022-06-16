/* 
https://leetcode.com/problems/count-complete-tree-nodes/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0222.%E5%AE%8C%E5%85%A8%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E8%8A%82%E7%82%B9%E4%B8%AA%E6%95%B0.md

给你一棵 完全二叉树 的根节点 root ，求出该树的节点个数。
完全二叉树 的定义如下：
在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，
并且最下面一层的节点都集中在该层最左边的若干位置。
若最底层为第 h 层，则该层包含 1~ 2h 个节点。

示例 1：
输入：root = [1,2,3,4,5,6]
输出：6

示例 2：
输入：root = []
输出：0

示例 3：
输入：root = [1]
输出：1
 
提示：
树中节点的数目范围是[0, 5 * 104]
0 <= Node.val <= 5 * 104
题目数据保证输入的树是 完全二叉树
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

// 时间复杂度：O(n), 空间复杂度：O(log n), 算上了递归系统栈占用的空间.
// 普通二叉树 ---- 递归方法
{
  function countNodes(root: TreeNode | null): number {
    // const getCount = (root: TreeNode | null) => {
    //   if (root === null) return 0
    //   const leftCount = getCount(root.left)
    //   const rightCount = getCount(root.right)
    //   const count = leftCount + rightCount + 1
    //   return count
    // }
    // return getCount(root)
  
    if (root === null) return 0
    return countNodes(root.left) + countNodes(root.right) + 1
  };
}

// 普通二叉树 ---- 迭代方法
{
  function countNodes(root: TreeNode | null): number {
    const queue: TreeNode[] = []
    let result = 0
    root && queue.push(root)
  
    while(queue.length) {
      result++
      const currNode = queue.shift()!
      currNode.left && queue.push(currNode.left)
      currNode.right && queue.push(currNode.right)
    }
  
    return result
  };
}

// 时间复杂度：O(log n × log n), 空间复杂度：O(log n), 算上了递归系统栈占用的空间.
// 完全二叉树 ---- 递归方法
function countNodes(root: TreeNode | null): number {
  if (root === null) return 0

  let currNode: TreeNode | null = root
  let leftHight = 0
  while (currNode) {
    leftHight++
    currNode = currNode.left
  }

  currNode = root
  let rightHight = 0
  while(currNode) {
    rightHight++
    currNode = currNode.right
  }

  // 完全二叉树只有两种情况，情况一：就是满二叉树，情况二：最后一层叶子节点没有满。
  // 对于情况一，可以直接用 2^树深度 - 1 来计算。
  if (rightHight === leftHight) {
    return 2 ** leftHight - 1
  }
  // 对于情况二，分别递归左孩子，和右孩子，递归到某一深度一定会有左孩子或者右孩子为满二叉树，然后依然可以按照情况一来计算。
  return 1 + countNodes(root.left) + countNodes(root.right)
};

console.log(countNodes(new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5)), new TreeNode(3, new TreeNode(6)))))
console.log(countNodes(new TreeNode()))
