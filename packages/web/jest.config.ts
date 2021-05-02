import config from "../../jest.config";

export default {
  ...config,
  /* transform: {
    "/\.[jt]sx?$/": "babel-jest"
  },
  transformIgnorePatterns: [
    "node_modules", 
  ], */
  setupFilesAfterEnv: ["./jest.setup.ts"]
};
