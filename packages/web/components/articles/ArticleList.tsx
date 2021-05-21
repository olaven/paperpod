import React from "react";
import { logger, models } from "@paperpod/common";
import { fetchers } from "@paperpod/frontend";
import { NO_CONTENT } from "node-kall";
import { useContext } from "react";
import { UserContext } from "../authentication/UserContext";
import { Player } from "../player/Player";
import { ArticleContext } from "./ArticleContext";

const DeleteButton = ({ article }: { article: models.Article }) => {
  const { resfreshArticles } = useContext(ArticleContext);
  const { token } = useContext(UserContext);

  const onDelete = async () => {
    const [status] = await fetchers.article.deleteArticle(article, token);

    if (status === NO_CONTENT) {
      resfreshArticles();
    } else {
      logger.error(`An error occured when deleting article: ${status}`);
    }
  };

  return <button onClick={onDelete}>delete article</button>;
};

export const ArticleList = () => {
  const { articles } = useContext(ArticleContext);

  return (
    <>
      {articles.map((article) => (
        <div id={article.id}>
          <p>{article.title}</p>
          <Player article_id={article.id} />
          <DeleteButton article={article} />
        </div>
      ))}
    </>
  );
};
