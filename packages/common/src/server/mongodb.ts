//import * as querystring from "querystring"
import { Db, MongoClient } from "mongodb";
import { Article } from "../models/models";
import { User } from "../models/User";

const { MONGODB_NAME, MONGODB_USERNAME, MONGODB_HOST, MONGODB_PASSWORD, MONGODB_PORT } = process.env

const connectionString = () =>
    `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}`

export const withDatabase = async (action: (database: Db) => Promise<void>) => {

    const client = await MongoClient.connect(connectionString(), {});
    const database = await client.db(MONGODB_NAME);
    await action(database);
    await client.close();
}


export const getUsers = (database: Db) =>
    database.collection<User>("users");

export const getArticles = (database: Db) =>
    database.collection<Article>("articles")


