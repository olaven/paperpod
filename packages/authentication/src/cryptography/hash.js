"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.compare = exports.hash = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var hash = function (password) { return bcryptjs_1["default"].hash(password, 10); };
exports.hash = hash;
var compare = function (password, hash) {
    return bcryptjs_1["default"].compare(password, hash);
};
exports.compare = compare;
