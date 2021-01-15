import express from 'express'
import { server, models } from "@paperpod/common";
import { convertToAudio, convertToText } from "@paperpod/converter";
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

                //FIXME: implemnt somehwere
                
                
                const article = await database.articles.persist(
                    await convertToAudio(
                        await convertToText (
                            { original_url: link, owner_id: user._id }
                        ),
                        user 
                    )
                )

            console.log("GOing tor epsond with", article); 
            response
                .status(CREATED)
                .json(
                    article
                )
        })
    )
    .get("/articles", server.middleware.withAuthentication(async (request, response, user) => {

        const articles = await database.articles.getByOwner(user._id); 
        console.log("articles: ", articles);
        response.status(OK).json(articles);
    }))
