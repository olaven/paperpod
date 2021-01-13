import { models } from "common";

export const ArticleList = ({ articles }: { articles: models.Article[] }) => (
  <>
    {articles.map((article) => {
      <li>{article.original_url}</li>;
    })}
  </>
);
