import { logger } from "@paperpod/common";
import express from "express";
import readPkg from "read-pkg-up";
import { appWithEnvironment } from "./app/appWithEnvironment";
import { getConfiguration } from "./database/configuration";
import { migrate, SchemaName } from "./database/migrate";

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

type BootOptions = {
  id?: string;
  port?: number;
};

export const bootWithMigrations = async (
  schema: SchemaName,
  app = appWithEnvironment(),
  options: BootOptions = {}
) => {
  const configuration = getConfiguration();
  logger.debug({message: "In boot with migrations", configuration, schema})
  await migrate({ configuration, schema });
  return boot(`/${schema}`, app, options);
};

export const boot = (
  path: string,
  app = appWithEnvironment(),
  options: BootOptions = {}
) => {
  logger.info({
    message: `Booting ${path} in ${process.env.NODE_ENV}`,
    env: process.env.NODE_ENV,
  });

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
