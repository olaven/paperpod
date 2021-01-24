import Stream from "stream"
import * as database from "../database/database";
import { server } from "@paperpod/common";
import express from "express";
import { FORBIDDEN } from "node-kall";
import { aws } from "@paperpod/converter";

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
                const googleStream = server.storage.downloadStream(filename, "paperpod-articles");


                const stream = await aws(article) as ReadableStream<number>

                //@ts-ignore
                stream.pipe(response)


                //stream.pipeTo(response)


                /* 
                                console.log("HEllo there", article)
                 */


                /* if (awsStream instanceof Buffer) {

                    console.log("IS buffer")
                    const awsStream = await aws(article) as any as Buffer;
                    console.log("Got a stream", awsStream);
                    
                    response.status(200).send(awsStream);
                } else {

                    console.log("was not buffer")
                    response.status(400).send()
                } */
                //@ts-ignore
                //awsStream.pipeTo(response)

            })
    );