import * as React from "react";
import { logger, models } from "@paperpod/common";
import { fetchers } from "@paperpod/frontend";
import { NO_CONTENT } from "node-kall";
import { authentication } from "@paperpod/frontend";
import { Player } from "../player/Player";
import { ArticleContext } from "./ArticleContext";
import { Button, Paragraph } from "@paperpod/ui";

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

  return <Button onClick={onDelete}>delete article</Button>;
};

export const ArticleList = () => {
  const { articles } = React.useContext(ArticleContext);

  return (
    <>
      {articles.length === 0 && (
        <Paragraph>You haven't added any articles yet.. :)</Paragraph>
      )}
      {articles.map((article) => (
        <div id={article.id}>
          <Paragraph>{article.title}</Paragraph>
          <Player article_id={article.id} />
          <DeleteButton article={article} />
        </div>
      ))}
    </>
  );
};
