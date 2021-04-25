import { appWithEnvironment } from "./app/app";
import { boot } from "./boot";
describe("The function for booting apps at specific paths", () => {
  it("Does not crash", () => {
    expect(() => {
      boot("/path").close();
    }).not.toThrow();
  });

  it("Does accept a preconfigured app", () => {
    expect(() => {
      const app = appWithEnvironment();
      boot("/path", app).close();
    }).not.toThrow();
  });

  it("Does run for a while", () => {

    expect(new Promise((resolve, reject) => {

      const server = boot("/path", appWithEnvironment());
      setTimeout(() => {
        resolve(server.close())
      }, 5_000); 
    })).resolves.not.toThrow();
  });
});
