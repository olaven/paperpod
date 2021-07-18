import express from "express";
import { get } from "node-kall";
import * as database from "../database/database";
import { getRSSFeed } from "@paperpod/converter";
import { OK, UNAUTHORIZED, FORBIDDEN } from "node-kall";

import { logger } from "@paperpod/common";
import { ipc } from "@paperpod/server";

export const rssRoutes = express
  .Router()
  /**
   * NOTE:
   * The client cannot be expected to use JWT for this route, as
   * any podcast player must be able to fetch it.
   */
  .get("/feeds/:user_id/", async (request, response) => {
    const user_id = request.params.user_id;

    if (!user_id || user_id === "null" || user_id === "undefined")
      return response.status(UNAUTHORIZED).send();

    const hasSubscription = await ipc.hasValidSubscription(user_id);
    if (!hasSubscription) {
      return response.status(FORBIDDEN).end();
    }

    const articles = await database.articles.getByOwner(user_id);
    const feed = getRSSFeed(articles);

    return response
      .status(OK)
      .contentType("application/rss+xml") //content-type as defined here: https://www.rssboard.org/rss-mime-type-application.txt
      .send(feed);
  })
  //FIXME: remove this. Just for testing IPC communication options
  .get("/send", async (request, response) => {
    logger.debug(`SENDING to ${process.env.AUTHENTICATION_PORT}`);
    const [status, body] = await get(
      `http://authentication:${process.env.AUTHENTICATION_PORT}/authentication/receiver`,
      {
        headers: {
          host: "testhost",
        },
      }
    );
    logger.debug({ status, body });

    return response.json({ status, body });
  });
