/* 
https://leetcode.com/problems/binary-tree-paths/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0257.%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E6%89%80%E6%9C%89%E8%B7%AF%E5%BE%84.md

给你一个二叉树的根节点 root ，按任意顺序 ，返回所有从根节点到叶子节点的路径。
叶子节点是指没有子节点的节点。

示例 1：
输入：root = [1,2,3,null,5]
输出：["1->2->5","1->3"]

示例 2：
输入：root = [1]
输出：["1"]
 
提示：
树中节点的数目在范围 [1, 100] 内
-100 <= Node.val <= 100
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

// 递归 + 回溯
{
  function binaryTreePaths(root: TreeNode | null): string[] {
    // 1. 确定递归函数 函数参数
    const traversal = (currNode: TreeNode, paths: number[], result: string[]) => {
      paths.push(currNode.val)
      const left = currNode.left
      const right = currNode.right
  
      // 2. 确定终止条件，到叶子节点就终止
      if (left === null && right === null) {
        result.push(paths.join('->'))
      }
  
      // 3. 确定单层递归逻辑
      if (left) {
        traversal(left, paths, result)
        paths.pop()  // 回溯
      }
  
      if (right) {
        traversal(right, paths, result)
        paths.pop()  // 回溯
      }
    }
  
    const result: string[] = []
    if (root === null) return result
    traversal(root, [], result)
    return result
  };
}

// 递归 + 回溯 ==> 精简版
function binaryTreePaths(root: TreeNode): string[] {
  const result: string[] = []

  const traversal = (currNode: TreeNode, paths: number[]) => {
    if (currNode.left === null && currNode.right === null) {
      result.push([...paths, currNode.val].join('->'))
    }

    // 回溯就隐藏在 [...paths, currNode.val]。没有使用 paths.push()，每次函数调用完，paths 依然是上一次的结果，这就是回溯了。
    currNode.left && traversal(currNode.left, [...paths, currNode.val])
    currNode.right && traversal(currNode.right, [...paths, currNode.val])
  }

  traversal(root, [])
  return result
};

// 迭代 + 回溯
// TODO

console.log(binaryTreePaths(new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5)), new TreeNode(3))))