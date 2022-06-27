# 数据结构

## String

## Stack & List

## Tree

### 二叉树的分类

#### 满二叉树

- 如果一棵二叉树只有度为 0 的结点和度为 2 的结点，并且度为 0 的结点在同一层上，则这棵二叉树为满二叉树；
- 深度为 k，有 2^k-1 个节点的二叉树；
- 如图：<img src='images/满二叉树.png' alt='满二叉树' width=200 height=160 />

#### 完全二叉树

- 除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的若干位置；
- 若最底层为第 h 层，则该层包含 1~ 2^(h-1) 个节点；
- 如图：<img src='images/完全二叉树.png' alt='完全二叉树' width=650 height=300 />

#### 二叉搜索树

- 有值且有序：
  - 若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值；
  - 若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值；
  - 它的左、右子树也分别为二叉搜索树。
- 如图：<img src='images/二叉搜索树.png' alt='二叉搜索树' width=400 height=150 />

#### 平衡二叉搜索树

- AVL（Adelson-Velsky and Landis）树；
- 一棵空树，它的左右两个子树的高度差的绝对值不超过 1，并且左右两个子树都是一棵平衡二叉树；
- 如图：<img src='images/平衡二叉搜索树.png' alt='平衡二叉搜索树' width=550 height=160 />

### 二叉树的存储

### 二叉树的遍历

例如：<img src='images/二叉树的遍历.png' alt='二叉树的遍历' width=400 height=150 />

#### 深度优先遍历

先往深走，遇到叶子节点再往回走。

这里前中后，其实指的就是中间节点的遍历顺序。

##### 前序遍历

- 顺序：中 ==〉左 ==〉右

- 10 6 3 9 16 14 19

- ```javascript
  // 递归方法
  function preorderTraversal(root: TreeNode | null): number[] {
    const traversal = (currTree: TreeNode | null, result: number[]): void => {
      if (currTree === null) return
      result.push(currTree.val)
      traversal(currTree.left, result)
      traversal(currTree.right, result)
    }

    const result: number[] = []
    traversal(root, result)
    return result
  };

  // 迭代方法
  function preorderTraversal(root: TreeNode | null): number[] {
    if (root === null) return []

    const result: number[] = []
    const treeStack: TreeNode[] = []
    let currTree = root
    treeStack.push(root)

    // 抛出中间节点，压入右节点，再压入左节点，如此循环
    while(treeStack.length > 0) {
      currTree = treeStack.pop()!
      result.push(currTree.val)
      if (currTree.right !== null) treeStack.push(currTree.right)
      if (currTree.left !== null) treeStack.push(currTree.left)
    }

    return result
  };
  ```

##### 中序遍历

- 顺序：左 ==〉中 ==〉右

- 3 6 9 10 14 16 19

- ```javascript
  // 递归方法
  function inorderTraversal(root: TreeNode | null): number[] {
    const traversal = (currTree: TreeNode | null, result: number[]): void => {
      if (currTree === null) return
      traversal(currTree.left, result)
      result.push(currTree.val)
      traversal(currTree.right, result)
    }

    const result: number[] = []
    traversal(root, result)
    return result
  };

  // 迭代方法
  function inorderTraversal(root: TreeNode | null): number[] {
    if (root === null) return []

    const result: number[] = []
    const treeStack: TreeNode[] = []
    let currTree: TreeNode | null = root

    // 压入左节点直到左叶子，抛出左叶子，抛出中间节点，压入右节点，继续压入左节点直到左叶子......
    while(currTree !== null || treeStack.length > 0) {
      if (currTree !== null) {
        treeStack.push(currTree)
        currTree = currTree.left
      } else {
        currTree = treeStack.pop()!
        result.push(currTree.val)
        currTree = currTree.right
      }
    }

    return result
  };
  ```

##### 后序遍历

- 顺序：左 ==〉右 ==〉中

- 3 9 6 14 19 16 10

- ```javascript
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
  ```

#### 广度优先遍历

一层一层的去遍历。

##### 层次遍历

- 顺序：从左往右一层层

- 10 6 16 3 9 14 19

