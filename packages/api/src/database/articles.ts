import { server, models } from "@paperpod/common";

const withArticle = server.database.withCollection<models.Article>("articles");

export const getByOwner = (owner_id: string) =>
     withArticle<models.Article[]>(collection => 
        collection.find(
            {owner_id}
        ).toArray()
    )

export const getById = (_id: string) =>
 withArticle(collection => 
        collection.findOne({
            _id
        })    
    );

export const persist = (article: models.Article) => 
    withArticle(
        server.database.persistHandler(article)
    );