import { logger } from "@paperpod/common";
import { CREATED } from "node-kall";
import { useContext, useState } from "react";
import { UserContext } from "../authentication/UserContext";
import { ArticleContext } from "./ArticleContext";
import { postArticle } from "./articleFetchers";

export const ArticleCreator = () => {
  const { token } = useContext(UserContext);
  const { resfreshArticles } = useContext(ArticleContext);
  const [link, setLink] = useState<string>(null);
  const onCreate = async () => {
    const [status] = await postArticle({ link }, token);
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
