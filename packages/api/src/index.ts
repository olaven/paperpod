import { CREATED, OK } from "node-kall";
import * as express from "express";
const app = express()

app.post("/articles", (request, response) => {

    response.status(CREATED).send("Created");
});


app.get("/articles", (request, response) => {

    response.status(OK).send("REtrieved");
});

const port = process.env.PORT;
app.listen(port, () => {

    console.log("API is listening on port", port);
});