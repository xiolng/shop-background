const proxy = require("http-proxy-middleware")
const sso = process.env.sso || false

module.exports = function(app) {
    app.use(
        proxy("/api", {
            target: sso ? "http://172.16.2.55:18113" : "http://skynet.test.rrdbg.com",
            changeOrigin: true,
            secure: false,
            pathRewrite: { "^/api": "/api" }
        })
    )
    app.use(
        proxy("/zabbix/", {
            target: "http://z.we.com/",
            changeOrigin: true,
            secure: false,
            pathRewrite: { "^/zabbix": "/" }
        })
    )
}
