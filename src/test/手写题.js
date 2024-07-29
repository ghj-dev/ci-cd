// 实现new操作符
function myNew(constructor, ...args) {
  //创建一个空对象
  const obj = {}
  //将构造函数的原型指向对象的原型 Object.setPrototypeOf()
  Object.setPrototypeOf(obj, constructor.prototype)
  obj.__proto__ = constructor.prototype
  //将this指向新对象
  const result = constructor.call(obj, ...args)
  return result instanceof Object ? result : obj
}

//使用promise封装ajax的请求
function myAjax(url, method = "get", data = null) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url, true)

    if (method === "post") {
      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded")
    }

    xhr.onload = function () {
      if (this.status === 200) {
        resolve(this.responseText)
      } else {
        reject(new Error(this.responseText))
      }
    }

    xhr.onerror = function () {
      reject(new Error("netword error"))
    }

    if (data) {
      resolve(data)
    } else {
      resolve()
    }
  })
}

//实现数组的扁平化
function myFlat(arr) {
  const result = []
  flat(arr, result)
}

function flat(arr, result) {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    if (Array.isArray(arr[i])) {
      flat(arr[i], result)
    } else {
      result.push(arr[i])
    }
  }
}

// myFlat([1, [2, 3], [4], 6])

//实现版本的排序
function sortVer(arr) {
  return arr.sort((a, b) => {
    const aArr = a.split(".")
    const bArr = b.split(".")
    for (let i = 0; i < aArr.length || i < bArr.length; i++) {
      const ai = aArr[i] || 0
      const bi = bArr[i] || 0
      if (ai !== bi) {
        return ai - bi
      }
    }
    return 0
  })
}
// console.log(
//   sortVer(["1.1.1", "2.0.5", "1.0.3", "1.0.3", "2.5.0", "3.0.0", "0.3.4"])
// )

//实现柯里化函数 add(1)(2)(3)
function add() {
  const args = Array.from(arguments)
  function inner() {
    args.push(...arguments)
    return inner
  }
  inner.toString = function () {
    return args.reduce((pre, cur) => pre + cur, 0)
  }
  return inner
}
// console.log(add(1)(2)(3).toString())

//使用promise实现图片的异步加载
function imgLoad(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = function () {
      resolve(img)
    }
    img.onerror = function (error) {
      reject(error)
    }
    img.src = url
  })
}

//实现发布订阅模式 订阅事件 取消事件 发布事件

class Pub {
  constructor() {
    this.eventMap = {}
  }
  sub(event, callback) {
    if (!this.eventMap[event]) {
      this.eventMap[event] = []
    }
    this.eventMap[event].push(callback)
  }
  unSub(event, callback) {
    if (this.eventMap[event]) {
      this.eventMap[event] = this.eventMap[event].filter(
        (filterCallback) => filterCallback !== callback
      )
    }
  }
  publish(event, data) {
    if (this.eventMap[event]) {
      this.eventMap[event].forEach((callback) => callback(data))
    }
  }
}

//请求重试

function retry(fn, count) {
  return new Promise((resolve, reject) => {
    async function implement() {
      try {
        await fn()
      } catch (error) {
        if (count <= 0) {
          reject(error)
        }
        implement()
        count--
      }
    }
    implement()
  })
}

