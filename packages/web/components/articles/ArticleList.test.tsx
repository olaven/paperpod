import { models, test } from "@paperpod/common";
import { render, waitFor } from "@testing-library/react";

import { ArticleContext, ArticleContextProvider } from "./ArticleContext";
import { ArticleList } from "./ArticleList";

const renderArticles = (articles: models.Article[]) =>
  render(
    <ArticleContext.Provider
      value={{
        articles,
        resfreshArticles: async () => {},
      }}
    >
      <ArticleList />
    </ArticleContext.Provider>
  );

describe("the list of articles", () => {
  it("does render every article", () => {
    const articles = new Array(5).fill(null).map(() => test.mocks.article());
    const { getByText } = renderArticles(articles);
    articles.forEach((article) => {
        expect(
            getByText(article.title)
        ).toBeInTheDocument()
    });
  });
});
