import { get } from "node-kall";
import { version } from "../package.json";
import express from "express";
import { logger } from "@paperpod/common";

//TODO: move this to @paperpod/server if useful elsewhere.
enum Service {
  api = "api",
  authentication = "authentication",
  docs = "docs",
  gateway = "gateway",
  web = "web",
}

const fetchServiceHealth = async (service: Service, url: string) => {
  try {
    const [status, body] = await get(`http://${service}:${url}`);
    return { [service]: { status, ...body } };
  } catch (err) {
    logger.error(err);
    return {
      [service]: {
        message: err.message,
        code: err.code,
      },
    };
  }
};

/**
 * Reports it's own health endpoint
 * as well as for all other services.
 * @param request
 * @param response
 */
export const healthAll = async (
  request: express.Request,
  response: express.Response
) => {
  const services = (
    await Promise.all(
      (
        [
          [Service.api, `${process.env.API_PORT}/api/health`],
          [
            Service.authentication,
            `${process.env.AUTHENTICATION_PORT}/authentication/health`,
          ],
          [Service.docs, `${process.env.DOCS_PORT}/docs/health`],
          [Service.gateway, `${process.env.PORT}/health`],
          [Service.web, `${process.env.WEB_PORT}/web-health.json`],
        ] as const
      ).map(([service, path]) => fetchServiceHealth(service, path))
    )
  ).reduce((a, b) => ({ ...a, ...b }));

  return response.send({
    version,
    message: "Paperpod Health Status <コ:彡",
    services,
  });
};
