import express from 'express'
import { nanoid } from "nanoid";
import { models } from "@paperpod/common";
import { middleware } from "@paperpod/server";
import { withTextualData, withStorageUri } from "@paperpod/converter";
import { BAD_REQUEST, CREATED, OK, NO_CONTENT, NOT_FOUND, FORBIDDEN } from "node-kall";
import * as database from "../database/database";

const isValidURL = (string: string) => {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
};


export const articleRoutes = express.Router()
    .post("/articles", middleware.withAuthentication(
        async (request, response, user) => {

            const { link } = request.body as models.ArticlePayload;
            if (!isValidURL(link)) return response
                .status(BAD_REQUEST)
                .send("`link` has to be a valid URL");


            const article = await database.articles.persist(
                await withStorageUri(
                    await withTextualData({
                        _id: nanoid(),
                        original_url: link,
                        owner_id: user._id,
                        added_timestamp: Date.now(),
                        storage_uri: null
                    })
                )
            );

            response
                .status(CREATED)
                .json(article); 
        })
    )
    .get("/articles", middleware.withAuthentication(async (request, response, user) => {

        const articles = await database.articles.getByOwner(user._id);
        response.status(OK).json(articles);
    }))
    .delete("/articles/:id", middleware.withAuthentication(async (request, response, user) => {

        const id = request.params.id;

        if (!id)
            return response.status(BAD_REQUEST).end();

        const article = await database.articles.getById(id);

        if (!article)
            return response
                .status(NOT_FOUND)
                .end();

        if (article.owner_id !== user._id)
            return response
                .status(FORBIDDEN)
                .end();

        await database.articles.deleteById(id);
        return response.status(NO_CONTENT).end()
    }));

