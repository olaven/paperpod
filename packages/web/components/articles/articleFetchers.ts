import { models } from "common";
import { get, post } from "node-kall";

export const postArticle = (article: models.ArticlePayload, token: string) =>
    post<models.ArticlePayload, models.Article>(
        "/api/articles",
        article,
        {
            headers: {
                authorization: "Bearer " + token,
            }
        }
    );

export const getArticles = (token: string) =>
    get<models.Article[]>(
        "/api/articles",
        {
            headers: {
                authorization: "Bearer " + token,
            }
        }
    )