// 第一题 广度优先遍历 层序遍历
function bfs(root) {
  const queue = []
  queue.push(root)
  let level = 1
  while (queue.length) {
    console.log(`-----level ${level}------`)
    level++
    const size = queue.length
    //加上这个for循环是为了获取第几层，并且第几层有哪些元素
    for (let i = 0; i < size; i++) {
      const curr = queue.shift()
      console.log(curr.value)
      if (curr.left) {
        queue.push(curr.left)
      }
      if (curr.right) {
        queue.push(curr.right)
      }
    }
  }
}

const root = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 4,
    },
  },
  right: {
    value: 3,
    left: {
      value: 5,
      left: {
        value: 7,
      },
      right: {
        value: 8,
      },
    },
    right: {
      value: 6,
    },
  },
}
// bfs(root)

//深度优先遍历
function depthFirstSearch(root) {
  if (root === null) {
    return
  }
  console.log(root.value)
  for (let i = 0; i < root.children.length; i++) {
    depthFirstSearch(root.children[i])
  }
}

// 括号对齐
function isValid(s) {
  const map = {
    "(": ")",
    "{": "}",
    "[": "]",
  }
  const stack = []
  for (let i = 0; i < s.length; i++) {
    const char = s[i]
    if (char in map) {
      stack.push(char)
    } else {
      const top = stack.pop()
      if (map[top] !== char) {
        return false
      }
    }
  }
  return stack.length === 0
}

//输入一个字符串，找到第一个不重复字符的下标
function firstNonRepeatingChar(str) {
  const map = {}
  for (let i = 0; i < str.length; i++) {
    if (!map[str[i]]) {
      map[str[i]] = 1
    } else {
      map[str[i]] += 1
    }
  }
  console.log(map)
  for (let k in map) {
    if (map[k] === 1) {
      return str.indexOf(k)
    }
  }
  return -1
}
// console.log(firstNonRepeatingChar("aaaacccdddfggg"))

// 输入一个字符串，打印出该字符串中所有字符的排列组合
function permute(str) {
  // 如果字符串长度为1,直接返回该字符串
  if (str.length === 1) {
    return [str]
  }
  let result = []
  // 遍历字符串的每个字符
  for (let i = 0; i < str.length; i++) {
    let char = str[i]
    // 获取当前字符之外的其他字符组成的子串
    let remainingChars = str.slice(0, i) + str.slice(i + 1)
    // 递归获取子串的所有排列组合
    let permutations = permute(remainingChars)
    // 将当前字符与子串的排列组合进行拼接,得到最终的结果
    for (let j = 0; j < permutations.length; j++) {
      result.push(char + permutations[j])
    }
  }
  return result
}
// console.log(permute("abc"))

//冒泡排序
function maopao(array) {
  for (let i = 0; i < array.length - 1; i++) {
    let swapped = true
    for (let j = 0; j < array.length - i - 1; j++) {
      console.log(i, j)
      if (array[j] > array[j + 1]) {
        ;[array[j], array[j + 1]] = [array[j + 1], array[j]]
        swapped = false
      }
    }
    if (swapped) break
  }
  return array
}

// console.log(maopao([3, 1, 2, 9, 4, 6, 15, 13, 10, 24, 16, 5, 7, 8, 44]))

//选择排序 它的工作原理是首先在未排序序列中找到最小（或最大）元素，存放到排序序列的起始位置

function selectionSort(array) {
  for (let i = 0; i < array.length; i++) {
    let minIndex = i
    for (let j = i; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j
      }
    }
    ;[array[minIndex], array[i]] = [array[i], array[minIndex]]
  }
  return array
}

// console.log(selectionSort([3, 1, 2, 9, 4, 6, 15, 13, 10, 24, 16, 5, 7, 8, 44]))

