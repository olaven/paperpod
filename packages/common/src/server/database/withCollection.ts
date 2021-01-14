import { Collection, MongoClient } from "mongodb";

const { MONGODB_NAME, MONGODB_USERNAME, MONGODB_HOST, MONGODB_PASSWORD, MONGODB_PORT } = process.env

const connectionString = () =>
    `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}`

export const withCollection = <T>(collection: string) =>
    async <G = T> (action: (collection: Collection<T>) => Promise<G>) => {

        const client = await MongoClient.connect(connectionString(), {});
        const database = client.db(MONGODB_NAME);

        const result = await action(
            database.collection<T>(collection)
        );

        await client.close();
        return result;
    }
