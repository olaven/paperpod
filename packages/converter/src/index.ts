import { models } from "@paperpod/common";
import { getAudioStream as _getAudioStream } from "./storage";
import { textToAudio } from "./audio";
import { withTextualData as _withTextualData } from "./text/text"; //FIXME: clean up import of this and ArticleWIthoutTExt
import { convertToRSSFeed } from "./rss";

/**
 * Triggers conversions and points the result to AWS S3
 * @param article 
 */
export const withStorageUri = async (article: models.Article): Promise<models.Article> => ({
    ...article,
    storage_uri: await textToAudio(article.text)
});



/**
 * Converts given article url to textual data like, text, title, description and author
 * @returns article with extracted text 
 */
export const withTextualData = async (article: models.ArticleWithoutTextualData) =>
    _withTextualData(article);

/**
 * Convert list of articles to an RSS feed 
 */
export const getRSSFeed = (articles: models.Article[]) => {
    return convertToRSSFeed(articles);
}


/**
* Download the audio of a given article 
* @param article 
*/
export const getAudioStream = _getAudioStream;