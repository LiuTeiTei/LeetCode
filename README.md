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

# 算法

## 回溯算法

- 回溯法也叫做回溯搜索法，是一种搜索的方式；

- 回溯法不是什么高效的算法，本质是穷举所有可能然后选出正确的答案，可以加一些剪枝操作提高效率，但改不了回溯法就是穷举的本质；
- 回溯是递归的副产品，只要有递归就会有回溯。

### 回溯算法模板

- 回溯法解决的问题都可以抽象为树形结构；
- 因为回溯法解决的都是在集合中递归查找子集，集合的大小就构成了树的宽度，递归的深度，都构成的树的深度；
- 递归就要有终止条件，所以必然是一棵高度有限的树（N 叉树）；
- <img src='images/回溯算法-树的遍历.png' alt='回溯算法-树的遍历' />

函数模板：

```
void backtracking(参数) {
    if (终止条件) {
        存放结果;
        return;
    }

    for (选择：本层集合中元素（树中节点孩子的数量就是集合的大小）) {
        处理节点;
        backtracking(路径，选择列表); // 递归
        回溯，撤销处理结果
    }
}
```

- 回溯算法中函数返回值一般为 void；
- for 循环可以理解是横向遍历，递归 backtracking 就是纵向遍历，这样就把这棵树全遍历完了；
  - for 循环就是遍历集合区间，可以理解一个节点有多少个孩子，这个 for 循环就执行多少次；
- 一般来说，搜索叶子节点就是找的其中一个结果了

### 回溯算法适用场景

- 组合问题：N 个数里面按一定规则找出 k 个数的集合；
- 切割问题：一个字符串按一定规则有几种切割方式；
- 子集问题：一个 N 个数的集合里有多少符合条件的子集；
- 排列问题：N 个数按一定规则全排列，有几种排列方式；
- 棋盘问题：N 皇后，解数独等等。

## 贪心算法

- 贪心的本质是选择每一阶段的局部最优，从而达到全局最优；

### 贪心算法解题步骤

- 将问题分解为若干个子问题；
- 找出适合的贪心策略；
- 求解每一个子问题的最优解；
- 将局部最优解堆叠成全局最优解。

## 动态规划

Dynamic Programming

- 动态规划中每一个状态一定是由上一个状态推导出来的，而贪心没有状态推导，从局部直接选最优。

### 动态规划解题步骤

- 确定 dp 数组（dp table）以及下标的含义；
- 确定递推公式；
- dp 数组如何初始化；
- 确定遍历顺序；
- 举例推导 dp 数组。

### 动态规划适用场景

- 基础题目；
- 背包问题：01 背包、完全背包、多重背包；

  - <img src='images/背包问题.png' alt='背包问题' />

- 打家劫舍；
- 股票问题；
- 子序列问题。

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
- [125. Valid Palindrome](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/125_valid-palindrome.ts)

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

### Combination

- [77. Combinations](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/77_Combinations.ts)
- [216. Combination Sum III](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/216_CombinationSumIII.ts)
- [17. Letter Combinations of a Phone Number](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/17_LetterCombinationsOfAPhoneNumber.ts)
- [39. Combination Sum](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/39_combination-sum.ts)
- [40. Combination Sum II](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/40_combination-sum-ii-sum.ts)

### Partition

- [131. Palindrome Partitioning](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/131_palindrome-partitioning.ts)
- [93. Restore IP Addresses](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/93_restore-ip-addresses.ts)

### Subset

- [78. Subsets](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/78_subsets.ts)
- [90. Subsets II](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/90_subsets-ii.ts)
- [491. Increasing Subsequences](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/491.increasing-subsequences.ts)

### Permutation

- [46. Permutations](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/46_permutations.ts)
- [47. Permutations II](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/47_permutations-ii.ts)
- [332. Reconstruct Itinerary](https://github.com/LiuTeiTei/LeetCode/blob/master/Hard/332_reconstruct-itinerary.ts)

## Greedy

### Easy

- [455. Assign Cookies](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/455_assign-cookies.ts)
- [1005. Maximize Sum Of Array After K Negations](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/1005_maximize-sum-of-array-after-k-negations.ts)
- [860. Lemonade Change](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/860_lemonade-change.ts)

### Medium

- [376. Wiggle Subsequence](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/376_wiggle-subsequence.ts)
- [53. Maximum Subarray](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/53_maximum-subarray.ts)
- [122. Best Time to Buy and Sell Stock II](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/122_best-time-to-buy-and-sell-stock-ii.ts)
- [55. Jump Game](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/55_jump-game.ts)
- [45. Jump Game II](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/45_jump-game-ii.ts)
- [134. Gas Station](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/134_gas-station.ts)
- [406. Queue Reconstruction by Height](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/406_queue-reconstruction-by-height.ts)
- [452. Minimum Number of Arrows to Burst Balloons](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/452_minimum-number-of-arrows-to-burst-balloons.ts)
- [435. Non-overlapping Intervals](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/435.non-overlapping-intervals.ts)

### Hard

- [32. Longest Valid Parentheses](https://github.com/LiuTeiTei/LeetCode/blob/master/Hard/32_longest-valid-parentheses.ts)
- [135. Candy](https://github.com/LiuTeiTei/LeetCode/blob/master/Hard/135_candy.ts)

## Dynamic Programming

### Basic

- [509. Fibonacci Number](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/509_fibonacci-number.ts)
- [70. Climbing Stairs](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/70_climbing-stairs.ts)
- [746. Min Cost Climbing Stairs](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/746_min-cost-climbing-stairs.ts)
- [62. Unique Paths](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/62_unique-paths.ts)
- [63. Unique Paths II](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/63_unique-paths-ii.ts)
- [343. Integer Break](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/343_integer-break.ts)
- [96. Unique Binary Search Trees](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/96_unique-binary-search-trees.ts)

### Knapsack

#### ZeroOnePack

- [416. Partition Equal Subset Sum](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/416_partition-equal-subset-sum.ts)
- [1049. Last Stone Weight II](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/1049_last-stone-weight-ii.ts)
- [494. Target Sum](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/494_target-sum.ts)
- [474. Ones and Zeroes](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/474_ones-and-zeroes.ts)

#### CompletePack

- [518. Coin Change II](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/518_coin-change-ii.ts)
- [377. Combination Sum IV](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/377_combination-sum-iv.ts)
- [70. Climbing Stairs](https://github.com/LiuTeiTei/LeetCode/blob/master/Easy/70_climbing-stairs.ts)
- [322. Coin Change](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/322_coin-change.ts)
- [279. Perfect Squares](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/279_perfect-squares.ts)
- [139. Word Break](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/139_word-break.ts)

#### HouseRobber

- [139. House Robber](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/198_house-robber.ts)
- [213. House Robber II](https://github.com/LiuTeiTei/LeetCode/blob/master/Medium/213.house-robber-ii.ts)
