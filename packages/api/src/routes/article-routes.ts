import express from 'express'
import { nanoid } from "nanoid";
import { server, models } from "@paperpod/common";
import { convertToText, triggerSpeechConversion } from "@paperpod/converter";
import { BAD_REQUEST, CREATED, OK } from "node-kall";
import * as database from "../database/database";

const isValidURL = (string: string) => {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
};

export const articleRoutes = express.Router()
    .post("/articles", server.middleware.withAuthentication(
        async (request, response, user) => {

            const { link } = request.body as models.ArticlePayload;
            if (!isValidURL(link)) return response
                .status(BAD_REQUEST)
                .send("`link` has to be a valid URL");

            const article = await database.articles.persist(

                await triggerSpeechConversion(
                    //@ts-ignore
                    await convertToText({
                        _id: nanoid(),
                        original_url: link,
                        owner_id: user._id,
                        added_timestamp: Date.now(),
                    })
                ));

            response
                .status(CREATED)
                .json(article)
        })
    )
    .get("/articles", server.middleware.withAuthentication(async (request, response, user) => {

        const articles = await database.articles.getByOwner(user._id);
        response.status(OK).json(articles);
    }))
