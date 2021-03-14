"use strict";
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
var faker_1 = __importDefault(require("faker"));
var app_1 = require("../app");
var database_1 = require("../database/database");
var node_kall_1 = require("node-kall");
var common_1 = require("@paperpod/common");
describe("The api route for streaming files", function () {
  var get = function (article_id) {
    return supertest_1["default"](app_1.app).get("/files/" + article_id);
  };
  it("Does not respond with NOT_IMPLEMNTED", function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var status;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, get(faker_1["default"].random.uuid())];
          case 1:
            status = _a.sent().status;
            expect(status).not.toEqual(node_kall_1.NOT_IMPLEMENTED);
            return [2 /*return*/];
        }
      });
    });
  });
  it("Does respond with 404 if the article does not exist", function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var id, article, status;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            id = faker_1["default"].random.uuid();
            return [4 /*yield*/, database_1.articles.getById(id)];
          case 1:
            article = _a.sent();
            return [4 /*yield*/, get(id)];
          case 2:
            status = _a.sent().status;
            expect(article).toEqual(null);
            expect(status).toEqual(node_kall_1.NOT_FOUND);
            return [2 /*return*/];
        }
      });
    });
  });
  it("Responds with 200 if the article is present", function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var article, status;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              database_1.articles.persist(common_1.test.mocks.article()),
            ];
          case 1:
            article = _a.sent();
            return [4 /*yield*/, get(article.id)];
          case 2:
            status = _a.sent().status;
            expect(status).toEqual(node_kall_1.OK);
            return [2 /*return*/];
        }
      });
    });
  });
});
