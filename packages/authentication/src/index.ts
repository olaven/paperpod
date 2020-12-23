import { boot } from "common/src/server/boot";

boot("/authentication", authentication => {


    authentication.post("/", (request, response) => {

        response.send("HEllo, authentication!")
    });
});