import { logger } from "@paperpod/common";
import stream from "stream";

export class S3 {
  constructor(options) {}

  public getObject() {
    logger.trace("inside S3 mock");
    return {
      Body: stream.Readable.from([]),
    };
  }
}
