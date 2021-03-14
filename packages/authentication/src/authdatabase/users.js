"use strict";
exports.__esModule = true;
exports.insert = exports.deleteUser = exports.getByEmail = void 0;
var klart_1 = require("klart");
var getByEmail = function (email) {
    return klart_1.first("SELECT * FROM users WHERE email = $1", [email]);
};
exports.getByEmail = getByEmail;
var deleteUser = function (id) {
    return klart_1.first("SELECT * FROM users WHERE id = $1", [id]);
};
exports.deleteUser = deleteUser;
var insert = function (user) {
    return klart_1.first("\n      INSERT INTO \n      users (email, password_hash)\n      VALUES ($1, $2)\n    ", [user.email, user.password_hash]);
};
exports.insert = insert;
