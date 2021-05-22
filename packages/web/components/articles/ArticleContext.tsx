import React, { createContext, useState, useContext } from "react";
import { models } from "@paperpod/common";
import { OK } from "node-kall";
import { fetchers, asyncEffect } from "@paperpod/frontend";
import { authentication } from "@paperpod/frontend";

export const ArticleContext = createContext<{
  articles: models.Article[];
  resfreshArticles: () => Promise<void>;
}>({
  articles: [],
  resfreshArticles: async () => {},
});

export const ArticleContextProvider = ({ children }: any) => {
  const { token } = useContext(authentication.UserContext);
  const [articles, setArticles] = useState<models.Article[]>([]);
  const resfreshArticles = async () => {
    const [status, articles] = await fetchers.article.getArticles(token);
    if (status === OK) {
      setArticles(articles);
    }
  };
  asyncEffect(resfreshArticles, []);
  return (
    <ArticleContext.Provider value={{ articles, resfreshArticles }}>
      {children}
    </ArticleContext.Provider>
  );
};
