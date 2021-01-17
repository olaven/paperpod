import querystring from "querystring"
import { models } from "../..";

export const getFilename = (article: models.Article) => 
    querystring.escape(
        article.owner_id + article.original_url
    )