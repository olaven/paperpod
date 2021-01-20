
import mognodb, { WithId } from "mongodb";


/**
 * A helper function for persisting a document to 
 * mongodb. Works well as argument to `withCollection`. 
 * 
 * * The document is not retrieved after persisting.
 * * Following this, the returned document is the same as argument.
 */
export const persistHandler = <T>(document: T) =>
    async collection => {
        await collection.insertOne(document as any as WithId<T>)
        return document
    }


//wraps id comparison between strings and ObjectId - https://stackoverflow.com/questions/11637353/comparing-mongoose-id-and-strings
export const getByIdHandler = <T extends { _id: string }>(_id: string) =>
    collection =>
        collection.findOne({
            _id: _id, //new mognodb.ObjectID(_id)
        })