import express from 'express'
import { server, models } from "common";
import { CREATED, OK } from "node-kall";
import * as database from "./database/database";

const routes = express.Router()
    .post("/articles", server.middleware.withAuthentication((request, response, user) => {
        
        const { link } = request.body as models.ArticlePayload; 
        //FIXME: link validation 

        const article = database.articles.persist({
            owner_id: user._id, 
            original_url: link, 
            text: "GET TEXT", //FIXME, 
            google_cloud_path: "SOMETHING" //FIXME, 
        }); 

        response
            .status(CREATED)
            .json(
                article
            )
    }))


    .get("/articles", server.middleware.withAuthentication(async (request, response, user) => {

        const articles = await database.articles.getByOwner(user._id); 
        console.log("articles: ", articles);
        response.status(OK).json(articles);
    }))

export const app =server.app.appWithBodyParser(
    server.app.appWithEnvironment()
) .use(routes)
    