//封装fetch函数
async function fetchData(url, option) {
  try {
    const res = fetch(url, option)
    if (!res.ok) {
      throw new Error("xxxx")
    }
    const data = await res.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}

//实现斐波那契数列
//1.递归
// function fib(n) {
//   if (n <= 1) return n
//   return fib(n - 1) + fib(n - 2)
// }

function fib(n) {
  return fiber(0, 1, n)
}
function fiber(a, b, n) {
  if (n === 0) return a
  return fiber(b, b + a, n - 1)
}
function fibonacciIterative(n) {
  let a = 0,
    b = 1,
    temp
  if (n === 0) return a
  if (n === 1) return b

  for (let i = 2; i < n; i++) {
    temp = a + b
    a = b
    b = temp
  }
  return b
}

//使用setTimeout实现setInterVal
function mySetInterVal(callback, delay) {
  callback()
  let interval = setTimeout(() => {
    clearTimeout(interval)
    mySetInterVal(callback, delay)
    callback()
  }, delay)
}

//深拷贝
function deepCopy(value) {
  if (typeof value !== "object" || value === null) {
    return value
  }
  const newClone = new value.constructor()
  for (let k in value) {
    newClone[k] = deepCopy(value[k])
  }
  return newClone
}

//将千分位用逗号隔开 num.toLocaleString('en-US')

function splitNum(num) {
  const [start, end] = num.toString().split(".")
  const arr = start.split("")
  for (let i = arr.length - 3; i >= 0; i -= 3) {
    console.log(i, arr[i])
    arr.splice(i, 0, ",")
  }
  console.log(arr.join(""))
}
// splitNum(1234567.89)

//数组去重

function uniq(arr) {
  const result = []
  for (let i = 0; i < arr.length; i++) {
    if (!result.includes(arr[i])) {
      result.push(arr[i])
    }
  }
  return result
}
function uniq2(arr) {
  const map = {}
  for (let i = 0; i < arr.length; i++) {
    if (!map[arr[i]]) {
      map[arr[i]] = arr[i]
    }
  }
  console.log(map)
  return Object.values(map)
}

// console.log(uniq([1, 2, 4, 6, 3, 3, 5, 2, 5, 7]))
// console.log(uniq2([1, 2, 4, 6, 3, 3, 5, 2, 5, 7]))

//手写promise

const PENDING = "PENDING"
const FUFILLED = "FUFILLED"
const REJECTED = "REJECTED"
class MyPromise {
  constructor(exetor) {
    this.status = PENDING
    this.value = undefined
    this.reson = undefined

    this.resolveCallbackList = []
    this.rejectedCallbackList = []

    let resolve = function (value) {
      if (this.status === PENDING) {
        this.value = value
        this.status = FUFILLED
        this.resolveCallbackList.forEach((fn) => fn())
      }
    }

    let reject = function (reson) {
      if (this.status === PENDING) {
        this.reson = reson
        this.status = REJECTED
        this.rejectedCallbackList.forEach((fn) => fn())
      }
    }

    try {
      exetor(resolve, reject)
    } catch (error) {}
  }

  then(onFufilled, onRejected) {
    const promise = new MyPromise((resolve, reject) => {
      onFufilled =
        typeof onFufilled === "function" ? onFufilled : (value) => value
      onRejected =
        typeof onRejected === "function" ? onRejected : (reson) => reson
    })

    if (this.status === FUFILLED) {
      setTimeout(() => {
        const value = onFufilled(this.value)
        resolve(value)
      }, 0)
    }
    if (this.status === REJECTED) {
      setTimeout(() => {
        const reson = onRejected(this.reson)
        reject(reson)
      }, 0)
    }
    if (this.status === PENDING) {
      this.resolveCallbackList.push(
        setTimeout(() => {
          const value = onFufilled(this.value)
          resolve(value)
        }, 0)
      )
      this.rejectedCallbackList.push(
        setTimeout(() => {
          const reson = onRejected(this.reson)
          reject(reson)
        }, 0)
      )
    }
  }

  then(onFufilled, onRejected) {
    const promise = new MyPromise((resolve, reject) => {
      onFufilled =
        typeof onFufilled === "function" ? onFufilled : (value) => value
      onRejected =
        typeof onRejected === "function" ? onRejected : (reson) => reson

      if (this.status === FUFILLED) {
        setTimeout(() => {
          const value = onFufilled(this.value)
          this.resolvePromoise(promise, value, resolve, reject)
        }, 0)
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          const value = onRejected(this.reson)
          this.resolvePromoise(promise, value, resolve, reject)
        }, 0)
      }
      if (this.status === PENDING) {
        this.resolveCallbackList.push(
          setTimeout(() => {
            const value = onFufilled(this.value)
            this.resolvePromoise(promise, value, resolve, reject)
          }, 0)
        )
        this.rejectedCallbackList.push(
          setTimeout(() => {
            const value = onRejected(this.reson)
            this.resolvePromoise(promise, value, resolve, reject)
          }, 0)
        )
      }
    })

    // if (this.status === REJECTED) {
    //   onRejected(this.reson)
    // }
    // if (this.status === PENDING) {
    //   this.resolveCallbackList.push(onFufilled(this.value))
    //   this.rejectedCallbackList.push(onRejected(this.value))
    // }
    return promise
  }
  resolvePromoise(promise, value, resolve, reject) {
    if (promise === value) {
      return reject(new Error("xxx"))
    }
    if (value instanceof MyPromise) {
      value.then((value) => {
        this.resolvePromoise(promise, value, resolve, reject)
      })
    } else if (
      value !== null &&
      (typeof value === "object" || typeof value === "function")
    ) {
      then = value.then
      if (typeof then === "function") {
        then.call(
          value,
          (result) => {
            this.resolvePromoise(promise, result, resolve, reject)
          },
          (reson) => reject(reson)
        )
      } else {
        resolve(value)
      }
    } else {
      resolve(value)
    }
  }
  catch(onRejected) {
    return this.then.call(null, onRejected)
  }

  // catch(onRejected) {
  //   this.then.call(null, onRejected)
  // }
}

