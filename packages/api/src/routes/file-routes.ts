import * as database from "../database/database";
import { server } from "@paperpod/common";
import express from "express";
import { BAD_REQUEST, FORBIDDEN } from "node-kall";

//TODO: /users/:_id/feed 

export const fileRoutes = express.Router()
    .get(
        "/files/:article_id",
        server.middleware.withAuthentication(
            async (request, response, user) => {

                console.log("Request params", request.params)




                const _id = (request.params.article_id as string).trim();

                console.log(`
                    Can find article in all of the articles: 
                    ${(await database.articles.getAll())
                        .map(article => article._id)
                        .find(id => id == _id)} 
                `)


                console.log(`checking article with id ${_id} as user ${user.email}`);
                const article = await database.articles.getById(_id);

                console.log(`Found article: ${article}`)

                console.log(`Found article with id ${article?._id} owned by ${article?.owner_id} `)

                if (!article || article.owner_id !== user._id)
                    return response
                        .status(FORBIDDEN)
                        .end();

                const filename = server.utils.article.getFilename(article);

                const stream = server.storage.downloadStream(filename, "paperpod-articles");
                stream.pipe(response);
            })
    );