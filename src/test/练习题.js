//第一题
;(function () {
  function Foo() {
    Foo.a = function () {
      console.log(1)
    }
    this.a = function () {
      console.log(2)
    }
  }
  Foo.prototype.a = function () {
    console.log(3)
  }
  Foo.a = function () {
    console.log(4)
  }
  Foo.a() //4
  let obj = new Foo() //obj = {a:function () {console.log(2)}}
  obj.a() //2
  Foo.a() //1
})()
//第二题
/*
用 JavaScript 写一个函数，输入 int 型，返回整数逆序后的字符串。如：输入
整型 1234，返回字符串“4321”。要求必须使用递归函数调用，不能用全局变量，
输入函数必须只有一个参数传入，必须返回字符串。
*/

function fun(num) {
  let num1 = num / 10
  let num2 = num % 10
  if (num1 < 1) {
    return num
  } else {
    num1 = Math.floor(num1)
    return `${num2}${fun(num1)}`
  }
}
var a = fun(12345)
console.log(a)
console.log(typeof a)

//第三题
function changeObjProperty(o) {
  o.siteUrl = "http://www.baidu.com"
  o = new Object()
  o.siteUrl = "http://www.google.com"
}
let webSite = new Object()
changeObjProperty(webSite)
//webSite 属于复合数据类型，函数参数中以地址传递，修改值会影响到原始值，
//但如果将其完全替换成另一个值，则原来的值不会受到影响
console.log(webSite.siteUrl) // "http://www.baidu.com"

//第四题 深克隆

//第一种
function deepCopy(target, cache = new Set()) {
  if (typeof target !== "object" || cache.has(target)) {
    return target
  }
  if (Array.isArray(target)) {
    target.map((t) => {
      cache.add(t)
      return t
    })
  } else {
    return [
      ...Object.keys(target),
      ...Object.getOwnPropertySymbols(target),
    ].reduce(
      (res, key) => {
        cache.add(target[key])
        res[key] = deepCopy(target[key], cache)
        return res
      },
      target.constructor !== Object
        ? Object.create(target.constructor.prototype)
        : {}
    )
  }
}

//第二种

function DeepClone(value) {
  if (
    ["string", "number", "boolean", "null", "undefined"].includes(typeof value)
  ) {
    return value
  }

  const newClone = new value.constructor()

  for (let key in value) {
    newClone[key] = DeepClone(value[key])
  }
  return newClone
}

//第五题
/**给定两个大小为 m 和 n 的有序数组 nums1 和
nums2。请找出这两个有序数组的中位数。要求算法的时间复杂
度为 O(log(m+n)) */

const findMedianSortedArrays = function (nums1, nums2) {
  const lenN1 = nums1.length
  const lenN2 = nums2.length
  const median = Math.ceil((lenN1 + lenN2 + 1) / 2)
  const isOddLen = (lenN1 + lenN2) % 2 === 0
  const result = new Array() < number > median
  let i = 0 // pointer for nums1
  let j = 0 // pointer for nums2
  for (let k = 0; k < median; k++) {
    if (i < lenN1 && j < lenN2) {
      // tslint:disable-next-line:prefer-conditional-expression
      if (nums1[i] < nums2[j]) {
        result[i + j] = nums1[i++]
      } else {
        result[i + j] = nums2[j++]
      }
    } else if (i < lenN1) {
      result[i + j] = nums1[i++]
    } else if (j < lenN2) {
      result[i + j] = nums2[j++]
    }
  }
  if (isOddLen) {
    return (result[median - 1] + result[median - 2]) / 2
  } else {
    return result[median - 1]
  }
}

//第六题 实现Promise.race
Promise.prototype.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise
        .then((result) => {
          resolve(result)
        })
        .catch((error) => reject(error))
    })
  })
}
//第七题 实现Promise.all
Promise.prototype.myAll = function (promises) {
  return new Promise((resolve) => {
    let count = 0
    let result = []
    promises.forEach((promise, index) => {
      promise
        .then((value) => {
          count++
          result[index] = value
        })
        .catch((error) => {
          count++
          result[index] = error
        })
    })
    if (count === promises.length) {
      resolve(result)
    }
  })
}
//第八题 两数之和
function Sum(nums, target) {
  const map = {}
  for (let i = 0; i < nums.length; i++) {
    if (map[target - nums[i]]) {
      return [i, map[target - nums[i]]]
    } else {
      map[target - nums[i]] = i
    }
  }
}

