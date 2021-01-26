import { models } from "@paperpod/common";
import { getAudioStream as _getAudioStream, textToAudio, getTextualData, convertToRSSFeed } from "./helpers/helpers";

/**
 * Triggers conversions and points the result to AWS S3
 * @param article 
 */
export const withStorageUri = async (article: models.Article): Promise<models.Article> => ({
    ...article,
    storage_uri: await textToAudio(article.text, article._id)
});



/**
 * Converts given article url to textual data like, text, title, description and author
 * @returns article with extracted text 
 */
export const withTextualData = async (article: {
    _id: string,
    owner_id: string,
    original_url: string,
    added_timestamp: number,
    storage_uri: string,
}): Promise<models.Article> => ({
    ...article,
    ...await getTextualData(article.original_url)
});


/**
 * Convert list of articles to an RSS feed 
 */
export const getRSSFeed = (articles: models.Article[]) =>
    convertToRSSFeed(articles);


/**
* Download the audio of a given article 
* @param article 
*/
export const getAudioStream = _getAudioStream;