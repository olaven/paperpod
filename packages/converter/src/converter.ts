import { models } from "@paperpod/common";
import { textToAudio, getTextualData, convertToRSSFeed } from "./helpers/helpers";

/**
 * Takes article and returns an audio stream. 
 * @param article 
 */
export const convertToAudioStream = (article: models.Article) =>
    textToAudio(article.text) as Promise<ReadableStream<number>>;


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