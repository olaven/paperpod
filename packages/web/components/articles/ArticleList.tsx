import { models } from "@paperpod/common";
import { NO_CONTENT } from "node-kall";
import { useContext } from "react";
import { refreshToken } from "../authentication/authFetchers";
import { UserContext } from "../authentication/UserContext";
import { Player } from "../player/Player";
import { ArticleContext } from "./ArticleContext";
import { deleteArticle } from "./articleFetchers";

const DeleteButton = ({ article }: { article: models.Article }) => {
  const { resfreshArticles } = useContext(ArticleContext);
  const { token } = useContext(UserContext);

  const onDelete = async () => {
    const [status] = await deleteArticle(article, token);

    if (status === NO_CONTENT) {
      resfreshArticles();
    } else {
      console.log(`An error occured when deleting article: ${status}`);
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
          {article.original_url} - "{article.id}"
          <Player article_id={article.id} />
          <DeleteButton article={article} />
        </div>
      ))}
    </>
  );
};
