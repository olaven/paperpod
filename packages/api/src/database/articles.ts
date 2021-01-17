import { server, models } from "@paperpod/common";

const withArticles = server.database.withCollection<models.Article>("articles");

export const getByOwner = (owner_id: string) =>
    withArticles<models.Article[]>(collection =>
        collection.find(
            { owner_id }
        ).toArray()
    )

/* export const getById = (_id: string) =>
    withArticles(collection =>
        collection.findOne({
            _id
        })
    );
 */
export const getById = (_id: string) =>
    withArticles(
        server.database.getByIdHandler(_id)
    )

export const getByOriginalUrlAndOwner = (original_url: string, owner_id: string) =>
    withArticles(collection =>
        collection.findOne({
            original_url,
            owner_id
        })
    );

//FIXME: delete me 
export const getAll = () =>
    withArticles<models.Article[]>(collection =>
        collection.find({}).toArray()
    )

export const persist = (article: models.Article) =>
    withArticles(
        server.database.persistHandler(article)
    );