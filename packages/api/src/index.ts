import { CREATED, OK } from "node-kall";;
import { models, server } from "common";
import { getArticles, withDatabase } from "common/src/server/server";


const app = server.app.appWithEnvironment()
    .post("/articles", (request, response) => {

        console.log("ACTUALLY PERSIST ARTICLEPAYLOAD")
        response.status(CREATED).send("Created");
    })


    .get("/articles", server.middleware.withAuthentication(async (request, response, user) => {

        const articles = await withDatabase<models.Article>(database => {

            return getArticles(database).find({
                owner_id: user._id
            })
        })

        response.status(OK).json(articles);
    }));

server.boot("/api", app);