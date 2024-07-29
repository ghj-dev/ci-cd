// worker.js
self.onmessage = function (event) {
  const data = event.data
  const result = longRunningTask(data)
  postMessage(result)
}

function longRunningTask() {
  // 计算密集型任务
  let sum = 0
  for (let i = 0; i < 1000000000; i++) {
    sum += i
  }
  return sum
}