- ```javascript
  // 递归方法


  // 迭代方法
  function levelOrder(root: TreeNode | null): number[][] {
    if (root === null) return []

    const queue: TreeNode[] = []
    const result: number[][] = []
    queue.push(root)

    while(queue.length > 0) {
      const rank = queue.length
      const tempResult: number[] = []
      for (let i = 0; i < rank; i++){
        const currNode = queue.shift()!
        tempResult.push(currNode.val)
        if (currNode.left !== null) {
          queue.push(currNode.left)
        }
        if (currNode.right !== null) {
          queue.push(currNode.right)
        }
      }
      result.push(tempResult)
    }

    return result
  };
  ```

### 树的构造

- 二叉树：

  ```javascript
  class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
      this.val = val ?? 0;
      this.left = left ?? null;
      this.right = right ?? null;
    }
  }

  const tree = new TreeNode(
    1,
    new TreeNode(2, new TreeNode(4), new TreeNode(5)),
    new TreeNode(3, new TreeNode(6), new TreeNode(7))
  );
  ```

- N 叉树：

  ```javascript
  class Node {
    val: number;
    children: Node[];

    constructor(val?: number, children?: Node[]) {
      this.val = val ?? 0;
      this.children = children ?? [];
    }
  }
  ```

# LeetCode

## Easy

