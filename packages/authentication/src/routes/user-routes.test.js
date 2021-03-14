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
var express_1 = __importDefault(require("express"));
var faker_1 = __importDefault(require("faker"));
var common_1 = require("@paperpod/common");
var server_1 = require("@paperpod/server");
var database = __importStar(require("../authdatabase/authdatabase"));
var node_kall_1 = require("node-kall");
var supertest_1 = __importDefault(require("supertest"));
var app_1 = require("../app");
var cryptography_1 = require("../cryptography/cryptography");
var user_routes_1 = require("./user-routes");
var signUp = function (credentials, agent) {
  if (credentials === void 0) {
    credentials = common_1.test.mocks.credentials();
  }
  if (agent === void 0) {
    agent = supertest_1["default"].agent(app_1.app);
  }
  return agent.post("/users").send(credentials);
};
var extractBearerToken = function (test) {
  return __awaiter(void 0, void 0, void 0, function () {
    var token;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, test];
        case 1:
          token = _a.sent().body.token;
          return [2 /*return*/, token];
      }
    });
  });
};
var login = function (credentials, agent) {
  if (credentials === void 0) {
    credentials = common_1.test.mocks.credentials();
  }
  if (agent === void 0) {
    agent = supertest_1["default"].agent(app_1.app);
  }
  return agent.post("/users/sessions").send(credentials);
};
describe("The authentication endpoint for users", function () {
  describe("Local test utils", function () {
    describe("extractBearerToken", function () {
      it("Does extract something defined", function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var token;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [4 /*yield*/, extractBearerToken(signUp())];
              case 1:
                token = _a.sent();
                expect(token).toBeDefined();
                return [2 /*return*/];
            }
          });
        });
      });
      it("Does returns the correct token", function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var sentToken, app, retrievedToken;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                sentToken = faker_1["default"].random.uuid();
                app = express_1["default"]().get(
                  "/",
                  function (request, response) {
                    response.json({
                      token: sentToken,
                    });
                  }
                );
                return [
                  4 /*yield*/,
                  extractBearerToken(supertest_1["default"](app).get("/")),
                ];
              case 1:
                retrievedToken = _a.sent();
                expect(sentToken).toEqual(retrievedToken);
                return [2 /*return*/];
            }
          });
        });
      });
    });
  });
  describe("function validating credentials", function () {
    it("Does not crash", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                database.users.insert(common_1.test.mocks.user()),
              ];
            case 1:
              user = _a.sent();
              expect(
                user_routes_1.credentialsAreValid({
                  email: user.email,
                  password: faker_1["default"].internet.password(),
                })
              ).resolves.not.toThrow();
              return [2 /*return*/];
          }
        });
      });
    });
    it("Returns false if email is undefined", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              _a = expect;
              return [
                4 /*yield*/,
                user_routes_1.credentialsAreValid({
                  email: undefined,
                  password: faker_1["default"].internet.password(),
                }),
              ];
            case 1:
              _a.apply(void 0, [_b.sent()]).toBe(false);
              return [2 /*return*/];
          }
        });
      });
    });
    it("Returns false if password is undefined", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var user, _a;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              return [
                4 /*yield*/,
                database.users.insert(common_1.test.mocks.user()),
              ];
            case 1:
              user = _b.sent();
              _a = expect;
              return [
                4 /*yield*/,
                user_routes_1.credentialsAreValid({
                  email: user.email,
                  password: undefined,
                }),
              ];
            case 2:
              _a.apply(void 0, [_b.sent()]).toBe(false);
              return [2 /*return*/];
          }
        });
      });
    });
    it("Returns false if there's no user with given email", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var email, user, _a;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              email = faker_1["default"].internet.email();
              return [4 /*yield*/, database.users.getByEmail(email)];
            case 1:
              user = _b.sent();
              _a = expect;
              return [
                4 /*yield*/,
                user_routes_1.credentialsAreValid({
                  email: email,
                  password: faker_1["default"].internet.password(),
                }),
              ];
            case 2:
              _a.apply(void 0, [_b.sent()]).toBe(false);
              expect(user).toEqual(null);
              return [2 /*return*/];
          }
        });
      });
    });
    it("Returns false if the password is not the same as used when signing up", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var user, _a;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              return [
                4 /*yield*/,
                database.users.insert(common_1.test.mocks.user()),
              ];
            case 1:
              user = _b.sent();
              _a = expect;
              return [
                4 /*yield*/,
                user_routes_1.credentialsAreValid({
                  email: user.email,
                  password: faker_1["default"].internet.password(),
                }),
              ];
            case 2:
              _a.apply(void 0, [_b.sent()]).toBe(false);
              return [2 /*return*/];
          }
        });
      });
    });
    it("returns true if the supplied password is correct", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var password, password_hash, user, valid;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              password = faker_1["default"].internet.password();
              return [4 /*yield*/, cryptography_1.hash.hash(password)];
            case 1:
              password_hash = _a.sent();
              return [
                4 /*yield*/,
                database.users.insert(
                  __assign(__assign({}, common_1.test.mocks.user()), {
                    password_hash: password_hash,
                  })
                ),
              ];
            case 2:
              user = _a.sent();
              expect(user.password_hash).toEqual(password_hash);
              return [
                4 /*yield*/,
                user_routes_1.credentialsAreValid({
                  email: user.email,
                  password: password,
                }),
              ];
            case 3:
              valid = _a.sent();
              expect(valid).toBe(true);
              return [2 /*return*/];
          }
        });
      });
    });
  });
  describe("POST request for creating new users", function () {
    it("Does respond with BAD_REQUEST if no user is sent", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var status;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4 /*yield*/, signUp(null)];
            case 1:
              status = _a.sent().status;
              expect(status).toEqual(node_kall_1.BAD_REQUEST);
              return [2 /*return*/];
          }
        });
      });
    });
    it("Does respond with BAD_REQUEST if password is undefined", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var status;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                signUp(
                  __assign(__assign({}, common_1.test.mocks.credentials()), {
                    password: undefined,
                  })
                ),
              ];
            case 1:
              status = _a.sent().status;
              expect(status).toEqual(node_kall_1.BAD_REQUEST);
              return [2 /*return*/];
          }
        });
      });
    });
    it("Does respond with BAD_REQUEST if email is undefined", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var status;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                signUp(
                  __assign(__assign({}, common_1.test.mocks.credentials()), {
                    email: undefined,
                  })
                ),
              ];
            case 1:
              status = _a.sent().status;
              expect(status).toEqual(node_kall_1.BAD_REQUEST);
              return [2 /*return*/];
          }
        });
      });
    });
    it("Does respond with BAD_REQUEST if email and password are both undefined", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var status;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                signUp({
                  email: undefined,
                  password: undefined,
                }),
              ];
            case 1:
              status = _a.sent().status;
              expect(status).toEqual(node_kall_1.BAD_REQUEST);
              return [2 /*return*/];
          }
        });
      });
    });
    it("Redirects to front page if successful", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var credentials, status;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              credentials = common_1.test.mocks.credentials();
              return [4 /*yield*/, signUp(credentials)];
            case 1:
              status = _a.sent().status;
              expect(status).toEqual(node_kall_1.CREATED);
              return [2 /*return*/];
          }
        });
      });
    });
    it("Stores user with the lowercase version of their email adress", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var email, withoutLowerCase, lowercase;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              email = "FlAkYcAsE" + faker_1["default"].internet.email();
              return [
                4 /*yield*/,
                signUp(
                  __assign(__assign({}, common_1.test.mocks.credentials()), {
                    email: email,
                  })
                ),
              ];
            case 1:
              _a.sent();
              return [4 /*yield*/, database.users.getByEmail(email)];
            case 2:
              withoutLowerCase = _a.sent();
              return [
                4 /*yield*/,
                database.users.getByEmail(email.toLowerCase()),
              ];
            case 3:
              lowercase = _a.sent();
              expect(withoutLowerCase).toBeNull();
              expect(lowercase).toBeDefined();
              expect(lowercase.email).toEqual(email.toLowerCase());
              return [2 /*return*/];
          }
        });
      });
    });
    it("Returns a token containing the correct user on signup", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var credentials, response, token, parsed;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              credentials = common_1.test.mocks.credentials();
              return [4 /*yield*/, signUp(credentials)];
            case 1:
              response = _a.sent();
              token = response.body.token;
              expect(response.body.token).toBeDefined();
              expect(response.body.token).not.toBeNull();
              parsed = server_1.jwt.decode(token);
              expect(parsed.email).toEqual(credentials.email);
              return [2 /*return*/];
          }
        });
      });
    });
    it("Results in a user being created if successful", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var credentials, before, status, after;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              credentials = common_1.test.mocks.credentials();
              return [
                4 /*yield*/,
                database.users.getByEmail(credentials.email),
              ];
            case 1:
              before = _a.sent();
              expect(before).toBeNull();
              return [4 /*yield*/, signUp(credentials)];
            case 2:
              status = _a.sent().status;
              expect(status).toEqual(node_kall_1.CREATED);
              return [
                4 /*yield*/,
                database.users.getByEmail(credentials.email),
              ];
            case 3:
              after = _a.sent();
              expect(after).toBeDefined();
              return [2 /*return*/];
          }
        });
      });
    });
    it("Does create a user with correct email", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var credentials, status, user;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              credentials = common_1.test.mocks.credentials();
              return [4 /*yield*/, signUp(credentials)];
            case 1:
              status = _a.sent().status;
              expect(status).toEqual(node_kall_1.CREATED);
              return [
                4 /*yield*/,
                database.users.getByEmail(credentials.email),
              ];
            case 2:
              user = _a.sent();
              expect(user.email).toEqual(credentials.email);
              return [2 /*return*/];
          }
        });
      });
    });
    it("Does create a user with an id", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var credentials, status;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              credentials = common_1.test.mocks.credentials();
              return [4 /*yield*/, signUp(credentials)];
            case 1:
              status = _a.sent().status;
              expect(status).toEqual(node_kall_1.CREATED);
              return [2 /*return*/];
          }
        });
      });
    });
    it("returns BAD_REQUEST on users that don't have valid email addresses", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var status;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                signUp(
                  __assign(__assign({}, common_1.test.mocks.credentials()), {
                    email: "notemail.com",
                  })
                ),
              ];
            case 1:
              status = _a.sent().status;
              expect(status).toEqual(node_kall_1.BAD_REQUEST);
              return [2 /*return*/];
          }
        });
      });
    });
  });
  describe("POST endpoint for creating new sessions", function () {
    it("Does respond with 201 on succesful request", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var credentials, status;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              credentials = common_1.test.mocks.credentials();
              return [4 /*yield*/, signUp(credentials)];
            case 1:
              _a.sent();
              return [4 /*yield*/, login(credentials)];
            case 2:
              status = _a.sent().status;
              expect(status).toBe(node_kall_1.CREATED);
              return [2 /*return*/];
          }
        });
      });
    });
    it("Does respond with 401 if credentials are invalid", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var credentials, status;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              credentials = common_1.test.mocks.credentials();
              return [4 /*yield*/, login(credentials)];
            case 1:
              status = _a.sent().status;
              expect(status).toBe(node_kall_1.UNAUTHORIZED);
              return [2 /*return*/];
          }
        });
      });
    });
  });
  it("Does create a user, but does not store the password", function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var credentials, status, user;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            credentials = common_1.test.mocks.credentials();
            return [4 /*yield*/, signUp(credentials)];
          case 1:
            status = _a.sent().status;
            expect(status).toEqual(node_kall_1.CREATED);
            return [4 /*yield*/, database.users.getByEmail(credentials.email)];
          case 2:
            user = _a.sent();
            expect(user.password_hash).not.toEqual(credentials.password);
            return [2 /*return*/];
        }
      });
    });
  });
  it("Does create a user and stores hash comparable with bcrypt", function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var credentials, status, user, _a;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            credentials = common_1.test.mocks.credentials();
            return [4 /*yield*/, signUp(credentials)];
          case 1:
            status = _b.sent().status;
            expect(status).toEqual(node_kall_1.CREATED);
            return [4 /*yield*/, database.users.getByEmail(credentials.email)];
          case 2:
            user = _b.sent();
            _a = expect;
            return [
              4 /*yield*/,
              cryptography_1.hash.compare(
                credentials.password,
                user.password_hash
              ),
            ];
          case 3:
            _a.apply(void 0, [_b.sent()]).toBe(true);
            return [2 /*return*/];
        }
      });
    });
  });
  it("Responds with CONFLICT if attempting to create the same user twice", function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var credentials, firstResponse, secondResponse;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            credentials = common_1.test.mocks.credentials();
            return [4 /*yield*/, signUp(credentials)];
          case 1:
            firstResponse = _a.sent();
            expect(firstResponse.status).toEqual(node_kall_1.CREATED);
            return [4 /*yield*/, signUp(credentials)];
          case 2:
            secondResponse = _a.sent();
            expect(secondResponse.status).toEqual(node_kall_1.CONFLICT);
            return [2 /*return*/];
        }
      });
    });
  });
  it("Returns BAD_REQUEST on users that have passwords shorter than 8 characters", function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var status;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              signUp(
                __assign(__assign({}, common_1.test.mocks.credentials()), {
                  password: faker_1["default"].random.alphaNumeric(7),
                })
              ),
            ];
          case 1:
            status = _a.sent().status;
            expect(status).toEqual(node_kall_1.BAD_REQUEST);
            return [2 /*return*/];
        }
      });
    });
  });
  it("returns BAD_REQUEST on users that have passwords without lowercase letters", function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var status;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              signUp(
                __assign(__assign({}, common_1.test.mocks.credentials()), {
                  password: faker_1["default"].random
                    .alphaNumeric(80)
                    .toLowerCase(),
                })
              ),
            ];
          case 1:
            status = _a.sent().status;
            expect(status).toEqual(node_kall_1.BAD_REQUEST);
            return [2 /*return*/];
        }
      });
    });
  });
  it("returns BAD_REQUEST on users that have passwords without uppercase letters", function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var status;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              signUp(
                __assign(__assign({}, common_1.test.mocks.credentials()), {
                  password: faker_1["default"].random
                    .alphaNumeric(80)
                    .toUpperCase(),
                })
              ),
            ];
          case 1:
            status = _a.sent().status;
            expect(status).toEqual(node_kall_1.BAD_REQUEST);
            return [2 /*return*/];
        }
      });
    });
  });
  it("returns BAD_REQUEST on users that don't have numbers", function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var status;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              signUp(
                __assign(__assign({}, common_1.test.mocks.credentials()), {
                  password: faker_1["default"].random.alpha({ count: 50 }),
                })
              ),
            ];
          case 1:
            status = _a.sent().status;
            expect(status).toEqual(node_kall_1.BAD_REQUEST);
            return [2 /*return*/];
        }
      });
    });
  });
});
describe("GET endpoint for retrieving information about the logged in user", function () {
  var getMe = function (token, agent) {
    if (agent === void 0) {
      agent = supertest_1["default"](app_1.app);
    }
    return agent.get("/users/me").set("Authorization", "Bearer " + token);
  };
  it("Responds with UNAUTHORIZED if the user is not logged in", function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var status;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, getMe(null)];
          case 1:
            status = _a.sent().status;
            expect(status).toEqual(node_kall_1.UNAUTHORIZED);
            return [2 /*return*/];
        }
      });
    });
  });
  it("Resopnds with FORBIDDEN if the JWT token is present, but not valid", function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var token, status;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            token =
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
            return [4 /*yield*/, getMe(token)];
          case 1:
            status = _a.sent().status;
            expect(status).toEqual(node_kall_1.FORBIDDEN);
            return [2 /*return*/];
        }
      });
    });
  });
  it("Responds with OK if the user is logged in", function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var status, _a;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _a = getMe;
            return [4 /*yield*/, extractBearerToken(signUp())];
          case 1:
            return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
          case 2:
            status = _b.sent().status;
            expect(status).toEqual(node_kall_1.OK);
            return [2 /*return*/];
        }
      });
    });
  });
  it("Returns the user object if the user is logged in", function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var token, body;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, extractBearerToken(signUp())];
          case 1:
            token = _a.sent();
            return [4 /*yield*/, getMe(token).expect(node_kall_1.OK)];
          case 2:
            body = _a.sent().body;
            expect(body.email).toBeDefined();
            expect(body.id).toBeDefined();
            return [2 /*return*/];
        }
      });
    });
  });
  it("Does not return the password hash to client", function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var _a, _b;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _a = expect;
            _b = getMe;
            return [4 /*yield*/, extractBearerToken(signUp())];
          case 1:
            return [4 /*yield*/, _b.apply(void 0, [_c.sent()])];
          case 2:
            _a.apply(void 0, [_c.sent().body.password_hash]).toBeUndefined();
            return [2 /*return*/];
        }
      });
    });
  });
  it("Does return user data for the correct user", function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var credentials, _a, body, status, _b;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            credentials = common_1.test.mocks.credentials();
            _b = getMe;
            return [4 /*yield*/, extractBearerToken(signUp(credentials))];
          case 1:
            return [4 /*yield*/, _b.apply(void 0, [_c.sent()])];
          case 2:
            (_a = _c.sent()), (body = _a.body), (status = _a.status);
            expect(status).toEqual(node_kall_1.OK);
            expect(body.email).toEqual(credentials.email);
            return [2 /*return*/];
        }
      });
    });
  });
  it("Responds with FORBIDDEN if there is a token, but it's not properly formatted", function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var status;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, getMe("badly formatted token")];
          case 1:
            status = _a.sent().status;
            expect(status).toEqual(node_kall_1.FORBIDDEN);
            return [2 /*return*/];
        }
      });
    });
  });
  it("Responds with OK if user is logged in", function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var token, status;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, extractBearerToken(signUp())];
          case 1:
            token = _a.sent();
            return [4 /*yield*/, getMe(token)];
          case 2:
            status = _a.sent().status;
            expect(status).toEqual(node_kall_1.OK);
            return [2 /*return*/];
        }
      });
    });
  });
});
describe("PUT endpont for token refresh", function () {
  var refreshToken = function (oldToken) {
    return supertest_1["default"](app_1.app)
      .put("/users/sessions")
      .set("Authorization", "Bearer " + oldToken);
  };
  it("Responds with OK on valid request", function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var token, status;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, extractBearerToken(signUp())];
          case 1:
            token = _a.sent();
            return [4 /*yield*/, refreshToken(token)];
          case 2:
            status = _a.sent().status;
            expect(status).toEqual(node_kall_1.OK);
            return [2 /*return*/];
        }
      });
    });
  });
  it("Responds with a different token on valid request", function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var oldToken, response, newToken;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, extractBearerToken(signUp())];
          case 1:
            oldToken = _a.sent();
            return [4 /*yield*/, common_1.test.sleep(1200)];
          case 2:
            _a.sent(); //to update JWT `.iat`
            return [4 /*yield*/, refreshToken(oldToken)];
          case 3:
            response = _a.sent();
            newToken = response.body.token;
            expect(oldToken).toBeDefined();
            expect(newToken).toBeDefined();
            expect(oldToken).not.toEqual(newToken);
            return [2 /*return*/];
        }
      });
    });
  });
});
