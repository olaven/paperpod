"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.rssRoutes = exports.fileRoutes = exports.articleRoutes = void 0;
var article_routes_1 = require("./article-routes");
__createBinding(exports, article_routes_1, "articleRoutes");
var file_routes_1 = require("./file-routes");
__createBinding(exports, file_routes_1, "fileRoutes");
var rss_routes_1 = require("./rss-routes");
__createBinding(exports, rss_routes_1, "rssRoutes");
