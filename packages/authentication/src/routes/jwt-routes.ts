import express from "express";
import SignJWT, { JWTPayload } from 'jose/jwt/sign'
import EncryptJWT from 'jose/jwt/encrypt'
import jwtDecrypt from 'jose/jwt/decrypt'


const key = () => Buffer.from(
    process.env.JWT_SECRET
);

const encrypt = <T>(payload: T) => new EncryptJWT(payload)
    .setProtectedHeader({ alg: 'ES256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .encrypt(
        Buffer.from(process.env.JWT_SECRET)
    );

const decrypt = (jwt: string) => jwtDecrypt(jwt, key());

export const jwtRoutes = express.Router()
    .get("", async (request, response) => {


        const jwt = await encrypt({ some: "data" });
        const decrypted = await decrypt(jwt);

        console.log(decrypted.payload);


        response.send(decrypted.payload);
    })