import dotenv from "dotenv";
import path from "path";
dotenv.config({
  //NOTE: This breaks if the tested pacakge is not located in /packages/<package> or similar depth.
  path: path.resolve(process.cwd(), "..", "..", ".env"),
});

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  transform: {},
  collectCoverageFrom: ["src/**/*"],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