//快速排序 我们选择一个“基准”元素，
//然后将数组分为两部分：一部分包含所有比基准小的元素，另一部分包含所有比基准大的元素。
//这个过程递归地应用于子数组，直到整个数组被排序。
function quickSort(array) {
  if (array.length < 2) return array
  const start = array[Math.floor(array.length / 2)]
  const left = []
  const right = []
  for (let i = 0; i < array.length; i++) {
    if (array[i] < start) {
      left.push(array[i])
    }
    if (array[i] > start) {
      right.push(array[i])
    }
  }
  return [...quickSort(left), start, ...quickSort(right)]
}

// console.log(quickSort([3, 1, 2, 9, 4, 6, 15, 13, 10, 24, 16, 5, 7, 8, 44]))

const minSubArrayLen = function (target, nums) {
  const newArr = nums.sort((a, b) => a - b)
  let k = newArr.length - 1
  let result = []
  while (k >= 0) {
    const sum = newArr.slice(k).reduce((pre, cur) => {
      return pre + cur
    }, 0)
    if (sum >= target) {
      result = newArr.slice(k)
      break
    }
    k--
  }
  return result.length
}
// console.log(minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1]))

// function interval(count) {
//   function timer() {
//     setTimeout(() => {
//       console.log(count)
//       count--
//     }, 1000)
//     if (count >= 0) {
//       timer()
//     }
//   }
//   timer()
// }
// interval(30)

//求数组的所有子集
// function subsets(arr) {
//   if (arr.length === 0) return [[]]
//   let last = arr.pop()
//   let sub = subsets(arr)
//   let result = []
//   for (let i = 0; i < sub.length; i++) {
//     result.push(sub[i])
//     let clone = sub[i].slice()
//     clone.push(last)
//     result.push(clone)
//   }

//   return result
// }

// //
// function combinations(arr, k) {
//   let result = []

//   function generateCombination(start, current) {
//     if (current.length === k) {
//       result.push(current)
//       return
//     }

//     for (let i = start; i < arr.length; i++) {
//       generateCombination(i + 1, current.concat(arr[i]))
//     }
//   }

//   generateCombination(0, [])
//   return result
// }

// function permutations(arr) {
//   let result = []

//   function generatePermutation(current, remaining) {
//     if (remaining.length === 0) {
//       result.push(current)
//     } else {
//       for (let i = 0; i < remaining.length; i++) {
//         generatePermutation(
//           current.concat(remaining[i]),
//           remaining.slice(0, i).concat(remaining.slice(i + 1))
//         )
//       }
//     }
//   }

//   generatePermutation([], arr)
//   return result
// }

// function permuteCombinations(arr, k) {
//   let combs = combinations(arr, k)
//   let allPermutations = []

//   combs.forEach((comb) => {
//     let perms = permutations(comb)
//     allPermutations = allPermutations.concat(perms)
//   })

//   return allPermutations
// }

// // 示例用法
// let arr = [1, 2, 3, 4]
// let n = 3
// let result = permuteCombinations(arr, n)
// console.log(result)

//求数组的所有子集
function subsets(arr) {
  let result = [[]]
  for (let i = 0; i < arr.length; i++) {
    let temp = arr.slice(i + 1)
    let newSubsets = subsets(temp).map((subset) => [arr[i], ...subset])
    result = result.concat(newSubsets)
  }
  return result
}

// 使用示例
const arr = [1, 2, 3]
const subsetsArray = subsets(arr)
console.log(subsetsArray)

// 实现一个函数，使其满足
// 输入: array = [1, 2, 5, 2, -1, 3, 1, 2], sum = 4
// 输出: [[1,3], [1,3], [5,-1], [2,2], [2,2], [2,2]]

function findPairs(array, sum) {
  const len = array.length
  const result = []
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (array[i] + array[j] === sum) {
        result.push([array[i], array[j]])
      }
    }
  }
  return result
}

// 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

// 示例 1：
// 输入：nums = [100,4,200,1,3,2]
// 输出：4
// 解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。

// 示例 2：
// 输入：nums = [0,3,7,2,5,8,4,6,0,1]
// 输出：9

// 示例 2：
// 输入：nums = [0,3,7,2,5,8,4,4,6,0,1]
// 输出：5
