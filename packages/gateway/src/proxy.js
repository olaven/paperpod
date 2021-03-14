"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
exports.__esModule = true;
exports.mapping = exports.withProxies = void 0;
var express_1 = __importDefault(require("express"));
var querystring_1 = __importDefault(require("querystring"));
var http_proxy_middleware_1 = require("http-proxy-middleware");
var withProxies = function (pairs, app) {
  if (app === void 0) {
    app = express_1["default"]();
  }
  pairs.forEach(function (_a) {
    var path = _a[0],
      target = _a[1];
    return createProxy(app)(path, target);
  });
  return app;
};
exports.withProxies = withProxies;
var mapping = function (path, hostname, port) {
  return [path, "http://" + hostname + ":" + port];
};
exports.mapping = mapping;
var createProxy = function (handler) {
  return function (path, target) {
    handler.use(
      path,
      http_proxy_middleware_1.createProxyMiddleware({
        target: target,
        //Workaround while waiting for bugfix. See: https://github.com/chimurai/http-proxy-middleware/issues/320 and https://github.com/chimurai/http-proxy-middleware/pull/492
        onProxyReq: function (proxyReq, req, res) {
          if (!req.body || !Object.keys(req.body).length) {
            return;
          }
          var contentType = proxyReq.getHeader("Content-Type");
          var writeBody = function (bodyData) {
            proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
            proxyReq.write(bodyData);
          };
          if (contentType === "application/json") {
            writeBody(JSON.stringify(req.body));
          }
          if (contentType === "application/x-www-form-urlencoded") {
            writeBody(querystring_1["default"].stringify(req.body));
          }
        },
      })
    );
  };
};
