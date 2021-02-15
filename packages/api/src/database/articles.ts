import { models } from "@paperpod/common";
import { database } from "@paperpod/server";

const withArticles = database.withCollection<models.Article>("articles");

export const getByOwner = (owner_id: string) =>
    withArticles<models.Article[]>(collection =>
        collection.find(
            { owner_id }
        ).toArray()
    )

export const deleteById = (_id: string) =>
    withArticles<any>(collection =>
        collection.deleteOne({
            _id
        })
    );

/* export const getById = (_id: string) =>
    withArticles(collection =>
        collection.findOne({
            _id
        })
    );
 */
export const getById = (_id: string) =>
    withArticles(
        database.getByIdHandler(_id)
    )

export const getByOriginalUrlAndOwner = (original_url: string, owner_id: string) =>
    withArticles(collection =>
        collection.findOne({
            original_url,
            owner_id
        })
    );


export const persist = (article: models.Article) =>
    withArticles(
        database.persistHandler(article)
    );