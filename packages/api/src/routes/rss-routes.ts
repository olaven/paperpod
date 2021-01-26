import express from "express";
import * as database from "../database/database";
import { getRSSFeed } from "@paperpod/converter";
import { OK, UNAUTHORIZED } from "node-kall";


export const rssRoutes = express.Router()
    /**
     * NOTE: 
     * The client cannot be expected to use JWT for this route, as 
     * any podcast player must be able to fetch it. 
     * 
     * Check wether the user is associated with an active subscription <- TODO
     */
    .get("/feeds/:user_id/", async (request, response) => {

        const user_id = request.params.user_id;

        if (!user_id || user_id === "null" || user_id === "undefined")
            return response
                .status(UNAUTHORIZED)
                .send();

        //TODO: Check if valid subscription 

        const articles = await database.articles.getByOwner(user_id);
        const feed = getRSSFeed(articles);

        return response
            .status(OK)
            .contentType("application/rss+xml") //content-type as defined here: https://www.rssboard.org/rss-mime-type-application.txt
            .send(feed);
    })