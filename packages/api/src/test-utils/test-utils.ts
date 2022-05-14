import { migrate } from "@paperpod/server";
import { getConfiguration } from "@paperpod/server/src/database/configuration";

/*
TODO: very similar to a function in test-utils@api. 
Is it the beginning of a shared-test package?
*/
export const setupMigrations = () =>
  beforeAll(async () => {
    await migrate({
      configuration: getConfiguration(),
      schema: "api",
    });
  });
