const config = require("../../jest.config");

module.exports = {
  ...config,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  coverageThreshold: {
    global: {
      branches: 60, //FIXME: move back to 80 in global
      functions: 60, //FIXME: move back to 80 in global
      lines: 60, //FIXME: move back to 80 in global
      statements: 60, //FIXME: move back to 80 in global
    },
  },
};
