import { logger } from "@paperpod/common";
import readPkg from "read-pkg-up";
import express from "express";
import { appWithEnvironment } from "./app/appWithEnvironment";

const port = process.env.PORT;

/**
 * Returns a nice health response
 * for the service
 * @param id the identifier of the service
 * @returns
 */
const createHealthHandler =
  (id: string) =>
  async (request: express.Request, response: express.Response) => {
    const {
      packageJson: { version, name },
    } = await readPkg();
    return response.send({
      name,
      version,
      message: `'${id}' is live ヽ(^。^)ノ`,
    });
  };

export const boot = (
  path: string,
  app = appWithEnvironment(),
  id = path.replace("/", "")
) =>
  express()
    .get(`${path}/health`, createHealthHandler(id))
    .use(path, app)
    .listen(port, () => {
      logger.info({
        path,
        port,
        status: `listening`,
      });
    });
