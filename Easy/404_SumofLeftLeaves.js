/* 
https://leetcode.com/problems/sum-of-left-leaves/
计算给定二叉树的所有左叶子之和。

示例：
    3
   / \
  9  20
    /  \
   15   7

在这个二叉树中，有两个左叶子，分别是 9 和 15，所以返回 24
*/


//  Definition for a binary tree node.
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}


// 左叶子！不是左节点！
// 需要考虑空树的情况
// 对整棵树进行遍历，当遍历到节点时，如果其左子节点是一个叶子节点，将其值进行累加
{
    let sumOfLeftLeaves = function(root) {
        let sum = 0
    
        let subSumOfLeft = function(subRoot) {
            if (subRoot === null) return 0
            let leftSum = subSumOfLeft(subRoot.left)
            let rightSum = subSumOfLeft(subRoot.right)
            // 判断是个父节点即以上
            if (subRoot.left) {
                // 判断是个左叶子
                if (subRoot.left.left === null && subRoot.left.right === null) {
                    sum += subRoot.left.val
                }        
            }
        }
    
        subSumOfLeft(root)
        return sum
    };
}


// 深度优先搜索
// 时间复杂度：O(n)，其中 n 是树中的节点个数。
// 空间复杂度：O(n)。
// 空间复杂度与深度优先搜索使用的栈的最大深度相关。在最坏的情况下，树呈现链式结构，深度为 O(n)，对应的空间复杂度也为 O(n)。
{
    let isLeafNode = function (node) {
        return !node.left && !node.right
    }

    let dfs = function (node) {
        let sum = 0;
        if (node.left) {
            sum = sum + isLeafNode(node.left) ? node.left.val : dfs(node.left)
        }
        if (node.right && !isLeafNode(node.right)) {
            sum = sum + dfs(node.right)
        }
        return sum
    }

    let sumOfLeftLeaves = function (root) {
        return root ? dfs(root) : 0
    }
}


// let root = new TreeNode(1, new TreeNode(2), new TreeNode(3)) // 2
let root = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7))) // 24
// let root = new TreeNode(-9, new TreeNode(-3, null, new TreeNode(4,new TreeNode(-6))), new TreeNode(2, new TreeNode(4), new TreeNode(0)))  // -2
console.log(sumOfLeftLeaves(root))


