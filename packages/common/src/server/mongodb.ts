//import * as querystring from "querystring"
import { Db, MongoClient } from "mongodb";
import { Article } from "../models/models";
import { User } from "../models/User";

const { MONGODB_NAME, MONGODB_USERNAME, MONGODB_HOST, MONGODB_PASSWORD, MONGODB_PORT } = process.env

const connectionString = () =>
    `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}`

export const withDatabase = async <T>(action: (database: Db) => Promise<T>) => {

    const client = await MongoClient.connect(connectionString(), {});
    const database = await client.db(MONGODB_NAME);
    const result = await action(database);
    await client.close();

    return result;
}


export const getUsers = (database: Db) =>
    database.collection<User>("users");

export const getArticles = (database: Db) =>
    database.collection<Article>("articles")


export const getUserByEmail = (email: string) =>
    withDatabase(async database => {

        const user = await getUsers(database).findOne({
            email
        });

        return user;
    });
