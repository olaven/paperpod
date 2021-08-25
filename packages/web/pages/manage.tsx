import { H2 } from "@paperpod/ui";
import { ArticleContextProvider } from "../components/manage/ArticleContext";
import { ArticleList } from "../components/manage/ArticleList";

const Manage = () => (
  <ArticleContextProvider>
    <H2>Manage your articles.</H2>
    <ArticleList></ArticleList>
  </ArticleContextProvider>
);

export default Manage;
