import * as database from "../database/database";
import { server } from "@paperpod/common";
import express from "express";
import { FORBIDDEN } from "node-kall";

export const fileRoutes = express.Router()
    .get(
        "/files/:article_id",
        server.middleware.withAuthentication(
            async (request, response, user) => {

                const _id = (request.params.article_id as string).trim();
                const article = await database.articles.getById(_id);

                if (!article || article.owner_id !== user._id)
                    return response
                        .status(FORBIDDEN)
                        .end();

                const filename = server.utils.article.getFilename(article);
                const stream = server.storage.downloadStream(filename, "paperpod-articles");

                stream.pipe(response);
            })
    );