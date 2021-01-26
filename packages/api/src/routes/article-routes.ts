import express from 'express'
import { nanoid } from "nanoid";
import { server, models } from "@paperpod/common";
import { withTextualData, withStorageUri } from "@paperpod/converter";
import { ACCEPTED, BAD_REQUEST, CREATED, OK } from "node-kall";
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


            /*
             TODO: 
             actually waiting for all of this to happen takes a lot of time. 
             It is much better if the endpoint responds wiht ACCEPTED at once, 
             and returns the data it does have (e.g. url). 

             The client can then display a "procesing"-mark or something similar 
             while there's no data available.

             Ideally, the server would ping the client back when converting is done. 
             */

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
                .json(article)
        })
    )
    .get("/articles", server.middleware.withAuthentication(async (request, response, user) => {

        const articles = await database.articles.getByOwner(user._id);
        response.status(OK).json(articles);
    }))
