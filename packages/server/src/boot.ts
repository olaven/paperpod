import { logger } from "@paperpod/common";
import readPkg from "read-pkg-up";
import express from "express";
import { appWithEnvironment } from "./app/appWithEnvironment";

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
  options: {
    id?: string;
    port?: number;
  } = {}
) => {
  const id = options.id ?? path.replace("/", "");
  const port = options.port ?? process.env.PORT;

  return express()
    .get(`${path}/health`, createHealthHandler(id))
    .use(path, app)
    .listen(port, () => {
      logger.info({
        path,
        port,
        status: `listening`,
      });
    });
};
