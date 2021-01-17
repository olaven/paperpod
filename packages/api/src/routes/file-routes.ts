import * as database from "../database/database";
import { server } from "@paperpod/common";
import express from "express";
import { BAD_REQUEST, FORBIDDEN } from "node-kall";

export const fileRoutes = express.Router()
    .get(
        "/files/:filename",
        server.middleware.withAuthentication(
            async (request, response, user) => {

                const filename = request.params.filename
                const { owner_id, original_url } = server.utils.article.parseFilename(filename, user);

                if (owner_id !== user._id)
                    return response
                        .status(FORBIDDEN)
                        .end();

                const article = await database.articles.getByOriginalUrlAndOwner(original_url, owner_id);
                if (!article)
                    return response
                        .status(BAD_REQUEST)
                        .end();


            })
    );