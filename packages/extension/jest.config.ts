const config = require("../../jest.config");

module.exports = {
  ...config,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
