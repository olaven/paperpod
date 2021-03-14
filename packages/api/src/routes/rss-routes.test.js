"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var supertest_1 = __importDefault(require("supertest"));
var node_kall_1 = require("node-kall");
var common_1 = require("@paperpod/common");
var database = __importStar(require("../database/database"));
var app_1 = require("../app");
describe("The RSS file endpoint", function () {
  var persistArticle = function (article) {
    if (article === void 0) {
      article = {};
    }
    return database.articles.persist(common_1.test.mocks.article(article));
  };
  describe("The endpoint for getting perosnal RSS-feeds", function () {
    var getFeed = function (user) {
      if (user === void 0) {
        user = common_1.test.mocks.user();
      }
      return supertest_1["default"](app_1.app).get(
        "/feeds/" + (user === null || user === void 0 ? void 0 : user.id) + "/"
      );
    };
    it("Can be found", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var status;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4 /*yield*/, getFeed()];
            case 1:
              status = _a.sent().status;
              expect(status).toEqual(node_kall_1.OK);
              return [2 /*return*/];
          }
        });
      });
    });
    it("Should pass", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var status;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                supertest_1["default"](app_1.app).get("/articles"),
              ];
            case 1:
              status = _a.sent().status;
              expect(status).not.toEqual(404);
              return [2 /*return*/];
          }
        });
      });
    });
    it("Does return UNAUTHORZED if no user id is specified", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var status;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4 /*yield*/, getFeed(null)];
            case 1:
              status = _a.sent().status;
              expect(status).toEqual(node_kall_1.UNAUTHORIZED);
              return [2 /*return*/];
          }
        });
      });
    });
    it("Does application/rss+xml on successful request", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var headers;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4 /*yield*/, getFeed()];
            case 1:
              headers = _a.sent().headers;
              expect(headers["content-type"]).toEqual(
                "application/rss+xml; charset=utf-8"
              );
              return [2 /*return*/];
          }
        });
      });
    });
    it("Does convert an rss field containint the data from all articles", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var user, articles, _a, rss, _i, articles_1, article;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              user = common_1.test.mocks.user();
              return [4 /*yield*/, persistArticle({ owner_id: user.id })];
            case 1:
              _a = [_b.sent()];
              return [4 /*yield*/, persistArticle({ owner_id: user.id })];
            case 2:
              _a = _a.concat([_b.sent()]);
              return [4 /*yield*/, persistArticle({ owner_id: user.id })];
            case 3:
              _a = _a.concat([_b.sent()]);
              return [4 /*yield*/, persistArticle({ owner_id: user.id })];
            case 4:
              articles = _a.concat([_b.sent()]);
              return [4 /*yield*/, getFeed(user)];
            case 5:
              rss = _b.sent().text;
              for (
                _i = 0, articles_1 = articles;
                _i < articles_1.length;
                _i++
              ) {
                article = articles_1[_i];
                expect(rss).toContain("<title>" + article.title + "</title>");
                expect(rss).toContain(
                  "<description>" + article.description + "</description>"
                );
              }
              return [2 /*return*/];
          }
        });
      });
    });
  });
});
