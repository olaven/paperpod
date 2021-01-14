import { WithId } from "mongodb";


/**
 * A helper function for persisting a document to 
 * mongodb. Works well as argument to `withCollection`. 
 * 
 * * The document is not retrieved after persisting.
 * * Following this, the returned document is the same as argument.
 */
export const persistHandler = <T> (document: T) => 
    async collection => {
        collection.insertOne(document as any as WithId<T>)
        return document
    }