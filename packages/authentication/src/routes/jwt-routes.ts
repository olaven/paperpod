import jwt from "jsonwebtoken";
import express from "express";

const sign = <T>(payload: T) =>
    jwt.sign(payload as any, process.env.JWT_SECRET, {
        expiresIn: "15m"
    });

const decode = <T>(token: string) =>
    jwt.verify(token, process.env.JWT_SECRET) as any as T;


export const jwtRoutes = express.Router()
    .get("", async (request, response) => {


        const jwt = await sign({ some: "data", added: "more" });
        const decrypted = await decode(jwt);

        response.send(decrypted);
    })