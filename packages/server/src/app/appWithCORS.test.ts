import { appWithCORS } from "./appWithCORS";
import { runCommonAppTests } from "./test-utils";

describe("Function adding bodyparser middleware to express app", () => {
  runCommonAppTests(appWithCORS);
});
