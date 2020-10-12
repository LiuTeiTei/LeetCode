/* 
https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/

给定一个二叉树，找出其最小深度。

最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

说明: 叶子节点是指没有子节点的节点。

示例:

给定二叉树 [3,9,20,null,null,15,7],

    3
   / \
  9  20
    /  \
   15   7
返回它的最小深度  2.
*/

//  Definition for a binary tree node.
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

// 注意，是最近叶子节点
// 首先可以想到使用深度优先搜索的方法，遍历整棵树，记录最小深度。
// 对于每一个非叶子节点，我们只需要分别计算其左右子树的最小叶子节点深度。
// 这样就将一个大问题转化为了小问题，可以递归地解决该问题。
// 时间复杂度：O(N)，其中 N 是树的节点数。对每个节点访问一次。
// 空间复杂度：O(H)，其中 H 是树的高度。
// 空间复杂度主要取决于递归时栈空间的开销，最坏情况下，树呈现链状，空间复杂度为 O(N)。
// 平均情况下树的高度与节点数的对数正相关，空间复杂度为 O(logN)。

var minDepth = function(root) {
    if (!root) return 0
    if (!root.left && !root.right) return 1

    let depth = Number.MAX_SAFE_INTEGER

    if (root.left) {
        depth = Math.min(minDepth(root.left), depth)
    }

    if (root.right) {
        depth = Math.min(minDepth(root.right), depth)
    }

    return depth + 1
};


let root = new TreeNode(1, new TreeNode(2), new TreeNode(3)) // 1
// let root = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7))) // 2
// let root = new TreeNode(-9, new TreeNode(-3, null, new TreeNode(4,new TreeNode(-6))), new TreeNode(2, new TreeNode(4), new TreeNode(0)))  // 3

console.log(minDepth(root))