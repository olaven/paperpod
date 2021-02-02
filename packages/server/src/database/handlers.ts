
import { WithId } from "mongodb";


/**
 * Generic handler for persisting an document to mongo.
 * Pass to `withCollection`. 
 */
export const persistHandler = <T>(document: T) =>
    async collection => {
        await collection.insertOne(document as any as WithId<T>)
        return document
    }


/**
 * Generic handler for getting an document from mongo by _id. 
 * Pass to `withCollection`. 
 * @param _id 
 */
export const getByIdHandler = <T extends { _id: string }>(_id: string) =>
    collection =>
        collection.findOne({
            _id: _id,
        });