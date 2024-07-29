function quickSort(arr) {
  const len = arr.length
  if (arr.length < 2) return arr
  const mid = arr[Math.floor(len / 2)]
  const left = []
  const right = []
  for (let i = 0; i < len; i++) {
    if (arr[i] > mid) {
      right.push(arr[i])
    } else if (arr[i] < mid) {
      left.push(arr[i])
    }
  }
  return [...quickSort(left), mid, [...quickSort(right)]]
}

function add(arg) {
  const arr = [arg]
  function inner(arg2) {
    arr.push(arg2)
    return inner
  }
  inner.value = function () {
    return arr.reduce((pre, cur) => pre + cur, 0)
  }
  return inner
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
