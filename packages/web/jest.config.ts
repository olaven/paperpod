import config from "../../jest.config";

export default {
  ...config,
  setupFilesAfterEnv: ["./jest.setup.ts"]
};
