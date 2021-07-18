import * as database from "../database/database";
import express from "express";
import { getAudioStream } from "@paperpod/converter";
import { NOT_FOUND, FORBIDDEN } from "node-kall";
import { ipc } from "@paperpod/server";

export const fileRoutes = express
  .Router()
  .get("/files/:article_id", async (request, response) => {
    const _id = (request.params.article_id as string).trim();
    const article = await database.articles.getById(_id);

    if (!article) return response.status(NOT_FOUND).send();

    const hasSubscription = await ipc.hasValidSubscription(article.owner_id);
    if (!hasSubscription) {
      return response.status(FORBIDDEN).end();
    }
    const stream = await getAudioStream(article);
    //@ts-ignore NOTE: Type-error. Pipe does work.
    stream.pipe(response);
  });
