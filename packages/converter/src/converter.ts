import { models, server } from "@paperpod/common";
import { textToAudio, getTextualData } from "./helpers/helpers";


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


/**
 * Converts given article url to text, 
 * @requires process.env.GOOGLE_APPLICATION_CREDENTIALS to be defined
 * @returns article with extracted text 
 */
export const convertToText =
    async (article: models.Article): Promise<models.Article> => {

        //FIXME: add title property
        const { text, title, description, publication_timestamp } = await getTextualData(article.original_url);
        return {
            ...article,
            text,
            title,
            description,
            publication_timestamp
        }
    }
