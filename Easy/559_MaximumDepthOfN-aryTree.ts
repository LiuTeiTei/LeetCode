/* 
https://leetcode.com/problems/maximum-depth-of-n-ary-tree/
https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0104.%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E6%9C%80%E5%A4%A7%E6%B7%B1%E5%BA%A6.md

给定一个 N 叉树，找到其最大深度。
最大深度是指从根节点到最远叶子节点的最长路径上的节点总数。
N 叉树输入按层序遍历序列化表示，每组子节点由空值分隔（请参见示例）。

示例 1：
输入：root = [1,null,3,2,4,null,5,6]
输出：3

示例 2：
输入：root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
输出：5
 
提示：
树的深度不会超过 1000 。
树的节点数目位于 [0, 104] 之间。
*/

/**
 * Definition for Node.
 * class Node {
 *     val: number
 *     children: Node[]
 *     constructor(val?: number, children?: Node[]) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.children = (children===undefined ? [] : children)
 *     }
 * }
 */

/** Definition for a binary tree node. */
class Node {
  val: number
  children: Node[]

  constructor(val?: number, children?: Node[]) {
    this.val = val ?? 0
    this.children = children ?? []
  }
}

// 迭代方法，利用层序遍历
{
  function maxDepth(root: Node | null): number {
    let result = 0
    if (root === null) return result
  
    const queue: Node[] = []
    queue.push(root)
    while (queue.length > 0) {
      result++
      let len = queue.length
      while (len--) {
        const currNode = queue.shift()!
        if (currNode.children.length > 0) {
          currNode.children.forEach(child => child && queue.push(child))
        }
      }
    }
  
    return result
  };
}

// 递归方法
function maxDepth(root: Node | null): number {
  let result = 0
  if (root === null) return result

  root.children.forEach(node => {
    result = Math.max(result, maxDepth(node))
  })

  return result + 1
};