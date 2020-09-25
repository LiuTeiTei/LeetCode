/* 
给定一个二叉树，计算整个树的坡度。
一个树的节点的坡度定义即为，该节点左子树的结点之和和右子树结点之和的差的绝对值。空结点的的坡度是0。
整个树的坡度就是其所有节点的坡度之和。

输入：
         1
       /   \
      2     3
输出：1
解释：
结点 2 的坡度: 0
结点 3 的坡度: 0
结点 1 的坡度: |2-3| = 1
树的坡度 : 0 + 0 + 1 = 1
*/


//  Definition for a binary tree node.
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}


let findTilt = function(root) {
    let tile = 0

    let subTilt = function(subRoot) {
        if (subRoot == null) return 0
        let leftTilt = subTilt(subRoot.left)
        let rightTilt = subTilt(subRoot.right)
        tile = tile + Math.abs(leftTilt - rightTilt)
        return leftTilt + rightTilt + subRoot.val
    }

    subTilt(root)
    return tile
};

// let root = new TreeNode(4, new TreeNode(3), new TreeNode(6))
let root = new TreeNode(5, new TreeNode(2, new TreeNode(3), new TreeNode(1)), new TreeNode(4, new TreeNode(6), new TreeNode(5)))
console.log(findTilt(root))