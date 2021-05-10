import { logger } from "@paperpod/common";
import faker from "faker";

export const PollyClient = () => ({
  send: () => {
    logger.trace("inside client-polly mock");
    return {
      SynthesisTask: {
        OutputUri: faker.internet.url(),
      },
    };
  },
});

export const StartSpeechSynthesisTaskCommand = () => {};
