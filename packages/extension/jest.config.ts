const config = require("../../jest.config");

module.exports = {
  ...config,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  coverageThreshold: {
    global: {
      branches: 10, //FIXME: move back to 80 in global
      functions: 10, //FIXME: move back to 80 in global
      lines: 10, //FIXME: move back to 80 in global
      statements: 10, //FIXME: move back to 80 in global
    },
  },
};
