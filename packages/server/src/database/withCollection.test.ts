import faker from "faker";
import {
  withCollection,
  ifCloud,
  port,
  urlSuffix,
  connectionString,
} from "./withCollection";

describe("Higher order function for getting a mongo collection", () => {
  it("Does have shelf/mongo test setup running", () => {
    expect((global as any).__MONGO_DB_NAME__).toBeDefined();
  });

  it("Does not chrash", () => {
    expect(() => withCollection("some-collection")).not.toThrow();
  });

  it("Is possible to use 'withCollection' to interact with mongo", async () => {
    const withTestCollection = withCollection("test-collection");
    const document = { a: faker.lorem.word() };

    await withTestCollection((collection) => collection.insertOne(document));

    const retrieved = await withTestCollection((collection) =>
      collection.findOne({ a: document.a })
    );

    expect(retrieved).toEqual(document);
  });

  describe("Helper functions for 'withCollection'", () => {
    const withMockedEnv = (env: any) => (action: () => any) => {
      const temporary = { ...process.env };
      process.env = {
        ...process.env,
        ...env,
      };

      return () => {
        action();
        process.env = temporary;
      };
    };

    describe("mocking of env", () => {
      it("Is possible to mock env in tests", () => {
        const env = { a: faker.lorem.word() };
        expect(process.env.a).not.toBeDefined();

        withMockedEnv(env)(() => {
          expect(process.env.a).toEqual(env.a);
        })();

        expect(process.env.a).not.toBeDefined();
      });

      it("Is possible to mock multiple values", () => {
        const env = { a: faker.lorem.word(), b: faker.lorem.word() };
        withMockedEnv(env)(() => {
          expect(process.env.a).toEqual(env.a);
          expect(process.env.b).toEqual(env.b);
        });
      });

      it("Is possible to chain mockings", () => {
        const first = { first: faker.lorem.word() };
        const second = { second: faker.lorem.word() };

        const withFirst = withMockedEnv(first);
        const withSecond = withMockedEnv(second);

        const spy = jest.fn();
        withFirst(
          withSecond(() => {
            spy();
          })
        )();

        expect(spy).toHaveBeenCalledTimes(1);
      });
    });

    const withCloudProtocol = withMockedEnv({
      MONGODB_PROTOCOL: "mongodb+srv",
    });
    const withLocalProtocol = withMockedEnv({ MONGODB_PROTOCOL: "mongodb" });

    describe("'ifCloud' determening wehter the code is running towards hosted mongo or not", () => {
      it("returns first argument on- and second off cloud", () => {
        const onCloud = faker.lorem.word();
        const offCloud = faker.lorem.word();

        expect(onCloud).not.toEqual(offCloud);

        withCloudProtocol(() => {
          expect(ifCloud(onCloud, offCloud)()).toEqual(onCloud);
        });

        withLocalProtocol(() => {
          expect(ifCloud(onCloud, offCloud)()).toEqual(offCloud);
        });
      });
    });

    describe("function generating port section of connection string", () => {
      const withMongoPort = withMockedEnv({
        MONGODB_PORT: faker.random.number({ min: 1000, max: 9000 }),
      });

      it("Returns a blank string if going towards hosted mongo", () => {
        withCloudProtocol(
          withMongoPort(() => {
            expect(port()).toEqual("");
          })
        )();
      });

      it("returns :<PORT> if not on cloud", () => {
        withLocalProtocol(
          withMongoPort(() => {
            expect(port()).toMatch(/:\d[4]/);
          })
        );
      });
    });

    describe("function for generating urlSuffix", () => {
      it("Does not crash", () => {
        expect(() => {
          urlSuffix();
        }).not.toThrow();
      });

      it("Returns a blank string if mongodb is local", () => {
        withLocalProtocol(() => {
          expect(urlSuffix()).toEqual("");
        });
      });
    });

    describe("Function building the connection string", () => {
      expect(connectionString()).toBeDefined();
    });
  });
});
