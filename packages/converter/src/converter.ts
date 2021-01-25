import { models, server } from "@paperpod/common";
import { helperGetAudioStream, textToAudio, getTextualData, convertToRSSFeed } from "./helpers/helpers";

/**
 * Takes article and returns an audio stream. 
 * @param article 
 */
export const triggerSpeechConversion = async (article: models.Article): Promise<models.Article> => ({
    ...article,
    storage_uri: await textToAudio(article.text, article._id)
})

/**
 * 
 * @param article 
 */
export const getAudioStream = (article: models.Article) =>
    helperGetAudioStream(article)


/**
 * Converts given article url to text, 
 * @returns article with extracted text 
 */
export const convertToText =
    async (article: {
        _id: string,
        owner_id: string,
        original_url: string,
        added_timestamp: number,
        storage_uri: string,
    }): Promise<models.Article> => {

        const { text, title, author, description, publication_timestamp } = await getTextualData(article.original_url);
        return {
            ...article,
            text,
            title,
            author,
            description,
            publication_timestamp
        }
    }


/**
 * Convert list of articles to an RSS feed 
 */
export const convertToRSS = (articles: models.Article[]) =>
    convertToRSSFeed(articles); 