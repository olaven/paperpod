import { logger } from "@paperpod/common";

export const ComprehendClient = () => ({
  send: () => {
    logger.trace("inside client-comprehend mock");
    return {
      Languages: ["en"],
    };
  },
});

export const DetectDominantLanguageCommand = () => {};
