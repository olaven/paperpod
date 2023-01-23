const config = require("../../jest.config");

module.exports = {
  ...config,
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },
};
