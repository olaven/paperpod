import { CREATED, OK } from "node-kall";
import * as express from "express";
import * as dotenv from "dotenv";
dotenv.config();

const app = express()

app.post("/articles", (request, response) => {

    response.status(CREATED).send("Created");
});


app.get("/articles", (request, response) => {

    response.status(OK).send("REtrieved");
});

app.use((request, response, next) => {

    console.log("Got request to", request.url);
    next();
})

const port = process.env.PORT;
console.log("port", port);
app.listen(port, () => {

    console.log("API is listening on port", port);
});