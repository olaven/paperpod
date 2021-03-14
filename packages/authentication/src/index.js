"use strict";
exports.__esModule = true;
var server_1 = require("@paperpod/server");
var app_1 = require("./app");
server_1.boot("/authentication", app_1.app);
