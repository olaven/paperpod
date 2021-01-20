import querystring from "querystring"
import { models } from "../..";

export const getFilename = (article: models.Article) =>
    querystring.escape(
        article.owner_id + article.original_url
    )

export const parseFilename = (filename: string, owner: models.User) => {

    const unescaped = querystring.unescape(filename);
    const [_, original_url] = unescaped.split(owner._id)
    const [owner_id] = unescaped.split(original_url);

    return {
        original_url,
        owner_id
    }
}