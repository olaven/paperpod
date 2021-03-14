"use strict";
exports.__esModule = true;
exports.persist = exports.getByOriginalUrlAndOwner = exports.getById = exports.deleteById = exports.getByOwner = void 0;
var klart_1 = require("klart");
var getByOwner = function (owner_id) {
    return klart_1.first("SELECT * FROM articles WHERE owner_id = $1", [
        owner_id,
    ]);
};
exports.getByOwner = getByOwner;
var deleteById = function (id) {
    return klart_1.first("\n      SELECT * FROM articles WHERE id = $1\n      RETURNING * \n    ", [id]);
};
exports.deleteById = deleteById;
var getById = function (id) {
    return klart_1.first("SELECT * FROM articles where id = $1", [id]);
};
exports.getById = getById;
var getByOriginalUrlAndOwner = function (original_url, owner_id) {
    return klart_1.rows("\n    SELECT * FROM articles \n    WHERE original_url = $1 and owner_id = 2\n  ", [original_url, owner_id]);
};
exports.getByOriginalUrlAndOwner = getByOriginalUrlAndOwner;
var persist = function (article) {
    return klart_1.first("\n      INSERT INTO\n      articles (owner_id, original_url, title, description, author, text, publication_timestamp, added_timestamp, storage_uri) \n      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,)\n      RETURNING * \n    ", [
        article.owner_id,
        article.original_url,
        article.title,
        article.description,
        article.author,
        article.text,
        article.publication_timestamp,
        article.added_timestamp,
        article.storage_uri,
    ]);
};
exports.persist = persist;
