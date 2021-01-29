import { Collection, MongoClient } from "mongodb";

const { MONGODB_NAME, MONGODB_USERNAME, MONGODB_HOST, MONGODB_PASSWORD, MONGODB_PORT, MONGODB_PROTOCOL } = process.env

const port = () =>
    MONGODB_PROTOCOL.includes("+srv") ?
        '' :
        `:${MONGODB_PORT}`

/**
 * If this is in NODE_ENV = test, connect to @shelf/jest-mongodb. 
 * Else, connect to URL from .env variables
 */
const connectionString = () =>
    process.env.NODE_ENV === "test" ?
        process.env.MONGO_URL : //as provided by https://github.com/shelfio/jest-mongodb
        `${MONGODB_PROTOCOL}://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}${port()}/${MONGODB_NAME}?retryWrites=true&w=majority`

/**
 * If this is in NODE_ENV = test, connect to @shelf/jest-mongodb.     
 * Otherwize, connect to .env.MONGODB_NAME
 */
const getDatabaseName = () =>
    process.env.NODE_ENV === "test" ?
        (global as any).__MONGO_DB_NAME__ :
        MONGODB_NAME


export const withCollection = <T>(collection: string) =>
    async <G = T>(action: (collection: Collection<T>) => Promise<G>) => {

        const client = await MongoClient.connect(connectionString(), { useUnifiedTopology: true });
        const database = client.db(
            getDatabaseName()
        );

        const result = await action(
            database.collection<T>(collection)
        );

        await client.close();
        return result;
    }
