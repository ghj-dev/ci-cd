// 配置 config/plugin.js：
exports.mongoose = {
  enable: true,
  package: "egg-mongoose",
}

//配置 config/config.default.js：
exports.mongoose = {
  client: {
    url: "mongodb://127.0.0.1:27017/large_data",
    options: {},
  },
}

// 3. 创建数据模型
// 在 app/model 目录下创建 data.js 文件：
module.exports = (app) => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const DataSchema = new Schema({
    value: { type: String },
  })

  return mongoose.model("Data", DataSchema)
}

// 4. 创建服务和控制器
// 服务：分步查询数据并压缩
// 在 app/service 目录下创建 data.js 文件：
const Service = require("egg").Service

class DataService extends Service {
  async fetchAndCompressData(stream) {
    const { ctx } = this
    const Data = ctx.model.Data
    const zlib = require("zlib")
    const gzip = zlib.createGzip()

    // 分页大小
    const pageSize = 1000
    let page = 0

    let hasMore = true

    gzip.pipe(stream)

    while (hasMore) {
      const data = await Data.find()
        .skip(page * pageSize)
        .limit(pageSize)

      if (data.length === 0) {
        hasMore = false
      } else {
        data.forEach((item) => {
          gzip.write(JSON.stringify(item) + "\n")
        })
        page += 1
      }
    }
    gzip.end()
  }
}

module.exports = DataService

// 控制器：处理请求并调用服务
// 在 app/controller 目录下创建 data.js 文件：
const Controller = require("egg").Controller

class DataController extends Controller {
  async index() {
    const { ctx } = this
    ctx.set("Content-Type", "application/json")
    ctx.set("Content-Encoding", "gzip")

    await ctx.service.data.fetchAndCompressData(ctx.res)
  }
}

module.exports = DataController
