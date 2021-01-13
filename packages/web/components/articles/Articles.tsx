import { ArticleContextProvider } from "./ArticleContext";
import { ArticleCreator } from "./ArticleCreator";
import { ArticleList } from "./ArticleList";

export const Articles = () => (
  <ArticleContextProvider>
    <h1>Your articles</h1>
    <ArticleCreator />
    <ArticleList articles={[]} />
  </ArticleContextProvider>
);
