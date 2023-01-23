import { logger } from "@paperpod/common";

export class ComprehendClient {
  constructor(options) {}

  public send() {
    logger.trace("inside client-comprehend mock");
    return {
      Languages: ["en"],
    };
  }
}

export class DetectDominantLanguageCommand {
  constructor() {
    logger.trace("inside detect dominant language command mock");
  }
}