- [35. Search Insert Position](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/35_SearchInsertPosition.ts)
- [111. Minimum Depth of Binary Tree](https://github.com/AngelHalo-16/LeetCode/blob/master/Easy/111_MinimumDepthOfBinaryTree.js)
- [155. Min Stack](https://github.com/AngelHalo-16/LeetCode/blob/master/Easy/155_MinStack.js)
- [219. Contains Duplicate II](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/219_ContainsDuplicateII.js)
- [303. Range Sum Query - Immutable](https://github.com/AngelHalo-16/LeetCode/blob/master/Easy/303_RangeSumQueryImmutable.js)
- [401. Binary Watch](https://github.com/AngelHalo-16/LeetCode/blob/master/Easy/401_BinaryWatch.js)
- [404. Sum of Left Leaves](https://github.com/AngelHalo-16/LeetCode/blob/master/Easy/404_SumofLeftLeaves.js)
- [415. Add Strings](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/415_Add%20Strings.js)
- [448. Find All Numbers Disappeared in an Array](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/448_FindAllNumbersDisappearedInAnArray.js)
- [504. Base 7](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/504_Base7.js)
- [506. Relative Ranks](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/506_RelativeRanks.js)
- [561. Array Partition I](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/561_ArrayPartitionI.js)
- [563. Binary Tree Tilt](https://github.com/AngelHalo-16/LeetCode/blob/master/Easy/563_BinaryTreeTilt.js)
- [674. Longest Continuous Increasing Subsequence](https://github.com/AngelHalo-16/LeetCode/blob/master/Easy/674_LongestContinuousIncreasingSubsequence.js)
- [703. Kth Largest Element in a Stream](https://github.com/AngelHalo-16/LeetCode/blob/master/Easy/703_KthLargestElementInAStream.js)
- [868. Binary Gap](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/868_BinaryGap.js)
- [874. Walking Robot Simulation](https://github.com/AngelHalo-16/LeetCode/blob/master/Easy/874_WalkingRobotSimulation.js)
- [942. DI String Match](https://github.com/AngelHalo-16/LeetCode/blob/master/Easy/942_DIStringMatch.js)
- [944. Delete Columns to Make Sorted](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/944_DeleteColumnsToMakeSorted.js)
- [1185. Day of the Week](https://github.com/AngelHalo-16/LeetCode/blob/master/Easy/1185_DayOfTheWeek.js)
- [1309. Decrypt String from Alphabet to Integer Mapping](https://github.com/AngelHalo-16/LeetCode/blob/master/Easy/1309_DecryptStringfromAlphabetToIntegerMapping.js)

## Medium

- [3. Longest Substring Without Repeating Characters](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/3_LongestSubstringWithoutRepeatingCharacters.ts)
- [7. Reverse Integer](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/7_ReverseInteger.ts)
- [34. Find First and Last Position of Element in Sorted Array](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/34_FindFirstAndLastPositionOfElementInSortedArray.ts)

## Array

### Easy

- [704. Binary Search](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/704_BinarySearch.ts)
- [27. Remove Element](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/27_RemoveElement.ts)
- [977. Squares of a Sorted Array](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/977_SquaresOfASortedArray.ts)

### Medium

- [209. Minimum Size Subarray Sum](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/209_MinimumSizeSubarraySum.ts)
- [59. Spiral Matrix II](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/59_SpiralMatrixII.ts)

## Link

### Easy

- [203. Remove Linked List Elements](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/203_RemoveLinkedListElements.ts)
- [206. Reverse Linked List](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/206_ReverseLinkedList.ts)
- [160. Intersection of Two Linked Lists](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/160_IntersectionOfTwoLinkedLists.ts)

### Medium

- [707. Design Linked List](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/707_DesignLinkedList.ts)
- [24. Swap Nodes in Pairs](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/24_SwapNodesInPairs.ts)
- [19. Remove Nth Node From End of List](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/19_RemoveNthNodeFromEndOfList.ts)
- [142. Linked List Cycle II](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/142_LinkedListCycleII.ts)

## Hash Set Map

### Easy

- [242. Valid Anagram](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/242_ValidAnagram.ts)
- [1002. Find Common Characters](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/1002_FindCommonCharacters.ts)
- [349. Intersection of Two Arrays](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/349_IntersectionOfTwoArrays.ts)
- [202. Happy Number](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/202_HappyNumber.ts)
- [1. Two Sum](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/1_TwoSum.ts)
- [383. Ransom Note](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/383_RansomNote.ts)

### Medium

- [454. 4Sum II](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/454_4SumII.ts)
- [15. 3Sum](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/15_3Sum.ts)
- [18. 4Sum](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/18_4Sum.ts)

## String

### Easy

- [344. Reverse String](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/344_ReverseString.ts)
- [541. Reverse String II](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/541_ReverseStringII.ts)
- [剑指 Offer 58 - II. 左旋转字符串](https://github.com/LiuTeiTei/LeetCode/blob/master/Others/58_II_ReverseLeftWords.ts)
- [trimSpace](https://github.com/LiuTeiTei/LeetCode/blob/master/Others/trimSpace.ts)
- [28. Implement strStr](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/28_ImplementStrStr.ts)
- [459. Repeated Substring Pattern](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/459_RepeatedSubstringPattern.ts)

### Medium

- [151. Reverse Words in a String](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/151_ReverseWordsInAString.ts)

## Stack & List

### Easy

- [232. Implement Queue using Stacks](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/232_ImplementQueueUsingStacks.ts)
- [225. Implement Stack using Queues](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/225_ImplementStackUsingQueues.ts)
- [20. Valid Parentheses](https://github.com/AngelHalo-16/LeetCode/blob/master/Easy/20_ValidParentheses.ts)
- [1047. Remove All Adjacent Duplicates In String](https://github.com/AngelHalo-16/LeetCode/blob/master/Easy/1047_RemoveAllAdjacentDuplicatesInString.ts)

### Medium

- [150. Evaluate Reverse Polish Notation](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/150_EvaluateReversePolishNotation.ts)
- [347. Top K Frequent Elements](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/347_TopKFrequentElements.ts)

### Hard

- [239. Sliding Window Maximum](https://github.com/LiuTeiTei/LeetCode/blob/master/Hard/239_SlidingWindowMaximum.ts)

## Tree

### Easy

- [144. 94. 145. TraversalTree](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/144_94_145_TraversalTree.ts)
- [226. Invert Binary Tree](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/226_InvertBinaryTree.ts)
- [101. Symmetric Tree](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/101_SymmetricTree.ts)
- [104. Maximum Depth of Binary Tree](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/104_MaximumDepthOfBinaryTree.ts)
- [559. Maximum Depth of N-ary Tree](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/559_MaximumDepthOfN-aryTree.ts)
- [111. Minimum Depth of Binary Tree](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/111_MinimumDepthOfBinaryTree.ts)
- [110. Balanced Binary Tree](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/110_BalancedBinaryTree.ts)
- [257. Binary Tree Paths](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/257_BinaryTreePaths.ts)

### Medium

- [102. Binary Tree Level Order Traversal](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/102_BinaryTreeLevelOrderTraversal.ts)
- [222. Count Complete Tree Nodes](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/222_CountCompleteTreeNodes.ts)

## Backtracking

### Medium

- [77. Combinations](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/77_Combinations.ts)
