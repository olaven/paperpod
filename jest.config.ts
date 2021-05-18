import dotenv from "dotenv";
import path from "path";
dotenv.config({
  //NOTE: This breaks if the tested pacakge is not located in /packages/<package> or similar depth.
  path: path.resolve(process.cwd(), "..", "..", ".env"),
});

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {},
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