//实现call，aplly，bind
Function.prototype.MyCall = function (context, ...args) {
  context = context | window
  const fn = Symbol()
  context[fn] = this
  const result = context[fn](...args)
  delete context[fn]
  return result
}

Function.prototype.bind = function (context) {
  const _this = this
  const args = Array.prototype.slice.call(arguments)
  return function () {
    return _this.MyCall(context, ...args, ...arguments)
  }
}

//手写观察者模式 主题对象，存储观察者对象，观察者对象
class Subject {
  constructor() {
    this.observers = []
  }
  add(observer) {
    this.observers.push(observer)
  }
  remove(observer) {
    this.observers = this.observers.filter((ob) => ob !== observer)
  }
  notifiy() {
    this.observers.forEach((ob) => ob.update())
  }
}

class Observer {
  constructor(name) {
    this.name = name
  }
  update() {
    console.log(`${this.name} received`)
  }
}

//控制并发数
async function fnrun(array, max) {
  let pool = []
  for (let i = 0; i < array.length; i++) {
    const promise = array[i]
    promise.then(() => {
      pool.splice(pool.indexOf(promise), 1)
    })
    pool.push(promise)
    if (pool.length === max) {
      await Promise.race(pool)
    }
  }
}

// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

// 有效字符串需满足：

// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 每个右括号都有一个对应的相同类型的左括号。

// 示例 1：

// 输入：s = "()"
// 输出：true
// 示例 2：

// 输入：s = "()[]{}"
// 输出：true
// 示例 3：

// 输入：s = "(]"
// 输出：false

//单例模式
function getSingleInstance(func) {
  let instance
  let handler = {
    construct(target, args) {
      if (!instance) instance = Reflect.construct(func, args)
      return instance
    },
  }
  return new Proxy(func, handler)
}

class Single {
  constructor() {
    this.instance = undefined
  }
  getInstall() {
    if (this.instance) {
      this.instance = new Single()
    }
    return this.instance
  }
}
//单例模式
const Singleton = (function () {
  let instance

  function createInstance() {
    const object = new Object("I am the instance")
    return object
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance()
      }
      return instance
    },
  }
})()

//通过闭包实现一个私有变量
function createStack() {
  // 私有变量
  const items = []
  // 形成独立作用域 + 模块
  return {
    push(item) {
      items.push(item)
    },
    setItem() {},
    getItem() {
      return items
    },
  }
}

// const a = createStack()
// const b = createStack()
// a.push("aaa")
// b.push("bbb")
// console.log(a.getItem(), b.getItem())

//组合式寄生
function Game() {
  this.name = "abc"
  this.fn = function () {
    console.log(this.name)
  }
}

function Child(...args) {
  Game.call(this, ...args)
  this.child = "123"
}
Child.prototype = Object.create(Game.prototype)

//实现 instanceof 方法
function myInstanceof(obj, ctor) {
  let proto = Object.getPrototypeOf(obj)
  let prototype = ctor.prototype
  while (true) {
    if (!proto) return false
    if (proto === prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}

//比较2个对象相等
function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true
  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  )
    return false

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) return false

  for (let key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false
  }

  return true
}
