import { models, server } from "@paperpod/common";
import { textToAudio, awsTextToAudio, getTextualData, convertToRSSFeed } from "./helpers/helpers";


/**
 * @requires process.env.GOOGLE_APPLICATION_CREDENTIALS to be defined
 * Converts given text to audio, 
 * uploads it to storage and returns 
 * the updated article 
 */
export const convertToAudio =
    async (article: models.Article): Promise<models.Article> => {

        const audio = await textToAudio(article.text);

        const filename = server.utils.article.getFilename(article);
        await server.storage.upload(audio, "paperpod-articles", filename);

        return article
    }

export const aws = async (article: models.Article) => {

    const stream = await awsTextToAudio(article.text);
    return stream;
}


/**
 * Converts given article url to text, 
 * @requires process.env.GOOGLE_APPLICATION_CREDENTIALS to be defined
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