import { logger, models, constants } from "@paperpod/common";
import { del, get, post } from "node-kall";
import { bearer } from "./bearer";

export const postArticle = (article: models.ArticlePayload, token: string) => {
  logger.debug(
    "Going to post article",
    article,
    "with token",
    token,
    "to base url",
    constants.APPLICATION_URL()
  );

  return post<models.ArticlePayload, models.Article>(
    `${constants.APPLICATION_URL()}/api/articles`,
    article,
    bearer(token)
  );
};

export const deleteArticle = (article: models.Article, token: string) =>
  del<models.ArticlePayload, null>(
    `${constants.APPLICATION_URL()}/api/articles/${article.id}`,
    bearer(token)
  );

export const getArticles = (token: string) =>
  get<models.Article[]>(
    `${constants.APPLICATION_URL()}/api/articles`,
    bearer(token)
  );
