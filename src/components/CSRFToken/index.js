// config/config.default.js
exports.security = {
  csrf: {
    enable: true,
    useSession: false, // 默认
    cookieName: "csrfToken", // CSRF Token 存储在 Cookie 中的名称
    sessionName: "csrfToken", // CSRF Token 存储在 Session 中的名称
  },
}

// app/controller/home.js

const { Controller } = require("egg")

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    const csrfToken = ctx.csrf
    ctx.body = { message: "CSRF Token retrieved successfully", csrfToken }
  }

  async submit() {
    const { ctx } = this
    // 验证 CSRF Token
    ctx.body = { message: "Data submitted successfully" }
  }
}

module.exports = HomeController

// app/router.js

module.exports = (app) => {
  const { router, controller } = app

  router.get("/", controller.home.index)
  router.post("/submit", controller.home.submit)
}
