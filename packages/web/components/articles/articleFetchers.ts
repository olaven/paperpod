import { models } from "common";
import { get, post } from "node-kall";
import { bearer } from "../../helpers/bearer";

export const postArticle = (article: models.ArticlePayload, token: string) =>
    post<models.ArticlePayload, models.Article>(
        "/api/articles",
        article,
        bearer(token),
    );


export const getArticles = (token: string) =>
    get<models.Article[]>(
        "/api/articles",
        bearer(token), 
    )