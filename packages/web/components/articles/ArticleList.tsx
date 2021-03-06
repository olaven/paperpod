import * as React from "react";
import { logger, models } from "@paperpod/common";
import { fetchers } from "@paperpod/frontend";
import { NO_CONTENT } from "node-kall";
import { authentication } from "@paperpod/frontend";
import { Player } from "../player/Player";
import { ArticleContext } from "./ArticleContext";

const DeleteButton = ({ article }: { article: models.Article }) => {
  const { resfreshArticles } = React.useContext(ArticleContext);
  const { token } = React.useContext(authentication.UserContext);

  const onDelete = async () => {
    const [status] = await fetchers.article.deleteArticle(
      article,
      await token()
    );

    if (status === NO_CONTENT) {
      resfreshArticles();
    } else {
      logger.error(`An error occured when deleting article: ${status}`);
    }
  };

  return <button onClick={onDelete}>delete article</button>;
};

export const ArticleList = () => {
  const { articles } = React.useContext(ArticleContext);

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
