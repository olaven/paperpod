"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.app = void 0;
var fs_1 = __importDefault(require("fs"));
var http_1 = __importDefault(require("http"));
var https_1 = __importDefault(require("https"));
var server = __importStar(require("@paperpod/server"));
var proxy_1 = require("./proxy");
exports.app = proxy_1.withProxies([
    proxy_1.mapping("/api", "api", process.env.API_PORT),
    proxy_1.mapping("/authentication", "authentication", process.env.AUTHENTICATION_PORT),
    proxy_1.mapping("/", "web", process.env.WEB_PORT),
], server.app.appWithEnvironment());
var actualServer = process.env.NODE_ENV === "production"
    ? https_1["default"].createServer({
        key: fs_1["default"].readFileSync("/etc/letsencrypt/live/application.paperpod.fm/privkey.pem", "utf8"),
        cert: fs_1["default"].readFileSync("/etc/letsencrypt/live/application.paperpod.fm/cert.pem", "utf8"),
        ca: fs_1["default"].readFileSync("/etc/letsencrypt/live/application.paperpod.fm/chain.pem", "utf8")
    }, exports.app)
    : http_1["default"].createServer(exports.app);
var redirectServer = http_1["default"].createServer(server.app.appWithEnvironment().use(function (request, response) {
    response.redirect("https://" + request.headers.host + request.url);
}));
redirectServer.listen(process.env.GATEWAY_HTTP_PORT, function () {
    console.log("Redirecting to HTTPS from port " + process.env.GATEWAY_HTTP_PORT);
});
actualServer.listen(process.env.PORT, function () {
    console.log("Listening on " + process.env.PORT);
});
