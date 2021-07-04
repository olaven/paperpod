import { get } from "node-kall";
import { version } from "../package.json";
import express from "express";

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
  const [statusApi, api] = await get(
    `http://api:${process.env.API_PORT}/api/health`
  );
  const [statusAuthentication, authentication] = await get(
    `http://authentication:${process.env.AUTHENTICATION_PORT}/authentication/health`
  );
  const [statusDocs, docs] = await get(
    `http://docs:${process.env.DOCS_PORT}/docs/health`
  );

  const [statusGateway, gateway] = await get(
    `http://gateway:${process.env.PORT}/health`
  );

  const [statusWeb, web] = await get(
    `http://web:${process.env.WEB_PORT}/web-health.json`
  );

  return response.send({
    version,
    message: "Paperpod Health Status <コ:彡",
    api: { status: statusApi, ...api },
    authentication: { status: statusAuthentication, ...authentication },
    docs: { status: statusDocs, ...docs },
    gateway: { status: statusGateway, ...gateway },
    web: { status: statusWeb, ...web },
  });
};
