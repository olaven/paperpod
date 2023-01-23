import { test } from "@paperpod/common";
import { getAudioStream } from "./storage";

jest.mock("@aws-sdk/client-s3");
describe("Functions interacting with AWS Sorage", () => {
  describe("Function for getting an audio file belonging to an article", () => {
    it("Does not throw", () => {
      expect(getAudioStream(test.mocks.article())).resolves.not.toThrow();
    });
  });
});
