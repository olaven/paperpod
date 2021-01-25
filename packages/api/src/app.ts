import { server } from "@paperpod/common";
import { withTextualData } from "@paperpod/converter";
import { articleRoutes, fileRoutes, rssRoutes } from "./routes/routes";


export const app = server.app.appWithBodyParser(
    server.app.appWithEnvironment()
)
    .use("/test", async (req, res) => {

        const article = await withTextualData({
            _id: "string",
            owner_id: "string",
            original_url: "https://waitbutwhy.com/2018/04/picking-career.html",
            added_timestamp: -1,
            storage_uri: "string",
        })

        res.send(article)
    })
    .use(rssRoutes)
    .use(articleRoutes)
    .use(fileRoutes)
