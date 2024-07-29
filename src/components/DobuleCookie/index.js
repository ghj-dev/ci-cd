//sh
// yarn add egg-cookies

// app/middleware/double_cookie.js
module.exports = (options, app) => {
  return async function doubleCookie(ctx, next) {
    const tokenHttpOnly = ctx.cookies.get("tokenHttpOnly", {
      signed: false,
      httpOnly: true,
    })
    const token = ctx.cookies.get("token", { signed: false })

    if (tokenHttpOnly && token && tokenHttpOnly === token) {
      await next()
    } else {
      ctx.status = 403
      ctx.body = "Forbidden"
    }
  }
}

// config/config.default.js

exports.middleware = ["doubleCookie"]

exports.doubleCookie = {
  // 配置双重 Cookie 验证中间件
  enable: true,
  match: "/protected", // 保护的路由
}

// app/router.js
module.exports = (app) => {
  const { router, controller } = app
  // 设置双重 Cookie 路由
  router.get("/protected", controller.protected.index)
  router.post("/set-token", controller.token.set)
}

// app/controller/token.js
const { Controller } = require("egg")
const crypto = require("crypto")

class TokenController extends Controller {
  async set() {
    const { ctx } = this
    const token = crypto.randomBytes(16).toString("hex")
    ctx.cookies.set("tokenHttpOnly", token, { httpOnly: true })
    ctx.cookies.set("token", token)
    ctx.body = { message: "Token set successfully" }
  }
}

module.exports = TokenController

// app/controller/protected.js

const { Controller } = require("egg")
class ProtectedController extends Controller {
  async index() {
    const { ctx } = this
    ctx.body = { message: "Protected resource accessed successfully" }
  }
}

module.exports = ProtectedController
