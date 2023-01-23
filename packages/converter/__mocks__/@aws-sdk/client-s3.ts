import { logger } from "@paperpod/common";

export class S3 {
  constructor(options) {}

  public getObject() {
    logger.trace("inside S3 mock");
    return {
      Body: new ReadableStream(),
    };
  }
}
