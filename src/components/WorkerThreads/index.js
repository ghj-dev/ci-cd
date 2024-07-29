//npm install worker_threads

//在 app 目录下创建一个 workers 目录，并在其中创建一个 queryWorker.js 文件，用于处理 API 数量查询和排序。

// app/workers/queryWorker.js

const { parentPort, workerData } = require("worker_threads")
const mongoose = require("mongoose")

async function queryAndSortData() {
  const { dbUri, query, sort } = workerData

  // 连接 MongoDB
  await mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  // 假设有一个名为 'ApiData' 的模型
  const ApiData = mongoose.model(
    "ApiData",
    new mongoose.Schema({
      name: String,
      count: Number,
    })
  )

  // 执行查询和排序操作
  const result = await ApiData.find(query).sort(sort)

  // 关闭数据库连接
  await mongoose.connection.close()

  // 向主线程发送结果
  parentPort.postMessage(result)
}

queryAndSortData().catch((err) => {
  parentPort.postMessage({ error: err.message })
})

//在 app/controller 目录下创建一个新的控制器文件 api.js，用于处理 API 请求
// app/controller/api.js

const { Controller } = require("egg")
const { Worker } = require("worker_threads")
const path = require("path")

class ApiController extends Controller {
  async queryAndSort() {
    const { ctx } = this
    const dbUri = "mongodb://localhost:27017/yourdatabase" // 替换为实际的数据库 URI
    const query = {} // 自定义查询条件
    const sort = { count: -1 } // 自定义排序条件

    // 创建一个 Worker 线程
    const worker = new Worker(
      path.resolve(__dirname, "../workers/queryWorker.js"),
      {
        workerData: { dbUri, query, sort },
      }
    )

    // 监听 Worker 线程的消息
    worker.on("message", (result) => {
      if (result.error) {
        ctx.body = { error: result.error }
      } else {
        ctx.body = { data: result }
      }
      worker.terminate()
    })

    // 监听 Worker 线程的错误
    worker.on("error", (err) => {
      ctx.body = { error: err.message }
      worker.terminate()
    })
  }
}

module.exports = ApiController

// app/router.js
module.exports = (app) => {
  const { router, controller } = app
  router.get("/api/query-and-sort", controller.api.queryAndSort)
}
