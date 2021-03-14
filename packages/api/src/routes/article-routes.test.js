"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
exports.__esModule = true;
var faker_1 = __importDefault(require("faker"));
var common_1 = require("@paperpod/common");
var server_1 = require("@paperpod/server");
var node_kall_1 = require("node-kall");
var supertest_1 = __importDefault(require("supertest"));
var app_1 = require("../app");
var database_1 = require("../database/database");
describe("The api for articles", function () {
  var post = function (token, payload) {
    if (payload === void 0) {
      payload = common_1.test.mocks.articlePayload();
    }
    return supertest_1["default"](app_1.app)
      .post("/articles")
      .set("Authorization", "Bearer " + token)
      .send(payload);
  };
  var get = function (token) {
    return supertest_1["default"](app_1.app)
      .get("/articles")
      .set("Authorization", "Bearer " + token);
  };
  var del = function (token, _id) {
    return supertest_1["default"](app_1.app)
      ["delete"]("/articles/" + _id)
      .set("Authorization", "Bearer " + token);
  };
  describe("the POST-endpoint for articles", function () {
    jest.mock("@paperpod/converter", function () {
      return {
        convertToText: function (article) {
          console.log("INSIDE AUDIO TEXT MOCK");
          return article;
        },
      };
    });
    it("Does respond with something other than NOT_IMPLEMENTED", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var status;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                supertest_1["default"](app_1.app).post("/articles"),
              ];
            case 1:
              status = _a.sent().status;
              expect(status).not.toEqual(node_kall_1.NOT_IMPLEMENTED);
              return [2 /*return*/];
          }
        });
      });
    });
    it("Does respond with UNAUTHORIZED if no token is passed", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var status;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4 /*yield*/, post(null)];
            case 1:
              status = _a.sent().status;
              expect(status).toEqual(node_kall_1.UNAUTHORIZED);
              return [2 /*return*/];
          }
        });
      });
    });
    it("Does respond with 201 if a valid request is made", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var token, status;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              token = server_1.jwt.sign(common_1.test.mocks.user());
              return [4 /*yield*/, post(token)];
            case 1:
              status = _a.sent().status;
              expect(status).toEqual(node_kall_1.CREATED);
              return [2 /*return*/];
          }
        });
      });
    });
    it("Does return an article on valid request", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var token, body;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              token = server_1.jwt.sign(common_1.test.mocks.user());
              return [4 /*yield*/, post(token)];
            case 1:
              body = _a.sent().body;
              expect(body.id).toBeDefined();
              expect(body.original_url).toBeDefined();
              expect(body.text).toBeDefined();
              expect(body.owner_id).toBeDefined();
              return [2 /*return*/];
          }
        });
      });
    });
    it("Does return the new article after creation", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var token, before, payload, after, inBefore, inAfter;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              token = server_1.jwt.sign(common_1.test.mocks.user());
              return [4 /*yield*/, get(token)];
            case 1:
              return [4 /*yield*/, _a.sent().body];
            case 2:
              before = _a.sent();
              payload = common_1.test.mocks.articlePayload();
              return [4 /*yield*/, post(token, payload)];
            case 3:
              _a.sent();
              return [4 /*yield*/, get(token)];
            case 4:
              return [4 /*yield*/, _a.sent().body];
            case 5:
              after = _a.sent();
              inBefore = before.find(function (article) {
                return article.original_url === payload.link;
              });
              inAfter = after.find(function (article) {
                return article.original_url === payload.link;
              });
              expect(inBefore).toBeFalsy();
              expect(inAfter).toBeTruthy();
              return [2 /*return*/];
          }
        });
      });
    });
    it("Does not accept an article if it's not containting a valid link", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var token;
        return __generator(this, function (_a) {
          token = server_1.jwt.sign(common_1.test.mocks.user());
          post(token, {
            link: "not-a-url",
          }).expect(node_kall_1.BAD_REQUEST);
          return [2 /*return*/];
        });
      });
    });
    it("Does not respond with NOT_IMPLEMENTED if link leads to a pdf", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var token, status;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              token = server_1.jwt.sign(common_1.test.mocks.user());
              return [
                4 /*yield*/,
                post(token, {
                  link:
                    "https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf",
                }),
              ];
            case 1:
              status = _a.sent().status;
              expect(status).not.toBe(node_kall_1.NOT_IMPLEMENTED);
              return [2 /*return*/];
          }
        });
      });
    });
  });
  describe("Retrieving articles", function () {
    it("Does respond with UNAUTHORIZED if not logged in", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var status;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4 /*yield*/, get(null)];
            case 1:
              status = _a.sent().status;
              expect(status).toEqual(node_kall_1.UNAUTHORIZED);
              return [2 /*return*/];
          }
        });
      });
    });
    it("responds with OK if user is logged in", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var token, status;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              token = server_1.jwt.sign(common_1.test.mocks.user());
              return [4 /*yield*/, get(token)];
            case 1:
              status = _a.sent().status;
              expect(status).toEqual(node_kall_1.OK);
              return [2 /*return*/];
          }
        });
      });
    });
  });
  describe("The endpoint for deleting articles", function () {
    it("Responds with UNAUTHORIZED if not logged in", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var status;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4 /*yield*/, del(null, "some-article-id")];
            case 1:
              status = _a.sent().status;
              expect(status).toEqual(node_kall_1.UNAUTHORIZED);
              return [2 /*return*/];
          }
        });
      });
    });
    it("Responds with NOT_FOUND if the article does not exist", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var token, status;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              token = server_1.jwt.sign(common_1.test.mocks.user());
              return [
                4 /*yield*/,
                del(token, faker_1["default"].random.uuid()),
              ];
            case 1:
              status = _a.sent().status;
              expect(status).toEqual(node_kall_1.NOT_FOUND);
              return [2 /*return*/];
          }
        });
      });
    });
    it("Responds with FORBIDDEN if the user does not own the article", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var article, token, status;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                database_1.articles.persist(common_1.test.mocks.article()),
              ];
            case 1:
              article = _a.sent();
              token = server_1.jwt.sign(common_1.test.mocks.user());
              return [4 /*yield*/, del(token, article.id)];
            case 2:
              status = _a.sent().status;
              expect(status).toEqual(node_kall_1.FORBIDDEN);
              return [2 /*return*/];
          }
        });
      });
    });
    it("Responds with NO_CONTENT if the user tries to delete their own article", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var user, article, token, status;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              user = common_1.test.mocks.user();
              return [
                4 /*yield*/,
                database_1.articles.persist(
                  __assign(__assign({}, common_1.test.mocks.article()), {
                    owner_id: user.id,
                  })
                ),
              ];
            case 1:
              article = _a.sent();
              token = server_1.jwt.sign(user);
              return [4 /*yield*/, del(token, article.id)];
            case 2:
              status = _a.sent().status;
              expect(status).toEqual(node_kall_1.NO_CONTENT);
              return [2 /*return*/];
          }
        });
      });
    });
    it("Does actually delete article on valid request", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var user, article, token, after;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              user = common_1.test.mocks.user();
              return [
                4 /*yield*/,
                database_1.articles.persist(
                  __assign(__assign({}, common_1.test.mocks.article()), {
                    owner_id: user.id,
                  })
                ),
              ];
            case 1:
              article = _a.sent();
              token = server_1.jwt.sign(user);
              return [4 /*yield*/, del(token, article.id)];
            case 2:
              _a.sent();
              return [4 /*yield*/, database_1.articles.getById(article.id)];
            case 3:
              after = _a.sent();
              expect(after).toEqual(null);
              return [2 /*return*/];
          }
        });
      });
    });
  });
});
