import dotenv from "dotenv";
import express from "express";


export const appWithEnvironment = (app = express()) => {

    dotenv.config();
    console.log("Starting app with environment", process.env)
    return app;
}
