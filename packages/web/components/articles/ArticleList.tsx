import { useContext } from "react";
import { Player } from "../player/Player";
import { ArticleContext } from "./ArticleContext";

export const ArticleList = () => {

  const { articles } = useContext(ArticleContext); 

  return <>
    {articles.map(article => 
      <div>
        {article.original_url} - "{article._id}"
        <Player article_id={article._id}/>
      </div>  
    )}
  </>
}
