import { models } from "@paperpod/common";
import { del, get, post } from "node-kall";
import { bearer } from "./bearer";

export const postArticle = (article: models.ArticlePayload, token: string) =>
  post<models.ArticlePayload, models.Article>(
    "/api/articles",
    article,
    bearer(token)
  );

export const deleteArticle = (article: models.Article, token: string) =>
  del<models.ArticlePayload, null>(
    `/api/articles/${article.id}`,
    bearer(token)
  );

export const getArticles = (token: string) =>
  get<models.Article[]>("/api/articles", bearer(token));
