const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        ["/users", "/team"],
        createProxyMiddleware({
            target: "http://localhost:5000"
        })
    );
};