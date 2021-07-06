import path from "path";
import redoc from "redoc-express";
import * as server from "@paperpod/server";

const app = server.app
  .appWithEnvironment()
  .get("/openapi.yml", (request, response) => {
    response.sendFile(path.resolve("src", "openapi.yml"));
  })
  .get("/schemas/:filename", (request, response) => {
    const filename = request.params.filename;
    return response.sendFile(path.resolve("src", "schemas", filename));
  })
  .get(
    "/",
    redoc({
      title: "Documentation - Paperpod",
      specUrl:
        process.env.NODE_ENV === "development"
          ? "docs/openapi.yml"
          : "openapi.yml",
    })
  );

server.boot("/docs", app);
