import React, { createContext, useState, useContext } from "react";
import { models } from "@paperpod/common";
import { OK } from "node-kall";
import { asyncEffect } from "@paperpod/ui";
import { getArticles } from "./articleFetchers";
import { UserContext } from "../authentication/UserContext";

export const ArticleContext = createContext<{
  articles: models.Article[];
  resfreshArticles: () => Promise<void>;
}>({
  articles: [],
  resfreshArticles: async () => { },
});

export const ArticleContextProvider = ({ children }: any) => {
  const { token } = useContext(UserContext);
  const [articles, setArticles] = useState<models.Article[]>([]);
  const resfreshArticles = async () => {
    const [status, articles] = await getArticles(token);
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
