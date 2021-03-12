const config = require("../../jest.config");

module.exports = {
  ...config,
  testPathIgnorePatterns: [
    ...(config.testPathIgnorePatterns ? config.testPathIgnorePatterns : []),
    "src/test/test.ts",
  ],
};
