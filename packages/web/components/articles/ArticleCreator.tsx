import { logger } from "@paperpod/common";
import { fetchers } from "@paperpod/frontend";
import { CREATED } from "node-kall";
import { useContext, useState } from "react";
import { authentication } from "@paperpod/frontend";
import { ArticleContext } from "./ArticleContext";

export const ArticleCreator = () => {
  const { token } = useContext(authentication.UserContext);
  const { resfreshArticles } = useContext(ArticleContext);
  const [link, setLink] = useState<string>(null);
  const onCreate = async () => {
    const [status] = await fetchers.article.postArticle({ link }, token);
    if (status === CREATED) {
      resfreshArticles();
    } else {
      logger.warn(status, "when posting article");
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="link"
        onChange={(event) => setLink(event.target.value)}
      />
      <button onClick={onCreate}>create</button>
    </>
  );
};
