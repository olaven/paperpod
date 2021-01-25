import * as database from "../database/database";
import { server } from "@paperpod/common";
import express from "express";
import { FORBIDDEN } from "node-kall";
import { getAudioStream } from "@paperpod/converter";

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

                const stream = await getAudioStream(article);
                console.log(`Got stream: ${stream}`);
                //@ts-ignore NOTE: Type-error. Pipe does work. 
                stream.pipe(response)
            })
    );