//第九题旋转数组 newArr[(i+k)%len]=arr[i]

//第十题
// example 1
var a = {},
  b = "123",
  c = 123
a[b] = "b"
a[c] = "c"
console.log(a[b]) //c

// example 2
var a = {},
  b = Symbol("123"),
  c = Symbol("123")
a[b] = "b"
a[c] = "c"
console.log(a[b]) //b

// example 3
var a = {},
  b = { key: "123" },
  c = { key: "456" }
//对象类型会调用 toString 方法转换成字符串 [object Object]
a[b] = "b"
a[c] = "c"
console.log(a[b]) //c

//第十一题 优化版的冒泡
function maopao(arr) {
  const array = [...arr]
  let isOk = true
  for (let i = 0, len = array.length; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      if (array[i] > array[j]) {
        ;[array[i], array[j]] = [array[j], array[i]]
        isOk = false
      }
    }
    if (isOk) {
      Break
    }
  }
  return array
}

//第十题
var a = { n: 1 }
var b = a
a.x = a = { n: 2 }
console.log(a.x) //undefined
console.log(b.x) //{n:2}

// 题目：实现一个异步任务队列管理器
// 目标：
// 你的任务是实现一个名为 AsyncTaskQueue 的类，该类用于管理和执行异步任务，同时支持并发控制和高阶函数的应用。
// 基本要求：
// AsyncTaskQueue 类应该提供以下方法： ○ enqueue(task: () => Promise, priority?: number): 将一个异步任务添加到队列中。task 是返回Promise的函数。可选的 priority 参数用于控制任务的优先级（数值越小，优先级越高）。如果未提供 priority，默认为0。 ○ start(concurrency: number): 启动任务队列，concurrency 参数控制同时执行的任务数。 ○ pause(): 暂停任务队列的执行，已经开始的任务会继续执行直到完成。 ○ resume(): 恢复任务队列的执行。
// AsyncTaskQueue 应该确保在任何时刻，正在执行的任务数量不超过 concurrency 指定的数量。
// 当任务队列中的所有任务都完成时，start 方法应返回一个Promise，该Promise解析为所有任务的结果数组，保持任务完成的顺序。
// 示例用法：
// const queue = new AsyncTaskQueue();
// // 添加异步任务到队列
// queue.enqueue(() => new Promise(resolve => setTimeout(() => resolve('Task 1'), 1000)));
// queue.enqueue(() => new Promise(resolve => setTimeout(() => resolve('Task 2'), 500)), 1);
// queue.enqueue(() => new Promise(resolve => setTimeout(() => resolve('Task 3'), 1500)), 2);
// // 启动队列，最大并发数为2
// queue.start(2).then(results => {
//   console.log(results); // 应输出：['Task 2', 'Task 1', 'Task 3']
// });

const task = []
for (let i = 0; i < 10; i++) {
  task.push(new Promise((resolve) => resolve(i)))
}

async function asyncTask(list, count) {
  let pool = []
  const res = []
  for (let i = 0; i < list.length; i++) {
    const promise = list[i]
    promise.then((result) => {
      res.push(result)
      pool = pool.filter((pro) => pro != promise)
    })
    pool.push(promise)
    if (pool.length === count) {
      await Promise.race(pool)
    }
    console.log(res)
  }
  return res
}

console.log(asyncTask(task, 3))

// 实现一个路由规则解析
// 说明：
//   1. 路由规则用`:键名`来描述，如`/user/:userId`
//   2. 实现一个routeParse方法，给定路由规则和实际路由地址
//   3. 如匹配则返回键名和匹配值的对象，如`{userId: 12345}`
//   4. 如无匹配则返回null
