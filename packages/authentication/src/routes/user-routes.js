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
exports.userRoutes = exports.credentialsAreValid = void 0;
var common_1 = require("@paperpod/common");
var server_1 = require("@paperpod/server");
var cryptography_1 = require("../cryptography/cryptography");
var express_1 = __importDefault(require("express"));
var database = __importStar(require("../authdatabase/authdatabase"));
var node_kall_1 = require("node-kall");
var credentialsAreValid = function (_a) {
  var email = _a.email,
    password = _a.password;
  return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          if (!email || !password) return [2 /*return*/, false];
          return [4 /*yield*/, database.users.getByEmail(email.toLowerCase())];
        case 1:
          user = _b.sent();
          if (!user) return [2 /*return*/, false];
          return [
            4 /*yield*/,
            cryptography_1.hash.compare(
              password,
              user === null || user === void 0 ? void 0 : user.password_hash
            ),
          ];
        case 2:
          return [2 /*return*/, _b.sent()];
      }
    });
  });
};
exports.credentialsAreValid = credentialsAreValid;
exports.userRoutes = express_1["default"]
  .Router()
  .post("/users/sessions", function (request, response) {
    return __awaiter(void 0, void 0, void 0, function () {
      var credentials, user, token;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            credentials = request.body;
            return [4 /*yield*/, exports.credentialsAreValid(credentials)];
          case 1:
            if (!_a.sent()) return [3 /*break*/, 3];
            return [
              4 /*yield*/,
              database.users.getByEmail(credentials.email.toLowerCase()),
            ];
          case 2:
            user = _a.sent();
            token = server_1.jwt.sign(user);
            return [
              2 /*return*/,
              response.status(node_kall_1.CREATED).send({
                token: token,
              }),
            ];
          case 3:
            return [
              2 /*return*/,
              response.status(node_kall_1.UNAUTHORIZED).send(),
            ];
        }
      });
    });
  })
  ["delete"](
    "/users/sessions",
    server_1.middleware.withAuthentication(function (request, response, user) {
      //FIXME: somehow invalidate old token
      response.status(node_kall_1.NO_CONTENT).send({
        token: null,
      });
    })
  )
  .put(
    "/users/sessions",
    server_1.middleware.withAuthentication(function (request, response, user) {
      return __awaiter(void 0, void 0, void 0, function () {
        var token;
        return __generator(this, function (_a) {
          token = server_1.jwt.sign(user);
          response.status(node_kall_1.OK).send({
            token: token,
          });
          return [2 /*return*/];
        });
      });
    })
  )
  .post("/users", function (request, response) {
    return __awaiter(void 0, void 0, void 0, function () {
      var credentials, existing, user, _a, _b, token;
      var _c;
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            credentials = request.body;
            if (
              !credentials ||
              !credentials.email ||
              !credentials.password ||
              !common_1.validators.validatePassword(credentials.password) ||
              !common_1.validators.validateEmail(credentials.email)
            )
              return [
                2 /*return*/,
                response.status(node_kall_1.BAD_REQUEST).send(),
              ];
            return [4 /*yield*/, database.users.getByEmail(credentials.email)];
          case 1:
            existing = _d.sent();
            if (existing)
              return [
                2 /*return*/,
                response.status(node_kall_1.CONFLICT).send(),
              ];
            _b = (_a = database.users).insert;
            _c = {
              id: null,
              email: credentials.email.toLowerCase(),
            };
            return [
              4 /*yield*/,
              cryptography_1.hash.hash(credentials.password),
            ];
          case 2:
            return [
              4 /*yield*/,
              _b.apply(_a, [((_c.password_hash = _d.sent()), _c)]),
            ];
          case 3:
            user = _d.sent();
            token = server_1.jwt.sign(user);
            return [
              2 /*return*/,
              response.status(node_kall_1.CREATED).send({ token: token }),
            ];
        }
      });
    });
  })
  .get(
    "/users/me",
    server_1.middleware.withAuthentication(function (request, response, user) {
      //THINKABOUT: /users/:id
      response.json(__assign(__assign({}, user), { password_hash: undefined }));
    })
  );
