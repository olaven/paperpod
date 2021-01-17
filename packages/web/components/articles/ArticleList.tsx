import { useContext } from "react";
import { ArticleContext } from "./ArticleContext";

export const ArticleList = () => {

  const { articles } = useContext(ArticleContext); 

  return <>
    {articles.map(article => 
      <div>{article.original_url} - "{article._id}"</div>  
    )}
  </>
}
